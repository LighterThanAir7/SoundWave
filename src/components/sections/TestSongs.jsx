import { useState, useEffect } from 'react';
import SectionHeader from "../common/SectionHeader.jsx";
import Carousel from "../common/Carousel.jsx";
import api from "../../../backend/config/axiosConfig.js";

export default function TestSongs() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await api.get('/api/songs');
        setSongs(response.data.songs);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <section className="section">
      <SectionHeader title="Test Songs"/>
      <Carousel data={songs} cardType="text"/>
    </section>
  );
}