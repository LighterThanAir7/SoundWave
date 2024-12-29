import { useState, useEffect } from 'react';
import SectionHeader from "../common/SectionHeader.jsx";
import Carousel from "../common/Carousel.jsx";

export default function TestSongs() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/songs');
        const data = await response.json();
        setSongs(data.songs);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  // Transform songs data into required format
  const images = songs.map(song => `/uploads/songs/${song.artwork_path}`);
  const texts = songs.map(song => `${song.title} - ${song.artist}`);

  return (
    <section className="section">
      <SectionHeader title="Test Songs"/>
      <Carousel images={images} data={texts} cardType="text"/>
    </section>
  );
}