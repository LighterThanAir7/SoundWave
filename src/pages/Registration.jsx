import Footer from "../components/layout/Footer.jsx";
import Logo from "../components/common/Logo.jsx";
import {useState} from "react";
import Step0 from "../components/registrationSteps/step0.jsx";
import Step1 from "../components/registrationSteps/step1.jsx";
import Step2 from "../components/registrationSteps/step2.jsx";
import Step3 from "../components/registrationSteps/step3.jsx";
import api from '../backend/config/axiosConfig.js';

export default function Registration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    step0: {},
    step1: {},
    step2: {},
    step3: {}
  });

  const getStepTitle = (step) => {
    switch(step) {
      case 0:
        return "Create account to start listening";
      case 1:
        return "Create a password";
      case 2:
        return "Tell us about yourself";
      case 3:
        return "Terms & Conditions";
      default:
        return "Create account to start listening";
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 0:
        return <Step0
          formData={formData}
          setFormData={setFormData}
          onNext={() => setCurrentStep(1)}
        />;
      case 1:
        return <Step1
          formData={formData}
          setFormData={setFormData}
          onNext={() => setCurrentStep(2)}
          setCurrentStep={setCurrentStep}
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
          onSubmit={handleSubmit}
        />;
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    try {
      const formattedData = {
        email: formData.step0.email,
        password: formData.step1.password,
        personalInfo: {
          displayName: formData.step2.displayName,
          dateOfBirth: {
            day: formData.step2.day,
            month: formData.step2.month,
            year: formData.step2.year
          },
          gender: formData.step2.gender
        },
        preferences: {
          notifications: formData.step3.marketingConsent,
          dataSharing: formData.step3.privacyConsent
        }
      };

      const response = await api.post('/api/users/register', formattedData);

      if (response.status === 201) {
        console.log('Registration successful:', response.data);
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
    }
  };

  return (
    <main className="">
      <div className="registration">
        <Logo className="mb-32"/>

        <form className="form form--registration">
          <h3 className="registration-steps__title">{getStepTitle(currentStep)}</h3>

          {/* Prikazujemo ProgressSteps samo ako nije početni korak */}
          {currentStep > 0 && (
            <ProgressSteps
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          )}

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
      {[1, 2, 3].map((step) => (
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
          style={{width: `${((currentStep - 1) / 2) * 100}%`}}
        />
      </div>
    </div>
  );
}
