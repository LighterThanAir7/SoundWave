import SectionHeader from "../common/SectionHeader.jsx";
import Carousel from "../common/Carousel.jsx";

const images = [
  "/src/assets/recently-played/1.jpg",
  "/src/assets/recently-played/2.jpg",
  "/src/assets/recently-played/3.jpg",
  "/src/assets/recently-played/4.jpg",
  "/src/assets/recently-played/5.jpg",
  "/src/assets/recently-played/6.jpg",
  "/src/assets/recently-played/7.jpg",
  "/src/assets/recently-played/8.jpg",
  "/src/assets/recently-played/9.jpg",
  "/src/assets/recently-played/10.jpg",
];

const data = [
  {
    title: "Yearmix 2020",
    artist: "Aurosonic",
    released_on: "25/12/2020",
  },
  {
    title: "Crystalize",
    artist: "Stargazes & Fenna Day",
    released_on: "01/11/2019",
  },
  {
    title: "Kad Bi Se Moga Rodit",
    artist: "Hari Rončević",
    released_on: "10/04/2011",
  },
  {
    title: "Big Mouth Strikes Again",
    artist: "The Smiths",
    released_on: "06/16/1986",
  },
  {
    title: "Kiss Me, Kiss Me, Kiss Me",
    artist: "The Cure",
    released_on: "01/01/1987",
  },
  {
    title: "Female Vocal Trance Anthems",
    artist: "Various Artists",
    released_on: "06/29/2015",
  },
  {
    title: "Every You Every Me",
    artist: "Placebo",
    released_on: "10/12/1998",
  },
  {
    title: "Lighter Than Air",
    artist: "Marlo, Feenixpawl",
    released_on: "04/26/2019",
  },
  {
    title: "Tuvan",
    artist: "Gaia",
    released_on: "11/02/2009",
  },
  {
    title: "I Would've Stayed",
    artist: "Aurosonic",
    released_on: "07/31/2020",
  }
];

export default function RecentlyPlayed () {
  return (
    <section className="section">
      <SectionHeader title="Recently Played" />
      <Carousel images={images} data={data} cardType="full-info"/>
    </section>
  )
}