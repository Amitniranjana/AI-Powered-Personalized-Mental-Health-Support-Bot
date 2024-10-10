

// import React, { useState, useEffect, useRef } from 'react';
// import axios from "axios";

// const ChatBot = () => {
//   const [messages, setMessages] = useState(
//     JSON.parse(localStorage.getItem("chatHistory")) || [{type:"bot", text:"aaj ka din kaisa gya say hai"}]
//   );
//   const [userMessage, setUserMessage] = useState("");
//   const [isBotTyping, setIsBotTyping] = useState(false);
//   const [error, setError] = useState("");
//   const chatBoxRef = useRef(null);

//   useEffect(() => {
//     // Scroll to the bottom of the chat whenever messages change
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//     // Save messages to localStorage
//     localStorage.setItem("chatHistory", JSON.stringify(messages));
//   }, [messages]);

//   const handleSend = async () => {
//     if (userMessage.trim() !== "") {
//       setMessages([...messages, { type: 'user', text: userMessage }]);
//       setUserMessage("");
//       setIsBotTyping(true);
//       setError(""); // Clear previous errors

//       try {
//         const response = await axios.post('http://localhost:5000/get-response', {
//           userMessage: userMessage,
//         });

//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { type: 'bot', text: response.data.botMessage },
//         ]);
//       } catch (error) {
//         console.error("Error getting bot response:", error);
//         setError("There was an issue connecting to the server. Please try again.");
//       } finally {
//         setIsBotTyping(false);
//       }
//     }
//   };

//   return (
//     <div>
//       <h2 style={{backgroundColor:"green", border:"2px solid white", padding:"0.5rem"}}>*AI-Powered Personalized Mental Health Support Bot*</h2>

//       <div className="chat-container">
//         <div className="chat-box" ref={chatBoxRef}>
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`message ${msg.type === 'bot' ? 'bot' : 'user'}`}
//             >
//               {msg.text}
//             </div>
//           ))}

//           {isBotTyping && <div className="message bot">Bot is typing...</div>}
//         </div>

//         {error && <div style={{ color: 'red' }}>{error}</div>}

//         <div className="input-box">
//           <input
//             type="text"
//             value={userMessage}
//             onChange={(e) => setUserMessage(e.target.value)}
//             placeholder="Aap apna message yahan likhein..."
//             onKeyPress={(e) => e.key === 'Enter' && handleSend()} // Send message on Enter key
//           />
//           <button onClick={handleSend} disabled={isBotTyping}>
//             {isBotTyping ? "..." : "Send"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;





import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { useTransition, animated } from '@react-spring/web'; // Import from React Spring

const ChatBot = () => {
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("chatHistory")) || [{ type: "bot", text: "aaj ka din kaisa gya say hai" }]
  );
  const [userMessage, setUserMessage] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState("");
  const chatBoxRef = useRef(null);

  const transitions = useTransition(messages, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(-20px)' },
    keys: messages.map((msg, index) => index), // Ensure unique keys
  });

  useEffect(() => {
    // Scroll to the bottom of the chat whenever messages change
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
    // Save messages to localStorage
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (userMessage.trim() !== "") {
      setMessages([...messages, { type: 'user', text: userMessage }]);
      setUserMessage("");
      setIsBotTyping(true);
      setError(""); // Clear previous errors

      try {
        const response = await axios.post('http://localhost:5000/get-response', {
          userMessage: userMessage,
        });

        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'bot', text: response.data.botMessage },
        ]);
      } catch (error) {
        console.error("Error getting bot response:", error);
        setError("There was an issue connecting to the server. Please try again.");
      } finally {
        setIsBotTyping(false);
      }
    }
  };

  return (
    <div>
      <h2 style={{ backgroundColor: "green", border: "2px solid white", padding: "0.5rem" }}>*AI-Powered Personalized Mental Health Support Bot*</h2>

      <div className="chat-container">
        <div className="chat-box" ref={chatBoxRef}>
          {transitions((style, msg, _, index) => (
            <animated.div style={style} className={`message ${msg.type === 'bot' ? 'bot' : 'user'}`}>
              {msg.text}
            </animated.div>
          ))}

          {isBotTyping && <div className="message bot typing">Bot is typing...</div>}
        </div>

        {error && <div style={{ color: 'red' }}>{error}</div>}

        <div className="input-box">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Aap apna message yahan likhein..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()} // Send message on Enter key
          />
          <button onClick={handleSend} disabled={isBotTyping}>
            {isBotTyping ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
