import { useState, useEffect } from "react";
import "./App.css"

const EightBall = (props: any) => {
  return (
    <>
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        onClick={props.getRandomMessage}
        style={{ cursor: "pointer" }}
      >
        {/* Gradient Definition */}
        <defs>
          <radialGradient id="ballGradient" cx="49%" cy="42%" r="50%">
            <stop offset="0%" stopColor="#000" />
            <stop offset="80%" stopColor="#333" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
        </defs>

        <defs>
          <radialGradient id="windowGradient" cx="50%" cy="50%" r="95%">
            <stop offset="19%" stopColor="blue" />
            <stop offset="100%" stopColor="black" />
          </radialGradient>
        </defs>

        {/* 8-ball Circle */}
        <circle
          cx="150"
          cy="150"
          r="140"
          fill="url(#ballGradient)"
          stroke="darkblue"
          strokeWidth="5"
        />

        {/* Blue Elliptical Window */}
        <ellipse
          cx="150"
          cy="100"
          rx="81"
          ry="74"
          fill="url(#windowGradient)"
          transform="rotate(-5, 150, 130)" // Slightly angled
        />

        {/* Triangle in the Center */}
        <g transform={`rotate(${props.rotation}, 150, 90)`}>
          <polygon
            points="115,55 205,55 165,110" // Smaller triangle vertices
            fill="darkblue"
            style={{
              opacity: props.showMessage ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
          <text
            x="160"
            y="70"
            textAnchor="middle"
            fontSize="12"
            fill="#FFF"
            fontWeight="bold"
            dominantBaseline="middle"
            style={{
              opacity: props.showMessage ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            {props.message}
          </text>
        </g>
      </svg>
    </>
  )
}

const QuestionHistory = (props: any) => {
  return (
    <>
    {props.history.map((entry: any, index: any) => (
          <div
            key={index}
            style={{
              backgroundColor: "#444",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "20px",
              margin: "5px 0",
              maxWidth: "80%",
              wordBreak: "break-word",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
              position: "relative",
            }}
          >
            <div style={{textAlign:'center'}}>{entry.text}</div>
            <div
              style={{
                fontSize: "10px",
                color: "#bbb",
                textAlign: "right",
                marginTop: "5px",
              }}
            >
              {entry.time}
            </div>
          </div>
        ))}
    </>
  )
}

const App = () => {
  const [message, setMessage] = useState("AMA");
  const [showMessage, setShowMessage] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [history, setHistory] = useState<any>([]); // Track message history
  const messages = [
    "Yes",
    "No",
    "Maybe",
    "Ask later",
    "Definitely",
    "Not sure",
    "Absolutely",
    "Try again",
  ];

  const getRandomMessage = () => {
    setShowMessage(false); // Start fade-out
    setTimeout(() => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      const randomRotation = Math.floor(Math.random() * 360); // Random angle
      setMessage(randomMessage);
      setRotation(randomRotation);
      setShowMessage(true); // Start fade-in

      // Update message history with timestamp
      const timestamp = new Date().toLocaleString(); // Get current date and time
      setHistory((prevHistory: any) => [
        { text: randomMessage, time: timestamp },
        ...prevHistory,
      ]);
    }, 500);
  };

  useEffect(() => {
    setShowMessage(true); // Initial fade-in
  }, []);

  return (
    <div className="app-container">
      <h2>8-ball</h2>

      {/* 8-ball SVG */}
      <EightBall getRandomMessage={getRandomMessage} message={message} showMessage={showMessage} rotation={rotation}/>

      {/* Chat Bubble History */}
      <div className='eight-ball-history'>
        <QuestionHistory history={history}/>
      </div>
    </div>
  );
};

export default App;
