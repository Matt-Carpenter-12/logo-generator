const { generateSVG } = require("../index"); // Adjust path if necessary

describe("generateSVG", () => {
  it("should generate a valid SVG for a circle", () => {
    const svg = generateSVG("ABC", "blue", "circle", "red");
    expect(svg).toContain('<circle cx="150" cy="100" r="80" fill="red" />');
    expect(svg).toContain(
      '<text x="150" y="115" font-size="30" text-anchor="middle" fill="blue">ABC</text>'
    );
  });

  it("should generate a valid SVG for a triangle", () => {
    const svg = generateSVG("XYZ", "green", "triangle", "yellow");
    expect(svg).toContain(
      '<polygon points="150,20 250,180 50,180" fill="yellow" />'
    );
    expect(svg).toContain(
      '<text x="150" y="115" font-size="30" text-anchor="middle" fill="green">XYZ</text>'
    );
  });

  it("should generate a valid SVG for a square", () => {
    const svg = generateSVG("123", "black", "square", "purple");
    expect(svg).toContain(
      '<rect x="50" y="50" width="200" height="200" fill="purple" />'
    );
    expect(svg).toContain(
      '<text x="150" y="115" font-size="30" text-anchor="middle" fill="black">123</text>'
    );
  });

  it("should handle text color and shape color as hexadecimal", () => {
    const svg = generateSVG("DEF", "#FF5733", "circle", "#33FF57");
    expect(svg).toContain('<circle cx="150" cy="100" r="80" fill="#33FF57" />');
    expect(svg).toContain(
      '<text x="150" y="115" font-size="30" text-anchor="middle" fill="#FF5733">DEF</text>'
    );
  });

  it("should handle invalid colors gracefully", () => {
    const svg = generateSVG("GHI", "invalidColor", "triangle", "invalidColor");
    expect(svg).toContain(
      '<polygon points="150,20 250,180 50,180" fill="invalidColor" />'
    );
    expect(svg).toContain(
      '<text x="150" y="115" font-size="30" text-anchor="middle" fill="invalidColor">GHI</text>'
    );
  });
});
