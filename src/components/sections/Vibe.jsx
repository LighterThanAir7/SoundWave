import VibeItems from "./VibeItems.jsx";

export default function Vibe () {
  return (
    <section className="section">
      <h4 className="mb-6"><span className="text-primary-500">Vibe:</span> Play how you feel</h4>
      <p className="mb-40">An infinite, personalized mix of the music you love and new descoveries</p>
      <VibeItems />
    </section>
  )
}