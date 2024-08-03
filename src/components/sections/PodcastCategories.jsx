import SectionHeader from "../common/SectionHeader.jsx";
import Carousel from "../common/Carousel.jsx";

const images = [
  "/src/assets/podcast-categories/1.jpg",
  "/src/assets/podcast-categories/2.jpg",
  "/src/assets/podcast-categories/3.jpg",
  "/src/assets/podcast-categories/4.jpg",
  "/src/assets/podcast-categories/5.jpg",
  "/src/assets/podcast-categories/6.jpg",
  "/src/assets/podcast-categories/7.jpg",
  "/src/assets/podcast-categories/8.jpg",
  "/src/assets/podcast-categories/9.jpg",
  "/src/assets/podcast-categories/10.jpg",
  "/src/assets/podcast-categories/11.jpg",
  "/src/assets/podcast-categories/12.jpg",
  "/src/assets/podcast-categories/13.jpg",
  "/src/assets/podcast-categories/14.jpg",
  "/src/assets/podcast-categories/15.jpg",
  "/src/assets/podcast-categories/16.jpg",
  "/src/assets/podcast-categories/17.jpg",
  "/src/assets/podcast-categories/18.jpg",
  "/src/assets/podcast-categories/19.jpg",
  "/src/assets/podcast-categories/20.jpg",
];

const data = [
  "Music", "Education", "Business", "Lifestyle", "History", "Mistery", "Sports", "Film & TV", "Travel", "Summer Podcasts", "Interviews", "Medicine", "Politics", "Ecology", "Carrer Growth", "Podcast Charts", "New Podcasts", "For Foodies", "Storytelling", "For Entrepreneurs"
];

export default function PodcastCategories() {
  return (
    <section className="section">
      <SectionHeader title="Categories" />
      <Carousel images={images} data={data} cardType="text-absolute" />
    </section>
  )
}