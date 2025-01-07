export default function Step4 () {
  return (
    <>
      <div className="custom-checkbox-field | mb-16">
        <div>
          <input type="checkbox" className="custom-checkbox-field__input" id="checkbox-marketing"/>
          <label className="custom-checkbox-field__label" htmlFor="checkbox-marketing">
            <span className="custom-checkbox-field__indicator"></span>
            <span
              className="custom-checkbox-field__text">I would prefer not to receive marketing messages from Spotify</span>
          </label>
        </div>
      </div>

      <div className="custom-checkbox-field | mb-24">
        <div>
          <input type="checkbox" className="custom-checkbox-field__input" id="checkbox-privacy"/>
          <label className="custom-checkbox-field__label" htmlFor="checkbox-privacy">
            <span className="custom-checkbox-field__indicator"></span>
            <span
              className="custom-checkbox-field__text">Share my registration data with Spotify&apos;s content providers for marketing purposes. Note that your data may be transferred to a country outside of the EEA as described in our privacy policy.</span>
          </label>
        </div>
      </div>

      <p className="text-250 | mb-16">By clicking on sign-up, you agree to Soundwave&apos;s <a href=""
                                                                                             className="clr-primary-500">Terms
        and Conditions of Use</a>.</p>
      <p className="text-250 | mb-24">To learn more about how Spotify collects, uses, shares and protects your personal data,
        please
        see <a href="" className="clr-primary-500">Spotify&apos;s Privacy Policy</a>.</p>

      <button
        type="button"
        className="btn btn--primary"
      >
        Finish Registration
      </button>
    </>
  )
}