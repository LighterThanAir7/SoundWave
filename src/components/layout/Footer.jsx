import footerItems from "../../config/FooterConfig.jsx";
import LanguagePicker from "../common/LanguagePicker.jsx";
export default function Footer ({ type }) {

  return (
    <footer className="footer">
      <a className="footer__logo" href="">
        <i className="icon-logo mr-10"></i>SoundWave © 2024
      </a>

      <div className="footer__nav">
        {footerItems.map((item, index) => (
          <a className="footer__item" key={index} href="">{item.label}</a>
        ))}
        <LanguagePicker />
      </div>
    </footer>
  )
}