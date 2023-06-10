import Categories from "../components/Categories";

export default function Home() {
  return (
    <>
      <div className="banner-container">
        <div className="banner-content container column gap-md">
          <div className="container column gap-sm">
            <h1 className="banner-header">Plaza</h1>
            <p className="banner-paragraph">
              Discover the ultimate online shopping destination, offering a
              diverse selection of high-quality products for all your needs.
            </p>
          </div>
          <div className="banner-button">
            <button>Learn More</button>
          </div>
        </div>
      </div>
      <div className="category-section container column gap-sm pt">
        <h1>Shop our top categories</h1>
        <Categories />
      </div>
    </>
  );
}
