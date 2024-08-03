import {useRef, useState} from "react";

export default function Carousel ({images, data, cardType}) {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartLeft, setStartScrollLeft] = useState(0);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setStartScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleDragging = (e) => {
    if (!isDragging) return;
    carouselRef.current.scrollLeft = scrollStartLeft - (e.pageX - startX);
  };

  const handleDragStop = () => {
    setIsDragging(false);
  };

  const handleArrowLeft = () => {
    const cardWidth = carouselRef.current.querySelector('.carousel__card').offsetWidth;
    carouselRef.current.scrollLeft -= cardWidth;
  };

  const handleArrowRight = () => {
    const cardWidth = carouselRef.current.querySelector('.carousel__card').offsetWidth;
    carouselRef.current.scrollLeft += cardWidth;
  };

  const renderCard = (src, data, index) => {
    switch (cardType) {
      case 'text':
        return (
          <div key={index} className="carousel__card">
            <div className="carousel__img-container">
              <img className="carousel__img" src={src} alt=""/>
            </div>
            <p className="carousel__p">{data}</p>
          </div>
        );
      case 'full-info':
        return (
          <div key={index} className="carousel__card">
            <div className="carousel__img-container">
              <img className="carousel__img" src={src} alt=""/>
            </div>
            <p className="carousel__title">{data.title}</p>
            <p className="carousel__artist">{data.artist}</p>
            <p className="carousel__released-on">Released on: {data.released_on}</p>
          </div>
        );
      case 'artists':
        return (
          <div key={index} className="carousel__card">
            <div className="carousel__img-container">
              <img className="carousel__img carousel__img--artist" src={src} alt=""/>
            </div>
            <div className="text-center">
              <p className="carousel__artist text-300">{data.artist}</p>
              <p className="carousel__fans-number">{data.fans_number} fans</p>
            </div>
          </div>
        )
      case 'text-absolute':
        return (
          <div key={index} className="carousel__card carousel__card--categories">
            <div className="carousel__img-container">
              <img className="carousel__img" src={src} alt=""/>
              <p className="carousel__category">{data}</p>
            </div>
          </div>
        )
      default:
        return (
          <div key={index} className="carousel__card">
            <div className="carousel__img-container">
              <img className="carousel__img" src={src} alt=""/>
            </div>
          </div>
        )
    }
  }

  return (
    <>
      <div className="carousel__arrows">
        <i className="icon-arrow-left" onClick={handleArrowLeft}></i>
        <i className="icon-arrow-right" onClick={handleArrowRight}></i>
      </div>
      <div
        ref={carouselRef}
        className={`carousel ${isDragging ? "carousel--dragging" : ""}`}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragging}
        onMouseUp={handleDragStop}
      >
        {images.map((src, index) => renderCard(src, data[index], index))}
      </div>
    </>
  )
}