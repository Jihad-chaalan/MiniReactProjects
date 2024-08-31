import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./style.css";

export default function ImageSlider({ url, limit = 5, page = 1 }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);
      let response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      let data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (e) {
      setErrorMsg(e.message);
      setLoading(false);
    }
  }
  function moveRight() {
    currentSlide === images.length - 1
      ? setCurrentSlide(0)
      : setCurrentSlide(currentSlide + 1);
  }
  function moveLeft() {
    currentSlide === 0
      ? setCurrentSlide(images.length - 1)
      : setCurrentSlide(currentSlide - 1);
  }

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);

  if (loading) {
    return <div> Loading! Please Wait.</div>;
  }
  if (errorMsg !== null) {
    return <div>Error! {errorMsg}</div>;
  }

  return (
    <div className="container">
      <div className="img-container">
        <BsArrowLeftCircleFill className="arrow" onClick={moveLeft} />
        <div className="images">
          {images && images.length
            ? images.map((imageItem, index) => (
                <img
                  key={imageItem.id}
                  src={imageItem.download_url}
                  alt={imageItem.download_url}
                  className={currentSlide === index ? "image" : "hidden"}
                />
              ))
            : null}
        </div>
        <BsArrowRightCircleFill className="arrow" onClick={moveRight} />
      </div>
      <div className="index-container">
        {images && images.length
          ? images.map((imageItem, index) => (
              <span
                className={index === currentSlide ? "current" : null}
                key={imageItem.id}
                onClick={() => setCurrentSlide(index)}
              >
                {index + 1}
              </span>
            ))
          : null}
      </div>
    </div>
  );
}
