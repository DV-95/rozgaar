import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import VoiceButton from "../components/VoiceButton";
import {
  TextStep,
  ChoiceStep,
  PhotoStep,
  ExperienceStep,
  LocationStep,
  WageStep,
} from "../components/StepInputs";
import { steps, professions } from "../data/signupSteps";
import "./Signup.css";

const isEmpty = (v) =>
  v === undefined ||
  v === null ||
  v === "" ||
  (Array.isArray(v) && v.length === 0) ||
  (typeof v === "object" && !Array.isArray(v) && "text" in v && !v.text.trim());

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const current = steps[step];
  const value = answers[current.id];
  const setValue = (v) => setAnswers((a) => ({ ...a, [current.id]: v }));

  const canNext = !current.required || !isEmpty(value);
  const isLast = step === steps.length - 1;
  const nextLabel = isLast ? "Finish" : !current.required && isEmpty(value) ? "Skip" : "Next";

  const next = () => {
    if (!canNext) return;
    if (isLast) {
      try {
        localStorage.setItem("rozgaar_profile", JSON.stringify(answers));
      } catch (e) {
        /* photos can be large, ignore storage errors */
      }
      setDone(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  const back = () => (step === 0 ? navigate("/") : setStep((s) => s - 1));

  /* ---------- finished screen ---------- */
  if (done) {
    const job = professions.find((p) => p.id === answers.profession);
    return (
      <div className="signup">
        <div className="signup-body">
          <div className="card done-card">
            {answers.photo && <img className="done-photo" src={answers.photo} alt="You" />}
            <h2 className="q-title">Welcome, {answers.name}! 🎉</h2>
            <p className="q-hindi" lang="hi">आपका प्रोफ़ाइल तैयार है</p>
            <ul className="summary">
              <li><b>Work:</b> {job?.en}</li>
              <li><b>Age:</b> {answers.age}</li>
              <li><b>Location:</b> {answers.location?.text}</li>
              <li><b>Expected pay:</b> ₹{answers.wage} per hour</li>
              <li><b>Past work added:</b> {answers.experience?.length || 0}</li>
            </ul>
            <button className="btn btn-solid" onClick={() => navigate("/")}>
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- question screen ---------- */
  return (
    <div className="signup">
      <header className="signup-header">
        <button className="icon-btn" onClick={back} aria-label="Back">
          <ArrowLeft size={26} />
        </button>
        <span className="signup-logo">
          <span lang="hi">रोज़</span>gaar
        </span>
        <span className="step-count">{step + 1} / {steps.length}</span>
      </header>

      <div className="progress">
        <div className="progress-bar" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>

      <div className="signup-body">
        <div className="card question" key={current.id}>
          <h2 className="q-title">{current.en}</h2>
          <p className="q-hindi" lang="hi">{current.hi}</p>

          <div className="q-input">
            {(current.type === "text" || current.type === "number") && (
              <TextStep
                value={value}
                onChange={setValue}
                placeholder={current.placeholder}
                inputType={current.type}
                suffix={current.suffix}
                onEnter={next}
              />
            )}
            {current.type === "choice" && (
              <ChoiceStep options={current.options} value={value} onChange={setValue} />
            )}
            {current.type === "photo" && <PhotoStep value={value} onChange={setValue} />}
            {current.type === "experience" && <ExperienceStep value={value} onChange={setValue} />}
            {current.type === "location" && (
              <LocationStep value={value} onChange={setValue} placeholder={current.placeholder} />
            )}
            {current.type === "wage" && <WageStep value={value} onChange={setValue} onEnter={next} />}
          </div>

          {current.type !== "experience" && (
            <div className="q-voice">
              <VoiceButton label="Tap to speak" />
            </div>
          )}
        </div>
      </div>

      <footer className="signup-footer">
        <button className="btn btn-solid" onClick={next} disabled={!canNext}>
          {nextLabel}
        </button>
      </footer>
    </div>
  );
}