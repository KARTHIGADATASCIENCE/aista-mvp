import { useState } from "react";

export type ClassMode = "camera" | "no-camera" | "video";

type ClassSetupProps = {
  onStart: (topic: string, mode: ClassMode) => void;
};

export default function ClassSetup({ onStart }: ClassSetupProps) {
  const [topic, setTopic] = useState("");
  const [mode, setMode] = useState<ClassMode>("camera");

  return (
    <div style={{ padding: 40, maxWidth: 700, margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>AISTA</h1>
      <p style={{ textAlign: "center" }}>
        AI Teaching & Student Engagement Assistant
      </p>

      <h3>Class Topic</h3>
      <input
        type="text"
        placeholder="e.g. Introduction to Quantum Physics"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ width: "100%", padding: 10 }}
      />

      <h3 style={{ marginTop: 20 }}>Choose Class Mode</h3>

      <div style={{ lineHeight: 2 }}>
        <label>
          <input
            type="radio"
            checked={mode === "camera"}
            onChange={() => setMode("camera")}
          />{" "}
          Live with Camera
        </label>
        <br />
        <label>
          <input
            type="radio"
            checked={mode === "no-camera"}
            onChange={() => setMode("no-camera")}
          />{" "}
          Live (No Camera)
        </label>
        <br />
        <label>
          <input
            type="radio"
            checked={mode === "video"}
            onChange={() => setMode("video")}
          />{" "}
          Process Recording / Video
        </label>
      </div>

      <button
        style={{
          marginTop: 30,
          padding: 12,
          width: "100%",
          fontSize: 16
        }}
        disabled={!topic}
        onClick={() => onStart(topic, mode)}
      >
        Start Live Classroom
      </button>
    </div>
  );
}
