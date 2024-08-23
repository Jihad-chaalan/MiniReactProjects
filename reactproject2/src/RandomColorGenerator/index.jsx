import { useEffect, useState } from "react";
import "./style.css";

function ColorGenerator() {
  const [colorType, setColorType] = useState("hex");
  const [color, setColor] = useState("#0000");

  function randomNumber(length) {
    return Math.floor(Math.random() * length);
  }

  function generateHexColor() {
    const hex = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ];
    let hexColor = "#";
    for (let index = 0; index < 6; index++) {
      hexColor += hex[randomNumber(hex.length)];
    }
    setColor(hexColor);
  }

  function generateRgbColor() {
    let r = randomNumber(256);
    let g = randomNumber(256);
    let b = randomNumber(256);
    setColor(`rgb(${r},${g},${b})`);
  }

  useEffect(() => {
    colorType === "rgb" ? generateRgbColor() : generateHexColor();
  }, [colorType]);

  return (
    <div>
      <div className="buttonContainer">
        <button className="Singlebutton" onClick={() => setColorType("rgb")}>
          Set Color type RGB
        </button>
        <button className="Singlebutton" onClick={() => setColorType("hex")}>
          Set Color type Hex
        </button>
        <button
          className="Singlebutton"
          onClick={colorType === "hex" ? generateHexColor : generateRgbColor}
        >
          Generate Random Color
        </button>
      </div>
      <div className="colorContainer" style={{ background: color }}>
        <p>{color}</p>
      </div>
    </div>
  );
}
export default ColorGenerator;
