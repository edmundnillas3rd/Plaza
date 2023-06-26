import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductSubinfo from "../components/Product/ProductSubinfo";
import ProductRatings from "../components/Product/ProductRatings";
import ReviewFormModal from "../components/ReviewFormModal";

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
  const [ratings, setRatings] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/inventory/items/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const { item, reviews } = data;

        setProduct(item);
        setRatings(reviews);
      });
  }, []);

  return (
    <div className="product-page-container container column gap-sm">
      {/* Header Content */}
      <div className="product-header-container section gap-md">
        {product && (
          <>
            <ImageDisplay urls={product.signedUrls} />
            <ProductSubinfo
              id={product._id}
              name={product.name}
              image={product.signedUrls}
              category={product.category.name}
              seller={product.seller.name}
              description={product.description}
              rating={product.rating}
              stock={product.stock}
              price={product.price}
            />
          </>
        )}
      </div>
      <div className="section container column gap-md">
        <div className="container align space-between">
          <h3>Product Ratings</h3>
          <button
            className="button-orange-theme"
            onClick={(e) => {
              setShow(true);
            }}
          >
            Submit Review
          </button>
        </div>
        {ratings && <ProductRatings reviews={ratings} />}
      </div>
      {show && (
        <ReviewFormModal
          callbackFn={(e) => {
            setShow(false);
          }}
        />
      )}
    </div>
  );
}
