import SectionHeader from "../common/SectionHeader.jsx";
import Carousel from "../common/Carousel.jsx";

const categoryData = [
  {
    image_path: "/src/assets/categories/1.jpg",
    name: "Charts"
  },
  {
    image_path: "/src/assets/categories/2.jpg",
    name: "New Releases"
  },
  {
    image_path: "/src/assets/categories/3.jpg",
    name: "Chill"
  },
  {
    image_path: "/src/assets/categories/4.jpg",
    name: "Feel Good"
  },
  {
    image_path: "/src/assets/categories/5.jpg",
    name: "Party"
  },
  {
    image_path: "/src/assets/categories/6.jpg",
    name: "Workout"
  },
  {
    image_path: "/src/assets/categories/7.jpg",
    name: "Melancholia"
  },
  {
    image_path: "/src/assets/categories/8.jpg",
    name: "At Home"
  },
  {
    image_path: "/src/assets/categories/9.jpg",
    name: "Summer"
  },
  {
    image_path: "/src/assets/categories/10.jpg",
    name: "Focus"
  }
];

export default function Categories () {
  return (
    <section className="section">
      <SectionHeader title="Categories" />
      <Carousel data={categoryData} cardType="text-absolute" />
    </section>
  )
}