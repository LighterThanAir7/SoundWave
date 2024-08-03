import SectionHeader from "../common/SectionHeader.jsx";
import Carousel from "../common/Carousel.jsx";

const images = [
  "/src/assets/artists/1.jpg",
  "/src/assets/artists/2.jpg",
  "/src/assets/artists/3.jpg",
  "/src/assets/artists/4.jpg",
  "/src/assets/artists/5.jpg",
  "/src/assets/artists/6.jpg",
  "/src/assets/artists/7.jpg",
  "/src/assets/artists/8.jpg",
  "/src/assets/artists/9.jpg",
  "/src/assets/artists/10.jpg",
];

const data = [
  {
    artist: "Nirvana",
    fans_number: "8,512,857",
  },
  {
    artist: "Deep Purple",
    fans_number: "1,522,146",
  },
  {
    artist: "ATB",
    fans_number: "285,558",
  },
  {
    artist: "Paul van Dyk",
    fans_number: "426,957",
  },
  {
    artist: "Dash Berlin",
    fans_number: "427,999",
  },
  {
    artist: "Above & Beyond",
    fans_number: "282,796",
  },
  {
    artist: "Iron Maiden",
    fans_number: "3,044,857",
  },
  {
    artist: "ABBA",
    fans_number: "2,211,472",
  },
  {
    artist: "Guns N' Roses",
    fans_number: "7,122,211",
  },
  {
    artist: "AC/DC",
    fans_number: "8,277,607",
  }
];


export default function Artists () {
  return (
    <section className="section">
      <SectionHeader title="Artists" />
      <Carousel images={images} data={data} cardType="artists" />
    </section>
  )
}