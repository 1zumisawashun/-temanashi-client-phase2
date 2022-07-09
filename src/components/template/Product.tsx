import { useParams } from "react-router-dom";
import ProductComment from "../model/product/ProductComment";
import ProductSummary from "../model/product/ProductSummary";
import { productUseCase, ProductItem } from "../../utilities/stripeClient";
import { useData } from "../../hooks";
import styled from "@emotion/styled";

const ProductContainer = styled("div")`
  display: grid;
  grid-template-columns: 3fr 2fr;
  align-items: start;
  grid-gap: 60px;
  @media (max-width: 576px) {
    display: block;
  }
`;

const ProductTemplate: React.VFC = () => {
  const { id } = useParams<{ id: string }>();

  const productItem = useData<ProductItem>(id, () =>
    productUseCase.fetchProductItem(id)
  );

  return (
    <div className="common-container">
      <ProductContainer>
        {productItem && (
          <>
            <ProductSummary furniture={productItem} />
            <ProductComment furniture={productItem} />
          </>
        )}
      </ProductContainer>
    </div>
  );
};
export default ProductTemplate;
