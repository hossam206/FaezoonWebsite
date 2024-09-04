// src/translateService.js
import axios from "axios";

export const translateText = async (text, targetLanguage) => {
  try {
    const response = await axios.get(
      "https://translate.googleapis.com/translate_a/single",
      {
        params: {
          client: "gtx",
          sl: "ar", // Source language (English)
          tl: targetLanguage, // Target language
          dt: "t",
          q: text,
        },
      }
    );

    // The API returns an array of arrays; extract the translated text.
    const translatedText = response.data[0][0][0];
    return translatedText;
  } catch (error) {
    // console.error("Error translating text:", error);
   
    return "";
  }
};

// format way to show
export const formatDataForDisplay = (data, type) => {
  // Format each object with a label: value style and separate with new lines
  if (data.length === 0) {
    return "No data today";
  }
  return data
    .map((item) => {
      // Extract values from each object
      const values = Object.values(item);
      // Join values with a space or other delimiter if needed
        return values.join(" :::: ");
    })
    .filter((line) => line.trim() !== '') // Remove any empty lines
    .join('\n '); // Separate different objects with new lines
};