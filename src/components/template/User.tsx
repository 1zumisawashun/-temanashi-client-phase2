import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "../../hooks/useContextClient";
import { productUseCase, ProductItem } from "../../utilities/stripeClient";
import { Loading } from "../ui";
import {
  UserFavorite,
  UserHistory,
  UserAccount,
  UserFilter,
} from "../model/user";
import { User, likedFurnitures } from "../../@types/dashboard";
import { useSubCollection } from "../../hooks/useSubCollection";
import { formatFirebasePath } from "../../utilities";

const UserTemplate: React.VFC = () => {
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");

  const [currentFilter, setCurrentFilter] = useState<String>("favorite");
  const [isPending, setIsPending] = useState<boolean>(false);
  const [payments, setPayments] = useState<any[]>([]);
  const [productItems, setProductItems] = useState<ProductItem[]>([]);
  const [isError, setIsError] = useState<string>("");

  const changeFilter = (newFilter: String) => {
    setCurrentFilter(newFilter);
  };

  const { documents } = useSubCollection<User, likedFurnitures>(
    formatFirebasePath(`/users/${user.uid}/liked_furnitures`)
  );

  const getLikedFurnitures = (
    documents: Array<likedFurnitures>
  ): Array<ProductItem> => {
    const likedFurnitures = documents.map((p) => {
      return p.liked_furniture;
    });
    return likedFurnitures;
  };

  const fetchProducts = useCallback(async () => {
    setIsError("");
    setIsPending(true);
    try {
      const paymentsList = await productUseCase.fetchPayments(user.uid);
      const likedProductsList = getLikedFurnitures(documents);
      setPayments(paymentsList);
      setProductItems(likedProductsList);
      setIsPending(false);
    } catch (error) {
      setIsError("fetchに失敗しました。");
      setIsPending(false);
    }
  }, [documents, user.uid]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="common-container">
      {isPending && productItems.length === 0 ? (
        <Loading />
      ) : (
        <>
          <UserFilter
            currentFilter={currentFilter}
            changeFilter={changeFilter}
          />
          {currentFilter === "favorite" && (
            <UserFavorite productItems={productItems} />
          )}
          {currentFilter === "history" && <UserHistory payments={payments} />}
          {currentFilter === "account" && <UserAccount />}
        </>
      )}
      {isError.length !== 0 && <p>{isError}</p>}
    </div>
  );
};

export default UserTemplate;
