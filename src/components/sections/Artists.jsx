import SectionHeader from "../common/SectionHeader.jsx";
import Carousel from "../common/Carousel.jsx";

const artistData = [
  {
    image_path: "/src/assets/artists/1.jpg",
    name: "Nirvana",
    fans_count: "8,512,857"
  },
  {
    image_path: "/src/assets/artists/2.jpg",
    name: "Deep Purple",
    fans_count: "1,522,146"
  },
  {
    image_path: "/src/assets/artists/3.jpg",
    name: "ATB",
    fans_count: "285,558"
  },
  {
    image_path: "/src/assets/artists/4.jpg",
    name: "Paul van Dyk",
    fans_count: "426,957"
  },
  {
    image_path: "/src/assets/artists/5.jpg",
    name: "Dash Berlin",
    fans_count: "427,999"
  },
  {
    image_path: "/src/assets/artists/6.jpg",
    name: "Above & Beyond",
    fans_count: "282,796"
  },
  {
    image_path: "/src/assets/artists/7.jpg",
    name: "Iron Maiden",
    fans_count: "3,044,857"
  },
  {
    image_path: "/src/assets/artists/8.jpg",
    name: "ABBA",
    fans_count: "2,211,472"
  },
  {
    image_path: "/src/assets/artists/9.jpg",
    name: "Guns N' Roses",
    fans_count: "7,122,211"
  },
  {
    image_path: "/src/assets/artists/10.jpg",
    name: "AC/DC",
    fans_count: "8,277,607"
  }
];

export default function Artists() {
  return (
    <section className="section">
      <SectionHeader title="Artists" />
      <Carousel
        data={artistData}
        cardType="artists"
      />
    </section>
  );
}