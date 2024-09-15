import fsExtra from 'fs-extra';
import { resolve } from 'path';

// Destructure the necessary methods from fs-extra
const { readJson, writeFile } = fsExtra;

// specify input JSON and output SCSS files
const inputJsonPath = resolve("src/tokens/figma-tokens.json");
const outputColorScssPath = resolve("src/styles/abstract/_colors2.scss");
const outputTypographyScssPath = resolve("src/styles/abstract/_typography2.scss");
const outputSizesScssPath = resolve("src/styles/abstract/_sizes2.scss");

const baseFontSize = 16;
const pxToRem = px => `${px / baseFontSize}rem`;

function colorJsonToScss(json) {
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

function typographyJsonToScss(json) {
  let scss = "";

  const baseFontSize = 16;
  const pxToRem = px => `${px / baseFontSize}rem`;

  for (const propertyKey in json) {
    const property = json[propertyKey];

    const convertToRem = /size|height/gi.test(propertyKey);

    // Match the property key with the category
    if (/family/gi.test(propertyKey)) {
      // Font families
      for (const key in property) {
        scss += `$ff-${key.toLowerCase()}: "${property[key].$value}", sans-serif;\n`;
      }
    } else if (/size/gi.test(propertyKey)) {
      // Font sizes
      scss += `$font-sizes: (\n`;
      for (const key in property) {
        let value = property[key].$value;
        if (convertToRem) {
          value = pxToRem(parseFloat(value));
        }
        scss += `  ${key}: ${value},\n`;
      }
      scss += ');\n';
    } else if (/weight/gi.test(propertyKey)) {
      // Font weights
      for (const key in property) {
        let fontWeight = "";
        switch (property[key].$value.toLowerCase()) {
          case "thin": fontWeight = "100"; break;
          case "extra light":
          case "ultra light": fontWeight = "200"; break;
          case "light": fontWeight = "300"; break;
          case "normal": fontWeight = "400"; break;
          case "medium": fontWeight = "500"; break;
          case "semi bold":
          case "demi bold": fontWeight = "600"; break;
          case "bold": fontWeight = "700"; break;
          case "extra bold":
          case "ultra bold": fontWeight = "800"; break;
          default: fontWeight = "400";
        }
        scss += `$fw-${key}: ${fontWeight};\n`;
      }
    } else if (/height/gi.test(propertyKey)) {
      // Line heights
      scss += `$line-heights: (\n`;
      for (const key in property) {
        let value = property[key].$value;
        if (convertToRem) {
          value = pxToRem(parseFloat(value));
        }
        scss += `  ${key}: ${value},\n`;
      }
      scss += ');\n';
    }
    scss += '\n';
  }

  return scss;
}

function sizesJsonToScss(json) {
  let scss = '';
  scss += '$sizes: (\n';
  for (const key in json.Sizes) {
    const value = pxToRem(parseFloat(json.Sizes[key].$value));
    scss += `  ${key}: ${value},\n`;
  }
  scss += ');\n\n';

  for (const key in json['Other']) {
    const value = pxToRem(parseFloat(json.Other[key].$value));
    scss += `$${key.replace('-', '')}: ${value};\n`;
  }

  return scss;
}


// Ordered array of handlers
const handlers = [
  {
    converter: colorJsonToScss,
    outputFilePath: outputColorScssPath,
  },
  {
    converter: typographyJsonToScss,
    outputFilePath: outputTypographyScssPath,
  },
  {
    converter: sizesJsonToScss,
    outputFilePath: outputSizesScssPath,
  },
];

// Function to read the JSON file, convert it, and write to SCSS files based on type
async function convertTokens() {
  try {
    const jsonData = await readJson(inputJsonPath);
    const tokenSetOrder = jsonData["$metadata"]["tokenSetOrder"];

    for (let i = 0; i < tokenSetOrder.length; i++) {
      const scssData = handlers[i].converter(jsonData[tokenSetOrder[i]]);
      await writeFile(handlers[i].outputFilePath, scssData, 'utf8');
      console.log(`Processed ${tokenSetOrder[i]}`);
    }

    console.log(`SCSS files have been updated.`);

  } catch (error) {
    console.error('Error reading or writing files', error);
  }
}

convertTokens();