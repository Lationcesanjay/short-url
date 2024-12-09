const express = require("express");
const urlRoute = require("./routes");
const { connectMongoDB } = require("./connections");
const URL = require("./models");
const app = express();
const PORT = 8001;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectMongoDB();

// Use the URL routes defined in the 'routes' folder
app.use("/url", urlRoute);

// Define the route for handling redirects based on shortId
app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;  // Get the shortId from the route parameters
  try {
    // Find the entry by shortId and push the visit into visitHistory
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: { visitHistory: { timestamp: Date.now() } }, // Add the timestamp of the visit
      }
    );

    if (!entry) {
      return res.status(404).json({ error: "Short ID not found" });
    }

    // Redirect to the original URL
    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
