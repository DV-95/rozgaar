import { useNavigate } from "react-router-dom";
import TypingHeadline from "../components/TypingHeadline";
import VoiceButton from "../components/VoiceButton";
import { headlines } from "../data/headlines";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="home">
      <div className="home-voice">
        <VoiceButton variant="light" label="Listen" />
      </div>

      <div className="home-content">
        <h1 className="home-title">
          <span className="hindi" lang="hi">रोज़</span>
          <span className="latin">gaar</span>
        </h1>

        <div className="home-headline">
          <TypingHeadline lines={headlines} />
        </div>

        <div className="home-buttons">
          <button className="btn btn-light" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
          <button className="btn btn-outline-light" onClick={() => navigate("/login")}>
            Log In
          </button>
        </div>
      </div>
    </main>
  );
}