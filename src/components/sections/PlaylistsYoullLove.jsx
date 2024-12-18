import SectionHeader from "../common/SectionHeader.jsx";
import Carousel from "../common/Carousel.jsx";

const images = [
  "/src/assets/playlists-you'll-love/1.jpg",
  "/src/assets/playlists-you'll-love/2.jpg",
  "/src/assets/playlists-you'll-love/3.jpg",
  "/src/assets/playlists-you'll-love/4.jpg",
  "/src/assets/playlists-you'll-love/5.jpg",
  "/src/assets/playlists-you'll-love/6.jpg",
  "/src/assets/playlists-you'll-love/7.jpg",
  "/src/assets/playlists-you'll-love/8.jpg",
  "/src/assets/playlists-you'll-love/9.jpg",
  "/src/assets/playlists-you'll-love/10.jpg",
];

const data = [
  {
    title: "A State Of Trance Year Mix 2015",
    artist: "Armin van Buuren",
    released_on: "12/18/2015",
  },
  {
    title: "Female Vocal Trance 2022",
    artist: "Various Artists",
    released_on: "03/04/2022",
  },
  {
    title: "Behind The Horizon",
    artist: "Costa",
    released_on: "11/19/2021",
  },
  {
    title: "Trance Top 1000 Selection, Vol.41",
    artist: "Various Artists",
    released_on: "07/15/2016",
  },
  {
    title: "Best of Uplifting Vocal Trance 2018",
    artist: "Various Artists",
    released_on: "09/07/2018",
  },
  {
    title: "Female Vocal Trance Anthems",
    artist: "Various Artists",
    released_on: "06/29/2015",
  },
  {
    title: "1 Year Suanda",
    artist: "Various Artists",
    released_on: "05/05/2014",
  },  {
    title: "Progressive Hits, Vol. 1",
    artist: "Various Artists",
    released_on: "03/13/2017",
  },
  {
    title: "Beautiful Vocal Trance - Chapter 4",
    artist: "Various Artists",
    released_on: "10/18/2019",
  },
  {
    title: "A State Of Trance Episode 807",
    artist: "Armin van Buuren ASOT Radio",
    released_on: "03/30/2017",
  }
];


export default function PlaylistsYoullLove () {
  return (
    <section className="section">
      <SectionHeader title="Playlists You'll Love" />
      <Carousel images={images} data={data} cardType="full-info"/>
    </section>
  )
}