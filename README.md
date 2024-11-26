Building an AI Culinary Consultant: AI as Your Sous Chef and Strategist

In today's highly competitive food industry, cloud kitchens are redefining the dining experience. However, competing with established market players requires innovative tools that streamline operations and enhance decision-making. In this blog, we'll guide you through building an AI-Powered Culinary Assistant that generates recipes and provides pricing insights, empowering cloud kitchens to thrive in a competitive marketplace.
![eve4](https://github.com/user-attachments/assets/ad74c43d-6772-4043-92fc-c97a039985ca)

Introduction | Overview
Cloud kitchens operate in a unique environment where efficient management, cost control, and creativity are vital to success. Crafting competitive dishes and pricing them effectively can be overwhelming, especially for new entrants in the market.
This project is for developers with intermediate experience in web development and cloud APIs. It will teach you how to integrate AI into a web app using Google Generative AI (Gemini API) and deploy it with Node.js and Express.js.
By the end of this blog, you'll have a functional web app that:
1. Accepts ingredients as input.
2. Generates a recipe with presentation tips.
3. Provides a selling price for the dish.

Design
This project is designed to combine frontend interactivity with backend AI logic. The architecture consists of:
1. A frontend (HTML/JavaScript) for user interaction.
2. A backend (Node.js + Express.js) to process inputs, interact with Google Gemini through API, and handle responses.

Why This Design?
Ease of Use: A clean and minimal interface ensures usability for non-tech-savvy users.
2. Scalability: Backend logic allows easy integration with additional APIs (e.g., nutrition data).
3. Efficiency: Using Google Generative AI ensures accurate and quick content generation.

Below is the high-level architecture:
User Input (Ingredients) --> Backend (Recipe Generation + Price Calculation) 
--> Display Recipe + Suggested Price

Prerequisites
Before you begin, make sure you have:
1. Node.js installed. Download here
2. Basic knowledge of:
 HTML/CSS and JavaScript.
 REST APIs and JSON.
3. A Google Cloud Project with Generative AI APIs enabled. Learn how to set it up here.

Step-by-Step Instructions

Step 1: Setting Up the Development Environment
1.Install Node.js
Download and install Node.js from the official website. This will allow you to run JavaScript code outside the browser and manage project dependencies.
2. Create a Project Directory
Set up a folder for your project. For example:
  mkdir ai-culinary-assistant
  cd ai-culinary-assistant
3. Initialize the Project
Run the following command to create a package.json file for managing dependencies:
  npm init -y
4. Install Dependencies
Use npm to install the necessary packages:
  npm install express body-parser @google/generative-ai

Step 2: Writing the Backend Logic
1.Create the server.js File
Inside your project folder, create a server.js file. This will handle server-side logic, including processing input, calling the Gemini API, and retrieving pricing data.
2. Write the Code
Paste the following code into server.js:
  const express = require("express");
  const bodyParser = require("body-parser");
  const path = require("path");
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  
  const app = express();
  const port = 3000;
  
  app.use(bodyParser.json());
  
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
  const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  app.post("/generate-recipe", async (req, res) => {
    const { ingredients } = req.body;
  
    const recipePrompt = `YOUR_PROMPT: ${ingredients}`;
    const pricePrompt = `YOUR_PROMPT`;
  
    try {
      const recipeResult = await model.generateContent(recipePrompt);
      const recipeResponse = await recipeResult.response.text();
  
      const priceResult = await model.generateContent(pricePrompt);
      const priceResponse = await priceResult.response.text();
  
      res.json({
        recipe: recipeResponse,
        price: priceResponse.trim(),
      });
    } catch (error) {
      console.error("Error generating recipe or price:", error);
      res.status(500).json({ error: "Failed to generate recipe or price" });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
3. Replace the API Key
Replace "YOUR_API_KEY" with your actual Google Generative AI API key.

Step 3: Creating the Frontend
Create the index.html File
In the project folder, create an index.html file. This will provide the user interface for entering ingredients and displaying results.
Add Basic HTML Structure
Start with the basic HTML boilerplate. You'll need to include elements such as:
An input field for entering the ingredients.
A button to trigger recipe generation.
A section to display the generated recipe.
A section for displaying the suggested price.
![eve 1](https://github.com/user-attachments/assets/ea1ed401-92b8-4fbf-99f5-ad5cc50e6d4e)

Step 4: Running the Application

1.Start the Server

Run the server using Node.js:

  node server.js
  
2. Open the Application
   
Open your browser and go to http://localhost:3000.

4. Test the App
   
Enter ingredients (e.g., chicken, garlic, onions).

View the generated recipe and price.

Step 5: Troubleshooting Tips

1.API Key Issues: Ensure your Google Cloud Project is set up correctly and the API key is active.

2. CORS Errors: If accessing the app from another machine, configure CORS in your Express server.

3. Module Not Found: Reinstall missing packages using npm install.

Result
By completing this project, you'll create an app like this:

![eve 2](https://github.com/user-attachments/assets/aa8e88c1-ce53-4d88-8375-93f8f47ae264)
![eve 3](https://github.com/user-attachments/assets/1dacc48b-d0f0-4287-bbe3-0999820a2d21)

This tool empowers cloud kitchens to innovate recipes and align pricing with market standards, leveling the playing field against larger competitors.

Call to action

To learn more about Google Cloud services and to create impact for the work you do, get around to these steps right away:

Register for Code Vipassana sessions

Sign up to become Google Cloud Innovator
