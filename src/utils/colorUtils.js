export const predefinedColors = {
  "lavanda": { h: 248, s: 100, l: 73, a: 1},
  "neon-blue": { h: 241, s: 100, l: 66, a: 1},
  "deep-sky-blue": { h: 198, s: 100, l: 50, a: 1},
  "baby-blue": { h: 191, s: 100, l: 70, a: 1},
  "mint": { h: 168, s: 100, l: 50, a: 1},
  "spring-green": { h: 156, s: 100, l: 55, a: 1},
  "lemon": { h: 61, s: 100, l: 70, a: 1},
  "yellow-orange": { h: 32, s: 100, l: 62, a: 1},
  "burnt-orange": { h: 14, s: 100, l: 62, a: 1},
  "bittersweet": { h: 0, s: 100, l: 68, a: 1},
  "neon-pink": { h: 331, s: 100, l: 74, a: 1},
  "heliotrope": { h: 277, s: 100, l: 73, a: 1},
  "mauve": { h: 277, s: 100, l: 85, a: 1},
  "white-smoke": { h: 0, s: 0, l: 96, a: 1}
};

export const findClosestColor = (hslColor, colorList) => {
  let closestColor = null;
  let closestDifference = Number.MAX_VALUE;
  let closestHSL;

  for (const colorName in colorList) {
    const predefinedHSL = colorList[colorName];
    const hueDiff = Math.abs(hslColor.h - predefinedHSL.h);
    const saturationDiff = Math.abs(hslColor.s * 100 - predefinedHSL.s);
    const lightnessDiff = Math.abs(hslColor.l * 100 - predefinedHSL.l);
    const totalDifference = Math.sqrt(hueDiff ** 2 + saturationDiff ** 2 + lightnessDiff ** 2);

    if (totalDifference < closestDifference) {
      closestDifference = totalDifference;
      closestColor = colorName;
      closestHSL = predefinedHSL;
    }
  }
  return closestHSL;
};

export const oppositeColor = (hslColor) => {
  const { h, s, l } = hslColor;
  return {
    h: (h + 220) % 360,
    s: s,
    l: l
  };
};

export const darkenColor = (color, percentage) => {
  const { h, s, l } = color;
  const newLightness = Math.max(l - percentage, 0);
  return `hsl(${h}, ${s}%, ${newLightness}%)`;
};

export const lightenColor = (color, percentage) => {
  const { h, s, l } = color;
  const newLightness = Math.min(l + percentage, 100);
  return `hsl(${h}, ${s}%, ${newLightness}%)`;
};