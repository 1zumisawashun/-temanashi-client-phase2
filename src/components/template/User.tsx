import { useState } from "react";
import { productUseCase, ProductItem } from "../../utilities/stripeClient";
import {
  UserFavorite,
  UserHistory,
  UserAccount,
  UserFilter,
} from "../model/user";
import { User, likedFurnitures } from "../../@types/dashboard";
import { useSubCollection, useAuthContext, useData } from "../../hooks";
import { formatFirebasePath } from "../../utilities";

export const UserTemplate: React.VFC = () => {
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");

  const [currentFilter, setCurrentFilter] = useState<string>("favorite");

  const changeFilter = (newFilter: string) => {
    setCurrentFilter(newFilter);
  };

  const { documents } = useSubCollection<User, likedFurnitures>(
    formatFirebasePath(`/users/${user.uid}/liked_furnitures`)
  );

  const paymentsList = useData<any[]>(user.uid, () =>
    productUseCase.fetchPayments(user.uid)
  );

  const getLikedFurnitures = (
    documents: Array<likedFurnitures>
  ): Array<ProductItem> => {
    const likedFurnitures = documents.map((p) => {
      return p.liked_furniture;
    });
    return likedFurnitures;
  };

  const likedProductsList = getLikedFurnitures(documents);

  return (
    <>
      <UserFilter currentFilter={currentFilter} changeFilter={changeFilter} />
      {currentFilter === "favorite" && (
        <UserFavorite productItems={likedProductsList} />
      )}
      {currentFilter === "history" && <UserHistory payments={paymentsList} />}
      {currentFilter === "account" && <UserAccount />}
    </>
  );
};
