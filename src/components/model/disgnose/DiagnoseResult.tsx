import { Link } from "react-router-dom";
import { db, recommendation } from "../../../utilities/constant";
import { formatTaxIncludedPrice } from "../../../utilities";
import { Loading, Image } from "../../ui";

export const DiagnoseResult: React.VFC = () => {
  return (
    <>
      {db.length === 0 && recommendation && <Loading />}
      <div className="diagnose-result">
        <div className="thumbnail">
          <img src={recommendation.imageUrl} alt="" />
        </div>
        <div className="content">
          <h1 className="name">シンプル風</h1>
          <p className="text">{recommendation.details}</p>
          <div className="colors">
            <div className="item">
              <p className="text">ベースカラー：{recommendation.baseColor}</p>
              <span className="cercle -white" />
            </div>
            <div className="item">
              <p className="text">サブカラー：{recommendation.subColor}</p>
              <span className="cercle -grey" />
            </div>
          </div>
          <div className="price">
            <p className="item">
              この組み合わせで
              <span className="total">{formatTaxIncludedPrice(1200000)}円</span>
            </p>
          </div>
        </div>
      </div>
      <div className="product-list">
        {db.map((furniture) => (
          <Link to="/diagnose" key={furniture.name} className="wrapper">
            <div className="thumbnail">
              {furniture.imageUrl && <Image src={furniture.imageUrl} />}
            </div>
            <div className="content">
              <h4 className="name">{furniture.name}</h4>
              {furniture.price && (
                <p className="price">
                  {formatTaxIncludedPrice(furniture.price)}
                </p>
              )}
              <div className="dimentions">
                <ul>
                  <li>幅 {furniture.width}cm</li>
                  <li>深さ {furniture.depth}cm</li>
                  <li>高さ {furniture.height}cm</li>
                </ul>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
