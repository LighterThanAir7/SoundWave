import SectionHeader from "../common/SectionHeader.jsx";
import Carousel from "../common/Carousel.jsx";

const images = [
  "/src/assets/you-might-love/Best of David Guetta.jpg",
  "/src/assets/you-might-love/Darknet Diaries.jpg",
  "/src/assets/you-might-love/Lex Fridman Podcast.jpg",
  "/src/assets/you-might-love/Million Dollaz Worth Of Game.jpg",
  "/src/assets/you-might-love/Netokracija Podcast.jpg",
  "/src/assets/you-might-love/Rock & Pop Stories.jpg",
  "/src/assets/you-might-love/Summer Mix 2022 Best Deep House Music Techno Dance Chill.jpg",
  "/src/assets/you-might-love/The FADER Uncovered.jpg",
  "/src/assets/you-might-love/Trailblazers electronic pioneers.jpg",
  "/src/assets/you-might-love/What is sound.jpg",
];

const data = [
  "Best of David Guetta",
  "Darknet Diaries",
  "Lex Fridman Podcast",
  "Million Dollaz Worth Of Game",
  "Netokracija Podcast",
  "Rock & Pop Stories",
  "Summer Mix 2022 Best Deep House Music Techno Dance Chill",
  "The FADER Uncovered",
  "Trailblazers electronic pioneers",
  "What is sound"
]

export default function YouMightLove () {
  return (
    <section className="section">
      <SectionHeader title="You Might Love" />
      <Carousel cardType="text" images={images} data={data} />
    </section>
  )
}