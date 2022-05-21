import { useParams } from "react-router-dom";
import ProductComment from "../../components/model/product/ProductComment";
import ProductSummary from "../../components/model/product/ProductSummary";
import { FC, useEffect, useState, useCallback } from "react";
import { productUseCase, ProductItem } from "../../utilities/stripeClient";
import { Loading } from "../ui";

const Product: FC = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [productItem, setProductItem] = useState<ProductItem>();

  const { id }: { id: string } = useParams();

  const fetchProductItem = useCallback(async () => {
    try {
      setIsPending(true);
      const productItem = await productUseCase.fetchProductItem(id);
      setProductItem(productItem);
    } finally {
      setIsPending(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProductItem();
  }, [fetchProductItem]);

  if (isPending) {
    return <Loading />;
  }
  if (!productItem) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div className="common-container">
      <div className="product-container">
        <ProductSummary furniture={productItem} />
        <ProductComment furniture={productItem} />
      </div>
    </div>
  );
};
export default Product;
