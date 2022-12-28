import { useState, useEffect } from "react";

export default function ItemDescription({ props }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch("/items/:id")
      .then((res) => res.json)
      .then((data) => setItem(data.results.item));
  });
  return <div>{console.log("hello")}</div>;
}
