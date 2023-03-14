export const StarRatings = ({ rating }) => {
  const ratings = [];

  for (let i = 0; i < rating; i++) {
    ratings.push(<div className="star-ratings-container" key={i}></div>);
  }

  return <div className="ratings-container">{ratings}</div>;
};
