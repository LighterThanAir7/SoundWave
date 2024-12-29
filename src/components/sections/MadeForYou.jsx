import SectionHeader from "../common/SectionHeader.jsx";
import Carousel from "../common/Carousel.jsx";

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
  "/src/assets/made-for-you/10.jpg"
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
];

export default function MadeForYou() {
  return (
    <section className="section">
      <SectionHeader title="Made For You" />
      <Carousel images={images} data={texts} cardType="text"/>
    </section>
  )
}