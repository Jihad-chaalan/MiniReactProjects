import { useEffect, useState } from "react";
import "./style.css";

export default function ScrollIndicator({ url }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchData(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(getUrl);
      const data = await response.json();
      if (data && data.products && data.products.length) {
        setData(data.products);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  if (error) {
    return <div className="error">Error! {error}</div>;
  }
  if (loading) {
    return <div className="loading">Loading! Please Wait</div>;
  }

  return (
    <div className="container">
      {data && data.length
        ? data.map((product) => <p key={product.id}>{product.title}</p>)
        : null}
    </div>
  );
}
