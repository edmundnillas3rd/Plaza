export const StarRatings = ({ rating }) => {
  const ratings = [];

  for (let i = 0; i < rating; i++) {
    ratings.push(<div className="star-ratings-container" key={i}></div>);
  }

  if (rating < 5 && 5 - rating > 0) {
    let remainingStars = 5 - rating;
    for (let i = 0; i < remainingStars; i++) {
      ratings.push(
        <div className="star-ratings-container rating-0" key={i}></div>
      );
    }
  }

  return <div className="ratings-container">{ratings}</div>;
};
