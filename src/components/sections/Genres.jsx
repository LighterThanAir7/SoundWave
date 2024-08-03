import SectionHeader from "../common/SectionHeader.jsx";
import Carousel from "../common/Carousel.jsx";

const images = [
  "/src/assets/genres/afro.jpg",
  "/src/assets/genres/alternative.jpg",
  "/src/assets/genres/blues.jpg",
  "/src/assets/genres/classical.jpg",
  "/src/assets/genres/dance.jpg",
  "/src/assets/genres/edm.jpg",
  "/src/assets/genres/electro.jpg",
  "/src/assets/genres/electronic.jpg",
  "/src/assets/genres/flamenco.jpg",
  "/src/assets/genres/k-pop.jpg",
  "/src/assets/genres/latin-music.jpg",
  "/src/assets/genres/metal.jpg",
  "/src/assets/genres/movies-and-series.jpg",
  "/src/assets/genres/pop.jpg",
  "/src/assets/genres/rap.jpg",
  "/src/assets/genres/reggae.jpg",
  "/src/assets/genres/rnb.jpg",
  "/src/assets/genres/rock.jpg",
  "/src/assets/genres/schlager.jpg",
  "/src/assets/genres/soul.jpg",
  "/src/assets/genres/soul-and-funk.jpg",
  "/src/assets/genres/trance.jpg",
];

const data = [
  "Afro", "Alternative", "Blues", "Classical", "Dance",  "EDM", "Electro", "Electronic", "Flamenco", "K-pop", "Latin", "Metal", "Movies and Series", "Pop", "Rap", "Reggae", "Rnb", "Rock", "Schlager", "Soul", "Soul and Funk", "Trance"
]

export default function Genres () {
  return (
    <section className="section">
      <SectionHeader title="Genres" />
      <Carousel images={images} data={data} cardType="text-absolute" />
    </section>
  )
}