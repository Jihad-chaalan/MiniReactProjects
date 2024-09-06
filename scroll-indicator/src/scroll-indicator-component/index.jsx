import { useEffect, useState } from "react";
import "./style.css";

export default function ScrollIndicator({ url }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [renderedData, setRenderedData] = useState([]);
  const [numRendered, setNumRendered] = useState(40);

  async function fetchData(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(getUrl);
      const data = await response.json();

      //if(data && data.products && data.products.length){}
      if (data?.products?.length) {
        setData(data.products);
        setLoading(false);

        //If the number of products is higher than the size of the data.products array, it will not throw an error in the slice method.
        // setRenderedData(data.products.slice(0, numRendered + 1));
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
  const showMoreData = () => setNumRendered(numRendered + 10);

  useEffect(() => {
    fetchData(url);
  }, [url]);
  useEffect(() => {
    //If the number of products is higher than the size of the data.products array, it will not throw an error in the slice method.
    setRenderedData(data.slice(0, numRendered + 1));
  }, [numRendered, data]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollpercentage);
    return () => window.removeEventListener("scroll", handleScrollpercentage);
  }, []);
  useEffect(() => {
    handleScrollpercentage(); // Trigger recalculation after content update
  }, [renderedData]);

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
          ? renderedData.map((product) => (
              <div key={product.id}>
                <p>{product.title}</p>
                <img
                  className="products-images"
                  src={product.images}
                  alt=""
                ></img>
              </div>
            ))
          : null}
      </div>
      <div className="load-btn">
        {renderedData.length < data.length ? (
          <button onClick={showMoreData}>Load More...</button>
        ) : null}
      </div>
    </div>
  );
}
