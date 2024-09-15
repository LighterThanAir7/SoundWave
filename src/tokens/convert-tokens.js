import fsExtra from 'fs-extra';
import { resolve } from 'path';

// Destructure the necessary methods from fs-extra
const { readJson, writeFile } = fsExtra;

const inputJsonPath = resolve("src/tokens/colors.json");
const outputScssPath = resolve("src/styles/abstract/_colors2.scss");

// Function to convert JSON to SCSS format
function jsonToScss(json) {
  let scss = "$colors: (\n";

  for (const group in json) {
    scss += `  ${group.toLowerCase()}: (\n`;

    for (const key in json[group]) {
      const colorValue = json[group][key]["$value"];
      const colorName = key.split('-')[1] || key;
      scss += `    ${colorName}: ${colorValue},\n`;
    }

    scss += "  ),\n";
  }

  scss += ");";
  return scss;
}

// Read the JSON file, convert it, and write to SCSS file
async function convertTokens() {
  try {
    const jsonData = await readJson(inputJsonPath);
    const scssData = jsonToScss(jsonData);

    // Write the generated SCSS to the _colors.scss file
    await writeFile(outputScssPath, scssData, 'utf8');
    console.log(`SCSS file has been updated at ${outputScssPath}`);
  } catch (error) {
    console.error('Error reading or writing files', error);
  }
}

convertTokens();