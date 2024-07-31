import { useState } from "react";

export default function LanguagePicker() {
  const [isLanguagePickerOpen, setIsLanguagePickerOpen] = useState(false);
  const languageItems = [
    "English", "Български", "Český", "Français", "Croatian", "Italiano",
    "Chinese", "Norsk", "Polski", "Português", "Slovenščina", "Srpski"
  ];

  function handleLanguagePicker() {
    setIsLanguagePickerOpen(!isLanguagePickerOpen);
  }

  const animationDuration = 1000;
  const decrement = 75;

  return (
    <div className="language-picker-container">
      <button className="language-picker" onClick={handleLanguagePicker}>
        <i className="icon-language"></i>Language
        <ul className={`language-picker__list ${isLanguagePickerOpen ? 'language-picker__list--open' : ''}`}>
          {languageItems.map((item, index) => (
            <li
              key={index}
              className="language-picker__item"
              style={{
                transition: `right ${animationDuration - (decrement * index)}ms cubic-bezier(0.68, -0.55, 0.27, 1.55)
                , background-color .2s ease-out
                , color .2s ease-out`
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </button>
    </div>
  );
}
