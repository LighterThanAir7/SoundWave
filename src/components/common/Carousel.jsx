import {useEffect, useRef, useState} from "react";
import { usePlayer } from "../../context/PlayerContext.jsx";
// import VibeItems from "../sections/VibeItems.jsx";

export default function Carousel({ data, cardType }) {
  const { playSong, addToQueue } = usePlayer();
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartLeft, setStartScrollLeft] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(false);

  const checkOverflow = () => {
    if (carouselRef.current) {
      const hasOverflow = carouselRef.current.scrollWidth > carouselRef.current.clientWidth;
      setHasOverflow(hasOverflow);
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [data]);

  const handleCardClick = (clickedSong, index) => {
    console.log("Clicked song:", clickedSong);
    console.log("Index of clicked song: ", index);
    console.log(data);

    const newQueue = [clickedSong, ...data.slice(index + 1)];
    console.log("Queue će sadržavati:", newQueue);

    playSong(clickedSong, newQueue);
  };

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

  const getImagePath = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('/src/assets')) {
      return imagePath;
    }
    return `/uploads/songs/${imagePath}`;
  };

  const renderCard = (data, index) => {
    switch (cardType) {
      case 'text':
        return (
          <div key={index} className="carousel__card" onClick={() => handleCardClick(data, index)}>
            <div className="carousel__img-container">
              <img className="carousel__img" src={getImagePath(data.artwork_path) || data.image_path} alt={data.title}/>
              <div className="carousel__actions">
                <i className="icon-play"></i>
                <i className="icon-heart-o"></i>
                <i className="icon-dots"></i>
              </div>
            </div>
            <p className="carousel__p">
              {data.title}{data.artist ? ` - ${data.artist}` : ''}
            </p>
          </div>
        );
      case 'vibe':
        return (
          <li key={data.icon} className="carousel__card carousel__card--vibe">
            <i className={`vibe__icon icon-${data.icon}`}></i>
            <span className="vibe__name">{data.name}</span>
          </li>
        );
      case 'full-info':
        return (
          <div key={index} className="carousel__card">
            <div className="carousel__img-container">
              <img className="carousel__img" src={getImagePath(data.image_path)} alt={data.title}/>
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
              <img
                className="carousel__img carousel__img--artist"
                src={getImagePath(data.image_path)}
                alt={data.name}
              />
            </div>
            <div className="text-center">
              <p className="carousel__artist text-300">{data.name}</p>
              <p className="carousel__fans-number">{data.fans_count} fans</p>
            </div>
          </div>
        );
      case 'text-absolute':
        return (
          <div key={index} className="carousel__card carousel__card--categories">
            <div className="carousel__img-container">
              <img
                className="carousel__img"
                src={getImagePath(data.image_path)}
                alt={data.name}
              />
              <p className="carousel__category">{data.name}</p>
            </div>
          </div>
        );
      default:
        return (
          <div key={index} className="carousel__card">
            <div className="carousel__img-container">
              <img className="carousel__img" src={getImagePath(data.image_path)} alt=""/>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div className={`carousel__arrows ${hasOverflow ? '' : 'carousel__arrows--hidden'}`}>
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
        {data.map((item, index) => renderCard(item, index))}
      </div>
    </>
  );
}