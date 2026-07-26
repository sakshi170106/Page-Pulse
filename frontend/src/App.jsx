import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeWebsite = async () => {
    if (!url) {
      setError("Please enter website URL");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await fetch(
        "https://page-pulse-74ja.onrender.com/api/audit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: url,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setResult(data);

    } catch (err) {
      console.log(err);
      setError("Failed to fetch");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="app">
      <h1>Page Pulse</h1>

      <p>
        Website Performance Auditor
      </p>

      <input
        type="text"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={analyzeWebsite}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>


      {error && (
        <p className="error">
          {error}
        </p>
      )}


      {result && (
        <div className="result">
          <h2>Audit Result</h2>

          <pre>
            {JSON.stringify(result, null, 2)}
          </pre>

        </div>
      )}

    </div>
  );
}

export default App;