import SectionHeader from "../common/SectionHeader.jsx";
import Carousel from "../common/Carousel.jsx";

const mightLoveData = [
  {
    image_path: "/src/assets/you-might-love/Best of David Guetta.jpg",
    title: "Best of David Guetta"
  },
  {
    image_path: "/src/assets/you-might-love/Darknet Diaries.jpg",
    title: "Darknet Diaries"
  },
  {
    image_path: "/src/assets/you-might-love/Lex Fridman Podcast.jpg",
    title: "Lex Fridman Podcast"
  },
  {
    image_path: "/src/assets/you-might-love/Million Dollaz Worth Of Game.jpg",
    title: "Million Dollaz Worth Of Game"
  },
  {
    image_path: "/src/assets/you-might-love/Netokracija Podcast.jpg",
    title: "Netokracija Podcast"
  },
  {
    image_path: "/src/assets/you-might-love/Rock & Pop Stories.jpg",
    title: "Rock & Pop Stories"
  },
  {
    image_path: "/src/assets/you-might-love/Summer Mix 2022 Best Deep House Music Techno Dance Chill.jpg",
    title: "Summer Mix 2022 Best Deep House Music Techno Dance Chill"
  },
  {
    image_path: "/src/assets/you-might-love/The FADER Uncovered.jpg",
    title: "The FADER Uncovered"
  },
  {
    image_path: "/src/assets/you-might-love/Trailblazers electronic pioneers.jpg",
    title: "Trailblazers electronic pioneers"
  },
  {
    image_path: "/src/assets/you-might-love/What is sound.jpg",
    title: "What is sound"
  }
];

export default function YouMightLove () {
  return (
    <section className="section">
      <SectionHeader title="You Might Love" />
      <Carousel data={mightLoveData} cardType="text"/>
    </section>
  )
}