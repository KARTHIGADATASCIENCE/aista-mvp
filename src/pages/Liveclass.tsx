import { useState, useEffect } from "react";

import { getEngagementStatus } from "../logic/engagement";
import { generateSessionSummary } from "../logic/sessionsummary";
import { getTeachingAssist } from "../logic/aiengine";

import type { EngagementEvent, SessionSummary } from "../types";
import type { ClassMode } from "./classsetup";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

/* -------------------- */
/* Props */
/* -------------------- */
type LiveClassProps = {
  initialTopic: string;
  mode: ClassMode;
};

export default function LiveClass({ initialTopic, mode }: LiveClassProps) {
  /* -------------------- */
  /* State */
  /* -------------------- */
  const [topic, setTopic] = useState(initialTopic);
  const [score, setScore] = useState(75);
  const [timeline, setTimeline] = useState<EngagementEvent[]>([]);
  const [summary, setSummary] = useState<SessionSummary | null>(null);

  /* -------------------- */
  /* Derived */
  /* -------------------- */
  const status = getEngagementStatus(score);
  const teachingAssist = getTeachingAssist(
    status,
    topic || "the current topic"
  );

  /* -------------------- */
  /* Realistic Engagement Simulation */
  /* -------------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      let newScore = score;

      // Natural attention decay
      newScore -= Math.random() * 2;

      // Occasional recovery (teacher explanation works)
      if (Math.random() > 0.7) {
        newScore += Math.random() * 4;
      }

      // Rare confusion spike
      if (Math.random() > 0.9) {
        newScore -= 10;
      }

      newScore = Math.max(0, Math.min(100, Math.round(newScore)));

      const eventType =
        newScore < score - 3
          ? "drop"
          : newScore > score + 3
          ? "engaged"
          : "confused";

      setScore(newScore);
      setTimeline((prev) => [
        ...prev,
        {
          type: eventType,
          timestamp: Date.now(),
          score: newScore
        }
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, [score]);

  /* -------------------- */
  /* UI */
  /* -------------------- */
  return (
    <div style={{ padding: 40 }}>
      <h2>Live Class</h2>

      <p style={{ fontStyle: "italic" }}>
        Mode: <strong>{mode}</strong> — Engagement analysis running (simulated in
        MVP)
      </p>

      {/* Camera / Video */}
      {mode === "camera" && (
        <div style={{ marginTop: 20 }}>
          <h4>Live Camera Feed</h4>
          <video
            autoPlay
            muted
            playsInline
            width={320}
            height={240}
            style={{ border: "1px solid #ccc" }}
            ref={(video) => {
              if (video && navigator.mediaDevices) {
                navigator.mediaDevices
                  .getUserMedia({ video: true })
                  .then((stream) => {
                    video.srcObject = stream;
                  })
                  .catch(() => {});
              }
            }}
          />
        </div>
      )}

      {mode === "video" && (
        <div style={{ marginTop: 20 }}>
          <h4>Uploaded Lecture Video</h4>
          <input type="file" accept="video/*" />
        </div>
      )}

      {/* Topic */}
      <div style={{ marginTop: 20 }}>
        <strong>Topic:</strong>{" "}
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{ padding: 6 }}
        />
      </div>

      {/* Engagement Status */}
      <p>
        Engagement Score: <strong>{score}</strong>
      </p>
      <p>
        Status: <strong>{status}</strong>
      </p>

      {/* Teacher Assist Panel */}
      {teachingAssist && (
        <div
          style={{
            marginTop: 30,
            padding: 20,
            border: "2px solid #6c63ff",
            background: "#f6f5ff"
          }}
        >
          <h4>Teacher Assist Panel</h4>

          <p>
            <strong>Simplified Explanation</strong>
          </p>
          <p>{teachingAssist.explanation}</p>

          <p style={{ marginTop: 15 }}>
            <strong>Live Engagement Quiz</strong>
          </p>
          <ul>
            {teachingAssist.quiz.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Engagement Graph */}
      {timeline.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h4>Engagement Graph</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={timeline}>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(t) =>
                  new Date(t).toLocaleTimeString().slice(0, 5)
                }
              />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#6c63ff"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Engagement Timeline */}
      {timeline.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <h4>Engagement Timeline</h4>
          <ul>
            {timeline.slice(-6).map((event, index) => (
              <li key={index}>
                {new Date(event.timestamp).toLocaleTimeString()} —{" "}
                {event.type} (score: {event.score})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* End Session */}
      <div style={{ marginTop: 30 }}>
        <button
          onClick={() =>
            setSummary(generateSessionSummary(topic || "the topic"))
          }
        >
          End Session
        </button>
      </div>

      {/* Session Output */}
      {summary && (
        <div style={{ marginTop: 40, padding: 20, border: "1px solid #ddd" }}>
          <h3>AISTA – Session Learning Pack</h3>

          <p>
            <strong>Topic:</strong> {summary.topic}
          </p>

          <h4>Key Points</h4>
          <ul>
            {summary.keyPoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          <h4>Easy Notes</h4>
          <p>{summary.notes}</p>

          <h4>Quiz</h4>
          <ul>
            {summary.quiz.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
