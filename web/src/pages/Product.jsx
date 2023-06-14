import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductSubinfo from "../components/Product/ProductSubinfo";

const ImageDisplay = ({ urls }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const changeImageDisplay = (e) => {
    const index = parseInt(e.target.dataset.key);
    setActiveIndex(index);
  };

  return (
    <div className="image-display-container container column">
      <div
        className="image-previewer-container"
        style={{
          backgroundImage: `url(${urls[activeIndex]})`
        }}
      ></div>
      <div className="image-slider-container">
        {urls &&
          urls.map((url, index) => {
            return (
              <div key={index} className="product-image-container">
                <img
                  src={url}
                  alt="item"
                  data-key={index}
                  onClick={changeImageDisplay}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/inventory/items/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const { item, reviews } = data;

        setProduct(item);
        setReviews(reviews);
      });
  }, []);

  return (
    <div className="product-page-container container">
      {/* Header Content */}
      <div className="product-header-container section gap-md">
        {product && (
          <>
            <ImageDisplay urls={product.signedUrls} />
            <ProductSubinfo
              name={product.name}
              description={product.description}
              rating={product.rating}
              stock={product.stock}
              price={product.price}
            />
          </>
        )}
      </div>
    </div>
  );
}
