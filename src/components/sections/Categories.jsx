import SectionHeader from "../common/SectionHeader.jsx";
import Carousel from "../common/Carousel.jsx";

const images = [
  "/src/assets/categories/1.jpg",
  "/src/assets/categories/2.jpg",
  "/src/assets/categories/3.jpg",
  "/src/assets/categories/4.jpg",
  "/src/assets/categories/5.jpg",
  "/src/assets/categories/6.jpg",
  "/src/assets/categories/7.jpg",
  "/src/assets/categories/8.jpg",
  "/src/assets/categories/9.jpg",
  "/src/assets/categories/10.jpg",
];

const data = [
  "Charts", "New Releases", "Chill", "Feel Good", "Party", "Workout", "Melancholia", "At Home", "Summer", "Focus"
];

export default function Categories () {
  return (
    <section className="section">
      <SectionHeader title="Categories" />
      <Carousel images={images} data={data} cardType="text-absolute" />
    </section>
  )
}