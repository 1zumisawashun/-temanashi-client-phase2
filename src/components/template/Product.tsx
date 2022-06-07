import { useParams } from "react-router-dom";
import ProductComment from "../model/product/ProductComment";
import ProductSummary from "../model/product/ProductSummary";
import { useEffect, useState, useCallback } from "react";
import { productUseCase, ProductItem } from "../../utilities/stripeClient";
import { Loading } from "../ui";

const ProductTemplate: React.VFC = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [productItem, setProductItem] = useState<ProductItem>();
  const [isError, setIsError] = useState<string>("");

  const { id } = useParams<{ id: string }>();

  const fetchProductItem = useCallback(async () => {
    setIsPending(true);
    setIsError("");
    try {
      const productItem = await productUseCase.fetchProductItem(id);
      setProductItem(productItem);
      setIsPending(false);
    } catch (error) {
      setIsError("fetchに失敗しました");
      setIsPending(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProductItem();
  }, [fetchProductItem]);

  if (isPending) {
    return <Loading />;
  }
  return (
    <div className="common-container">
      <div className="product-container">
        {productItem && (
          <>
            <ProductSummary furniture={productItem} />
            <ProductComment furniture={productItem} />
          </>
        )}
        {isError.length !== 0 && <p>{isError}</p>}
      </div>
    </div>
  );
};
export default ProductTemplate;
