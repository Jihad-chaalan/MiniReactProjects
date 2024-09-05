import { useEffect, useState } from "react";
import "./style.css";

export default function ScrollIndicator({ url }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [scrollPercentage, setScrollPercentage] = useState(0);

  async function fetchData(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(getUrl);
      const data = await response.json();

      //if(data && data.products && data.products.length){}
      if (data?.products?.length) {
        setData(data.products);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  function handleScrollpercentage() {
    console.log(
      document.body.scrollTop,
      document.documentElement.scrollTop,
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight
    );

    const howMuchScrolled = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    setScrollPercentage((howMuchScrolled / height) * 100);
    console.log((howMuchScrolled / height) * 100);
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollpercentage);
    return () => window.removeEventListener("scroll", handleScrollpercentage);
  }, []);

  if (error) {
    return <div className="error">Error! {error}</div>;
  }
  if (loading) {
    return <div className="loading">Loading! Please Wait</div>;
  }

  return (
    <div className="container">
      <div className="top-container">
        <h1>Custom Scroll Indicator</h1>
        <div className="scroll-progress-tracking-container">
          <div
            className="current-progress"
            style={{ width: `${scrollPercentage}%` }}
          ></div>
        </div>
      </div>
      <div className="data-container">
        {data && data.length
          ? data.map((product) => <p key={product.id}>{product.title}</p>)
          : null}
      </div>
    </div>
  );
}
