import { useState } from "react";

export default function LeftDescriptionPanel({ data }) {
  const [index, setIndex] = useState(0);

  const changeImageDisplay = (e) => {
    const index = Number.parseInt(e.target.dataset.key);

    setIndex(index);
  };

  return (
    <div className="left-panel container column">
      <div className="image-display">
        <img src={data.urls[index]} alt="item" />
      </div>
      <div className="image-carousel container">
        {data.urls.map((url, index) => (
          <div
            className="image-container"
            key={index}
            onClick={changeImageDisplay}
          >
            <img src={url} alt="item" data-key={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
