import SectionHeader from "../common/SectionHeader.jsx";
import Carousel from "../common/Carousel.jsx";

const durationData = [
  {
    image_path: "/src/assets/podcasts-by-duration/1.jpg",
    name: "< 10 min"
  },
  {
    image_path: "/src/assets/podcasts-by-duration/2.jpg",
    name: "≈ 20 min"
  },
  {
    image_path: "/src/assets/podcasts-by-duration/3.jpg",
    name: "≈ 30 min"
  },
  {
    image_path: "/src/assets/podcasts-by-duration/4.jpg",
    name: "≈ 60 min"
  },
  {
    image_path: "/src/assets/podcasts-by-duration/5.jpg",
    name: "> 2 h"
  }
];

export default function PodcastsByDuration () {
  return (
    <section className="section">
      <SectionHeader title="Podcasts by duration" />
      <Carousel data={durationData} cardType="text-absolute" />
    </section>
  );
}