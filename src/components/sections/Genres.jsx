import SectionHeader from "../common/SectionHeader.jsx";
import Carousel from "../common/Carousel.jsx";

const genreData = [
  {
    image_path: "/src/assets/genres/afro.jpg",
    name: "Afro"
  },
  {
    image_path: "/src/assets/genres/alternative.jpg",
    name: "Alternative"
  },
  {
    image_path: "/src/assets/genres/blues.jpg",
    name: "Blues"
  },
  {
    image_path: "/src/assets/genres/classical.jpg",
    name: "Classical"
  },
  {
    image_path: "/src/assets/genres/dance.jpg",
    name: "Dance"
  },
  {
    image_path: "/src/assets/genres/edm.jpg",
    name: "EDM"
  },
  {
    image_path: "/src/assets/genres/electro.jpg",
    name: "Electro"
  },
  {
    image_path: "/src/assets/genres/electronic.jpg",
    name: "Electronic"
  },
  {
    image_path: "/src/assets/genres/flamenco.jpg",
    name: "Flamenco"
  },
  {
    image_path: "/src/assets/genres/k-pop.jpg",
    name: "K-pop"
  },
  {
    image_path: "/src/assets/genres/latin-music.jpg",
    name: "Latin"
  },
  {
    image_path: "/src/assets/genres/metal.jpg",
    name: "Metal"
  },
  {
    image_path: "/src/assets/genres/movies-and-series.jpg",
    name: "Movies and Series"
  },
  {
    image_path: "/src/assets/genres/pop.jpg",
    name: "Pop"
  },
  {
    image_path: "/src/assets/genres/rap.jpg",
    name: "Rap"
  },
  {
    image_path: "/src/assets/genres/reggae.jpg",
    name: "Reggae"
  },
  {
    image_path: "/src/assets/genres/rnb.jpg",
    name: "Rnb"
  },
  {
    image_path: "/src/assets/genres/rock.jpg",
    name: "Rock"
  },
  {
    image_path: "/src/assets/genres/schlager.jpg",
    name: "Schlager"
  },
  {
    image_path: "/src/assets/genres/soul.jpg",
    name: "Soul"
  },
  {
    image_path: "/src/assets/genres/soul-and-funk.jpg",
    name: "Soul and Funk"
  },
  {
    image_path: "/src/assets/genres/trance.jpg",
    name: "Trance"
  }
];

export default function Genres () {
  return (
    <section className="section">
      <SectionHeader title="Genres" />
      <Carousel data={genreData}  cardType="text-absolute" />
    </section>
  )
}