import SectionHeader from "../common/SectionHeader.jsx";
import Carousel from "../common/Carousel.jsx";

const images = [
  "/src/assets/podcasts-by-duration/1.jpg",
  "/src/assets/podcasts-by-duration/2.jpg",
  "/src/assets/podcasts-by-duration/3.jpg",
  "/src/assets/podcasts-by-duration/4.jpg",
  "/src/assets/podcasts-by-duration/5.jpg",
];

const data = [
  "< 10 min", "≈ 20 min", "≈ 30 min", "≈ 60 min", "> 2 h"
];

export default function PodcastsByDuration () {
  return (
    <section className="section">
      <SectionHeader title="Podcasts by duration" />
      <Carousel images={images} data={data} cardType="text-absolute" />
    </section>
  );
}