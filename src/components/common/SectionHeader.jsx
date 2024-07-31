export default function SectionHeader ({ title, onArrowLeft, onArrowRight }) {
  return (
    <div className="section__header">
      <div className="section__title-container">
        <h4 className="mb-0">{title}</h4>
        <i className="icon-arrow-right"></i>
      </div>
      <div className="section__arrows">
        <i className="icon-arrow-left" onClick={onArrowLeft}></i>
        <i className="icon-arrow-right" onClick={onArrowRight}></i>
      </div>
    </div>
  )
}