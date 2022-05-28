import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useContextClient";
import { productUseCase, ProductItem } from "../../utilities/stripeClient";
import { Loading } from "../ui";
import UserFavorite from "../model/user/UserFavorite";
import UserHistory from "../model/user/UserHistory";
import UserAccount from "../model/user/UserAccount";
import UserFilter from "../model/user/UserFilter";
import { User, likedFurnitures } from "../../@types/dashboard";
import { useSubCollection } from "../../hooks/useSubCollection";
import { convertedPath } from "../../utilities/utilities";

const UserTemplate: React.VFC = () => {
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");

  const [currentFilter, setCurrentFilter] = useState<String>("favorite");
  const [isPending, setIsPending] = useState<boolean>(false);
  const [payments, setPayments] = useState<any[]>([]);
  const [productItems, setProductItems] = useState<ProductItem[]>([]);

  const changeFilter = (newFilter: String) => {
    setCurrentFilter(newFilter);
  };

  const { documents } = useSubCollection<User, likedFurnitures>(
    convertedPath(`/users/${user.uid}/liked_furnitures`)
  );

  const getLikedFurnitures = (
    documents: Array<likedFurnitures>
  ): Array<ProductItem> => {
    const likedFurnitures = documents.map((p) => {
      return p.liked_furniture;
    });
    return likedFurnitures;
  };

  const fetchProducts = async () => {
    try {
      setIsPending(true);
      const results = await productUseCase.fetchPayments(user.uid);
      const results2 = getLikedFurnitures(documents);
      setPayments(results);
      setProductItems(results2);
      setIsPending(false);
    } catch (error) {
      // エラーページへリダイレクトさせる
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [documents]);

  return (
    <div className="common-container">
      {isPending ? (
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
    </div>
  );
};

export default UserTemplate;
