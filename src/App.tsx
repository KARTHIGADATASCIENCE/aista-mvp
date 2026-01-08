import { useState } from "react";
import ClassSetup from "./pages/classsetup";
import LiveClass from "./pages/Liveclass";

export default function App() {
  const [started, setStarted] = useState(false);
  const [topic, setTopic] = useState("");
  const [mode, setMode] = useState<"camera" | "no-camera" | "video">("camera");

  if (!started) {
    return (
      <ClassSetup
        onStart={(t, m) => {
          setTopic(t);
          setMode(m);
          setStarted(true);
        }}
      />
    );
  }

  return <LiveClass initialTopic={topic} mode={mode} />;
}
