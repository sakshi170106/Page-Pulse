const express = require("express");
const cors = require("cors");

const auditRoute = require("./routes/audit");

const app = express();

app.use(cors());
app.use(express.json());


// API Routes
app.use("/api", auditRoute);


// Test route
app.get("/", (req, res) => {
    res.send("Page Pulse Backend Running");
});


const PORT = 5000;


// Start server only when running directly
if (require.main === module) {

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}


// Export app for testing
module.exports = app;