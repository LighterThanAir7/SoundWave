import footerItems from "../../config/FooterConfig.jsx";
import LanguagePicker from "../common/LanguagePicker.jsx";
import {Link} from "react-router-dom";
import FooterSocials from "../common/FooterSocials.jsx";

const footerLinks = [
  ['Get Started', 'Download App', 'Pricing & Plans', 'Playlist Import', 'Supported Devices'],
  ['Discover More', 'About Us', 'Explore The App', 'Culture', 'Originals'],
  ['Account', 'Sign Up', 'Redeem Giftcard', 'Store', 'Support'],
  ['Company', 'About us', 'Partners', 'Carrers', 'Press']
];

export default function Footer ({ type, footerClass }) {

  const renderFooter = () => {
    switch (type) {
      case "large":
        return (
          <footer className={`footer-large`}>
            <div className="footer__links">
              {footerLinks.map((linksColumn, columnIndex) => (
                <ul key={columnIndex} className="footer__list">
                  {linksColumn.map((link, linkIndex) => (
                    <li className="footer__item" key={linkIndex}>
                      <Link className="footer__link" to="#">{link}</Link>
                    </li>
                  ))}
                </ul>
              ))}
              <div className="footer__quote">
                <div className="footer__quote-decoration"></div>
                <p className="footer__quote-text">
                  Music is everybody's possession. It's only publishers who think that people own it.
                </p>
                <p className="footer__quote-author">- John Lennon</p>
                <Link className="btn btn--primary" to="/login">Join Now</Link>
              </div>
            </div>
            <div className="flex justify-space-between items-center relative mb-32">
              <p className="footer__terms-of-use">SoundWave Eget senectus volutpat nibh ut vitae ullamcorper. Etiam sit arcu facilisis porta. Pellentesque fringilla gravida urna in adipiscing quam nisl massa. Id donec habitasse aliquet tortor in. Vulputate facilisi aliquet senectus tincidunt</p>
              <FooterSocials />
            </div>
          </footer>
        );
      case "bottom":
        return (
          <footer className={`footer ${footerClass ? "footer--adjust-for-sidebar" : ""}`}>
            <a className="footer__logo" href="">
              <i className="icon-logo mr-10"></i>SoundWave © 2024
            </a>

            <nav className="footer__nav">
              {footerItems.map((item, index) => (
                <a className="footer__link" key={index} href="">{item.label}</a>
              ))}
              <LanguagePicker/>
            </nav>
          </footer>
        );
      default:
        return (
          <p>Footer</p>
        )
    }
  }

  return (
    renderFooter()
  )
}