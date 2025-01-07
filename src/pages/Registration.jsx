import Footer from "../components/layout/Footer.jsx";
import Logo from "../components/common/Logo.jsx";
import {useState} from "react";
import Step1 from "../components/registrationSteps/step1.jsx";
import Step2 from "../components/registrationSteps/step2.jsx";
import Step3 from "../components/registrationSteps/step3.jsx";
import Step4 from "../components/registrationSteps/step4.jsx";

export default function Registration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {}
  });

  const getStepTitle = (step) => {
    switch(step) {
      case 1:
        return "Create account to start listening";
      case 2:
        return "Create a password";
      case 3:
        return "Tell us about yourself";
      case 4:
        return "Terms & Conditions";
      default:
        return "Create account to start listening";
    }
  };

  const handleSubmit = () => {
    // Implementacija submit logike
    console.log('Form submitted', formData);
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return <Step1
          formData={formData}
          setFormData={setFormData}
          onNext={() => setCurrentStep(2)}
        />;
      case 2:
        return <Step2
          formData={formData}
          setFormData={setFormData}
          onNext={() => setCurrentStep(3)}
        />;
      case 3:
        return <Step3
          formData={formData}
          setFormData={setFormData}
          onNext={() => setCurrentStep(4)}
        />;
      case 4:
        return <Step4
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />;
      default:
        return null;
    }
  };

  return (
    <main className="">
      <div className="registration">
        <Logo className="mb-32"/>

        <form className="form form--registration">
          <h3 className="registration-steps__title">{getStepTitle(currentStep)}</h3>

          <ProgressSteps
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />

          {renderStep()}
        </form>
      </div>
      <Footer type="bottom"/>
    </main>
  )
}

function ProgressSteps({currentStep, setCurrentStep}) {
  const handleStepClick = (stepNumber) => {
    if (stepNumber <= currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  return (
    <div className="registration-steps">
      {[1, 2, 3, 4].map((step) => (
        <div
          key={step}
          className={`registration-steps__item 
            ${currentStep === step ? 'registration-steps__item--current' :
            currentStep > step ? 'registration-steps__item--completed' : ''}
            ${step <= currentStep ? 'registration-steps__item--clickable' : ''}`}
          onClick={() => handleStepClick(step)}
        >
          {step}
        </div>
      ))}

      <div className="registration-steps__progress-container">
        <div
          className="registration-steps__progress"
          style={{width: `${((currentStep - 1) / 3) * 100}%`}}
        />
      </div>
    </div>
  );
}
