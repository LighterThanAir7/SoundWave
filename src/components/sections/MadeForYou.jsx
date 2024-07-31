import SectionHeader from "../common/SectionHeader.jsx";
import {useRef, useState} from "react";

const images = [
  "/src/assets/made-for-you/1.jpg",
  "/src/assets/made-for-you/2.jpg",
  "/src/assets/made-for-you/3.jpg",
  "/src/assets/made-for-you/4.jpg",
  "/src/assets/made-for-you/5.jpg",
  "/src/assets/made-for-you/6.jpg",
  "/src/assets/made-for-you/7.jpg",
  "/src/assets/made-for-you/8.jpg",
  "/src/assets/made-for-you/9.jpg",
  "/src/assets/made-for-you/10.jpg",
];

const texts = [
  "Ft. Richard Durand, Dash Berlin, Ciaran McAuley, Sue Mclaren",
  "Ft. Susana, JES, Roman Messer, Stine Grove",
  "Ft. Aurosonic, Stoneface & Terminal, Beat Service, Ana Criado",
  "Ft. Susana, JES, Darren Porter, Stine Grove",
  "Ft. Antiloop, Susana, Alex M.O.R.P.H., Roger Shah",
  "Ft. The Rolling Stones, Eagles, Led Zeppelin, Jimi Hendrix",
  "Ft. Alex M.O.R.P.H., Giuseppe Ottaviani, Orjan Nilsen, Allen Watts",
  "Ft. Paul van Dyk, Christina Stürmer, Annett Louisan, Justin Jesso",
  "Ft. Moby Dick, Željko Joksimović, Zdravko Colic, Dino Merlin",
  "Ft. Eric Clapton, Miami Sound Machine, Santana, B.B. King",
  "Ft. The Smiths, Aurosonic, Radion6, Allen & Envy"
]

export default function MadeForYou() {
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

  return (
    <section className="section">
      <SectionHeader title="Made For You" onArrowLeft={handleArrowLeft} onArrowRight={handleArrowRight} />

      <div
        ref={carouselRef}
        className={`carousel ${isDragging ? "carousel--dragging" : ""}`}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragging}
        onMouseUp={handleDragStop}
      >
        {images.map((src, index) => (
          <div key={index} className="carousel__card">
            <div className="carousel__img-container">
              <img className="carousel__img" src={src} alt={`carousel item ${index + 1}`}/>
            </div>
            <p className="carousel__p">{texts[index]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}