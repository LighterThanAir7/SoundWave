import SectionHeader from "../common/SectionHeader.jsx";
import Carousel from "../common/Carousel.jsx";

const podcastData = [
  {
    image_path: "/src/assets/podcast-categories/1.jpg",
    name: "Music"
  },
  {
    image_path: "/src/assets/podcast-categories/2.jpg",
    name: "Education"
  },
  {
    image_path: "/src/assets/podcast-categories/3.jpg",
    name: "Business"
  },
  {
    image_path: "/src/assets/podcast-categories/4.jpg",
    name: "Lifestyle"
  },
  {
    image_path: "/src/assets/podcast-categories/5.jpg",
    name: "History"
  },
  {
    image_path: "/src/assets/podcast-categories/6.jpg",
    name: "Mistery"
  },
  {
    image_path: "/src/assets/podcast-categories/7.jpg",
    name: "Sports"
  },
  {
    image_path: "/src/assets/podcast-categories/8.jpg",
    name: "Film & TV"
  },
  {
    image_path: "/src/assets/podcast-categories/9.jpg",
    name: "Travel"
  },
  {
    image_path: "/src/assets/podcast-categories/10.jpg",
    name: "Summer Podcasts"
  },
  {
    image_path: "/src/assets/podcast-categories/11.jpg",
    name: "Interviews"
  },
  {
    image_path: "/src/assets/podcast-categories/12.jpg",
    name: "Medicine"
  },
  {
    image_path: "/src/assets/podcast-categories/13.jpg",
    name: "Politics"
  },
  {
    image_path: "/src/assets/podcast-categories/14.jpg",
    name: "Ecology"
  },
  {
    image_path: "/src/assets/podcast-categories/15.jpg",
    name: "Carrer Growth"
  },
  {
    image_path: "/src/assets/podcast-categories/16.jpg",
    name: "Podcast Charts"
  },
  {
    image_path: "/src/assets/podcast-categories/17.jpg",
    name: "New Podcasts"
  },
  {
    image_path: "/src/assets/podcast-categories/18.jpg",
    name: "For Foodies"
  },
  {
    image_path: "/src/assets/podcast-categories/19.jpg",
    name: "Storytelling"
  },
  {
    image_path: "/src/assets/podcast-categories/20.jpg",
    name: "For Entrepreneurs"
  }
];

export default function PodcastCategories() {
  return (
    <section className="section">
      <SectionHeader title="Categories" />
      <Carousel data={podcastData} cardType="text-absolute" />
    </section>
  )
}