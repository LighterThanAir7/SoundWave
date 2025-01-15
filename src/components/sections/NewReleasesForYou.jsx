import SectionHeader from "../common/SectionHeader.jsx";
import Carousel from "../common/Carousel.jsx";

const releasesData = [
  {
    image_path: "/src/assets/new-releases-for-you/1.jpg",
    title: "Starts Right Now",
    artist: "Chasner",
    released_on: "17/06/2022"
  },
  {
    image_path: "/src/assets/new-releases-for-you/2.jpg",
    title: "Don't You Worry",
    artist: "The Black Eyed Peas",
    released_on: "19/06/2022"
  },
  {
    image_path: "/src/assets/new-releases-for-you/3.jpg",
    title: "Supernova",
    artist: "Nova Twins",
    released_on: "21/06/2022"
  },
  {
    image_path: "/src/assets/new-releases-for-you/4.jpg",
    title: "Life Is Yours",
    artist: "Foals",
    released_on: "14/06/2022"
  },
  {
    image_path: "/src/assets/new-releases-for-you/5.jpg",
    title: "The Phoenix",
    artist: "Grey Daze",
    released_on: "17/06/2022"
  },
  {
    image_path: "/src/assets/new-releases-for-you/6.jpg",
    title: "Data Renaissance",
    artist: "The Algorithm",
    released_on: "03/06/2022"
  },
  {
    image_path: "/src/assets/new-releases-for-you/7.jpg",
    title: "Scoring The End Of The World",
    artist: "Motionless In White",
    released_on: "10/06/2022"
  },
  {
    image_path: "/src/assets/new-releases-for-you/8.jpg",
    title: "New Mythology",
    artist: "Nick Mulvey",
    released_on: "10/06/2022"
  },
  {
    image_path: "/src/assets/new-releases-for-you/9.jpg",
    title: "C'MON YOU KNOW (Deluxe Edition)",
    artist: "Liam Gallagher",
    released_on: "27/05/2022"
  },
  {
    image_path: "/src/assets/new-releases-for-you/10.jpg",
    title: "Warm Chris",
    artist: "Aldous Harding",
    released_on: "01/01/2021"
  }
];

export default function NewReleasesForYou() {
  return (
    <section className="section">
      <SectionHeader title="New Releases for You" />
      <Carousel
        data={releasesData}
        cardType="full-info"
      />
    </section>
  );
}