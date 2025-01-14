import {useState} from "react";

export default function Step3({ formData, setFormData, onSubmit }) {
  const [marketingConsent, setMarketingConsent] = useState(formData.step3?.marketingConsent || false);
  const [privacyConsent, setPrivacyConsent] = useState(formData.step3?.privacyConsent || false);

  const handleMarketingChange = (e) => {
    const checked = e.target.checked;
    setMarketingConsent(checked);
    setFormData(prev => ({
      ...prev,
      step3: { ...prev.step3, marketingConsent: checked }
    }));
  };

  const handlePrivacyChange = (e) => {
    const checked = e.target.checked;
    setPrivacyConsent(checked);
    setFormData(prev => ({
      ...prev,
      step3: { ...prev.step3, privacyConsent: checked }
    }));
  };

  const handleFinishRegistration = () => {
    onSubmit();
  };

  return (
    <>
      <div className="custom-checkbox-field | mb-16">
        <div>
          <input
            type="checkbox"
            className="custom-checkbox-field__input"
            id="checkbox-marketing"
            checked={marketingConsent}
            onChange={handleMarketingChange}
          />
          <label className="custom-checkbox-field__label" htmlFor="checkbox-marketing">
            <span className="custom-checkbox-field__indicator"></span>
            <span className="custom-checkbox-field__text">
              Keep me updated with music recommendations, new releases and exclusive offers
            </span>
          </label>
        </div>
      </div>

      <div className="custom-checkbox-field | mb-24">
        <div>
          <input
            type="checkbox"
            className="custom-checkbox-field__input"
            id="checkbox-privacy"
            checked={privacyConsent}
            onChange={handlePrivacyChange}
          />
          <label className="custom-checkbox-field__label" htmlFor="checkbox-privacy">
            <span className="custom-checkbox-field__indicator"></span>
            <span className="custom-checkbox-field__text">
              I agree to share my listening preferences to receive better music recommendations
            </span>
          </label>
        </div>
      </div>

      <p className="text-250 | mb-16">
        Almost there! By completing registration, you're agreeing to SoundWave's <a href="" className="clr-primary-500">Terms of Use</a>
      </p>

      <p className="text-250 | mb-24">
        Your data is protected and used exclusively according to our <a href="" className="clr-primary-500">Privacy Policy</a>
      </p>

      <button
        type="button"
        className="btn btn--primary"
        onClick={handleFinishRegistration}
      >
        Complete Registration
      </button>
    </>
  )
}