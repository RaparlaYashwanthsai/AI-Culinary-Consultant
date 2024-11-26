const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve index.html from the root of the project
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Your API Key and model
const genAI = new GoogleGenerativeAI("AIzaSyB2Z86D77mGsxT5Z4JCNJ_9IDAPXKRhFd4");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// API endpoint for generating recipes and prices
app.post("/generate-recipe", async (req, res) => {
  const { ingredients } = req.body;

  const recipePrompt = `Create a recipe using the following ingredients and also suggest the best presentation method to serve the dish. The first line should be the name of the recipe within 3 words, and also do not keep any of the text in response bold. Ingredients are: ${ingredients}`;
  const pricePrompt = `Suggest a selling price for a dish prepared using these ingredients: ${ingredients}. Only provide the price in USD without any additional text.`;

  try {
    // Generate the recipe
    const recipeResult = await model.generateContent(recipePrompt);
    const recipeResponse = await recipeResult.response.text();

    // Generate the price
    const priceResult = await model.generateContent(pricePrompt);
    const priceResponse = await priceResult.response.text();

    res.json({
      recipe: recipeResponse,
      price: priceResponse.trim(), // Trim unnecessary whitespace
    });
  } catch (error) {
    console.error("Error generating recipe or price:", error);
    res.status(500).json({ error: "Failed to generate recipe or price" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
