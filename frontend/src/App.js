import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("...loading");
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");

  // Fetch initial message from the backend
  useEffect(() => {
    fetch("/api/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error:", err));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page reload
    try {
      const res = await fetch("/api/echo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();
      setResponse(data.response || "Error: No response from backend.");
    } catch (err) {
      console.error("Error submitting message:", err);
      setResponse("Failed to connect to backend.");
    }
  };

  return (
    <div>
      <h1>Frontend Message:</h1>
      <p>{message}</p>

      <h2>Send a Message to the Backend</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here"
        />
        <button type="submit">Send</button>
      </form>

      <h3>Backend Response:</h3>
      <p>{response}</p>
    </div>
  );
}

export default App;
