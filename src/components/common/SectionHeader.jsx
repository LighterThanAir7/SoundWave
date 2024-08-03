export default function SectionHeader ({ title, description }) {
  return (
    <div className="section__header">
      <div className="section__title">
        <h4 className="mb-0">{title}</h4>
        <i className="icon-arrow-right"></i>
      </div>
      <p className="section__desc">{description}</p>
    </div>
  )
}