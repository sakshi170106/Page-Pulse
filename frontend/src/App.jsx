import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeWebsite = async () => {
    setError("");
    setReport(null);

    if (!url) {
      setError("Please enter a website URL");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/audit",
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
        throw new Error(data.error || "Unable to fetch website");
      }

      setReport(data);

    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };


  return (
    <div className="container">

      <h1>Page Pulse</h1>

      <p>Website Performance Auditor</p>


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



      {report && (
        <div className="card">

          <h2>Report</h2>

          <p>
            Status: {report.status}
          </p>

          <p>
            Response Time: {report.responseTime}
          </p>

          <p>
            Title: {report.title}
          </p>

          <p>
            Meta Description: {report.metaDescription}
          </p>

          <p>
            H1 Count: {report.h1Count}
          </p>

          <p>
            Missing Alt Images: {report.missingAltImages}
          </p>

          <p>
            Word Count: {report.wordCount}
          </p>

        </div>
      )}



      <footer>
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noreferrer"
        >
          Built for Digital Heroes Training Task
        </a>
      </footer>


    </div>
  );
}


export default App;