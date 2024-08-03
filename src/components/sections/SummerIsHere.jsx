import SectionHeader from "../common/SectionHeader.jsx";

export default function SummerIsHere () {
  return (
    <section className="section">
        <SectionHeader title="Summer Is Here" description="Discover your summer soundtrack" />
        <div className="seasonal">
          <img className="seasonal__img" src="/src/assets/summer-is-here/summer-l.jpg" alt="" />
          <img className="seasonal__img" src="/src/assets/summer-is-here/summer-r.jpg" alt="" />
        </div>
    </section>
  )
}