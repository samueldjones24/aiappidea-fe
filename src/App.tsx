import { useState, SyntheticEvent } from "react";
import axios from "axios";

export function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true)

    // Send a request to the server with the prompt
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/chat`, { prompt })
      .then((res) => {
        // Update the response state with the server's response
        setResponse(res.data);
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false)
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{isLoading ? 'Generating ideas...' : response}</p>
    </div>
  );
}