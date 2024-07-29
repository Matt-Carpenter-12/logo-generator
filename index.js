const fs = require("fs")
const inquirer = require("inquirer")

// Function to generate SVG content
function generateSVG(text, textColor, shape, shapeColor) {
  let shapeSVG = "";

  // Define SVG for each shape
  if (shape === "circle") {
    shapeSVG = `<circle cx="150" cy="100" r="80" fill="${shapeColor}" />`;
  } else if (shape === "triangle") {
    shapeSVG = `<polygon points="150,20 250,180 50,180" fill="${shapeColor}" />`;
  } else if (shape === "square") {
    shapeSVG = `<rect x="50" y="50" width="200" height="200" fill="${shapeColor}" />`;
  }

  // Return SVG content as a string
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    ${shapeSVG}
    <text x="150" y="115" font-size="30" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>`;
}

// Function to handle user input and generate SVG file
async function promptUser() {
  const questions = [
    {
      type: "input",
      name: "text",
      message: "Enter up to three characters for the text:",
      validate: (input) =>
        input.length <= 3 ? true : "Text must be up to three characters long.",
    },
    {
      type: "input",
      name: "textColor",
      message: "Enter the text color (keyword or hexadecimal):",
      validate: (input) =>
        /^#[0-9A-Fa-f]{6}$|^[a-zA-Z]+$/.test(input)
          ? true
          : "Enter a valid color keyword or hexadecimal.",
    },
    {
      type: "list",
      name: "shape",
      message: "Choose a shape:",
      choices: ["circle", "triangle", "square"],
    },
    {
      type: "input",
      name: "shapeColor",
      message: "Enter the shape color (keyword or hexadecimal):",
      validate: (input) =>
        /^#[0-9A-Fa-f]{6}$|^[a-zA-Z]+$/.test(input)
          ? true
          : "Enter a valid color keyword or hexadecimal.",
    },
  ];

  // Use try-catch to handle potential errors
  try {
    const answers = await inquirer.prompt(questions);
    const { text, textColor, shape, shapeColor } = answers;
    const svgContent = generateSVG(text, textColor, shape, shapeColor);

    fs.writeFileSync("logo.svg", svgContent, "utf8");
    console.log("Generated logo.svg");
  } catch (error) {
    console.error("Error during prompt:", error);
  }
}

// Export for testing
module.exports = { generateSVG, promptUser };

// Execute the prompt function if this file is run directly
if (require.main === module) {
  promptUser();
}
