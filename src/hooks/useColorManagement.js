import {useCallback, useEffect} from 'react';
import ColorThief from 'colorthief';
import tinycolor from 'tinycolor2';
import {findClosestColor, oppositeColor, darkenColor, predefinedColors, lightenColor} from '../utils/colorUtils';

export const useColorManagement = (imageRef) => {
  // Memoize the color scale percentages to avoid recalculation
  const colorScales = {
    lighter: [
      { level: 50, percent: 40 },
      { level: 100, percent: 35 },
      { level: 200, percent: 25 },
      { level: 300, percent: 15 },
      { level: 400, percent: 5 }
    ],
    darker: [
      { level: 600, percent: 5 },
      { level: 700, percent: 15 },
      { level: 800, percent: 25 },
      { level: 900, percent: 35 },
      { level: 950, percent: 40 }
    ]
  };

  const updateColors = useCallback((dominantColor) => {
    const setColorVariables = (colorType, color) => {
      const root = document.documentElement;

      // Set all variables in a batch
      const setVariables = () => {
        // Lighter variants
        colorScales.lighter.forEach(({ level, percent }) => {
          root.style.setProperty(
            `--clr-${colorType}-${level}`,
            lightenColor(color, percent)
          );
        });

        // Base color
        root.style.setProperty(
          `--clr-${colorType}-500`,
          `hsl(${color.h}, ${color.s}%, ${color.l}%)`
        );

        // Darker variants
        colorScales.darker.forEach(({ level, percent }) => {
          root.style.setProperty(
            `--clr-${colorType}-${level}`,
            darkenColor(color, percent)
          );
        });
      };

      requestAnimationFrame(setVariables);
    };

    const dominantColorVariable = `rgb(${dominantColor.join(',')})`;
    const convertedColor = tinycolor(dominantColorVariable).toHsl();

    const closestPrimaryColor = findClosestColor(convertedColor, predefinedColors);
    const secondaryColor = oppositeColor(closestPrimaryColor);

    setColorVariables('primary', closestPrimaryColor);
    setColorVariables('secondary', secondaryColor);
  }, []);

  useEffect(() => {
    if (!imageRef.current) return;

    const colorThief = new ColorThief();
    const img = imageRef.current;

    const handleLoad = () => {
      try {
        const dominantColor = colorThief.getColor(img);
        updateColors(dominantColor);
      } catch (error) {
        console.error('Error extracting color:', error);
      }
    };

    if (img.complete) {
      handleLoad();
    } else {
      img.addEventListener('load', handleLoad);
      return () => img.removeEventListener('load', handleLoad);
    }
  }, [imageRef, updateColors]);
};