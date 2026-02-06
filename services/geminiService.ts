
import { GoogleGenAI } from "@google/genai";
import { fileToBase64 } from "../utils/imageUtils";

export const editImageWithGemini = async (imageFile: File, prompt: string): Promise<string> => {
  // Always create a new instance to ensure we use the latest injected API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const base64Data = await fileToBase64(imageFile);
    const mimeType = imageFile.type;

    if (!mimeType.startsWith('image/')) {
        throw new Error('Invalid file type. Please upload an image.');
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: `Apply the following edit to this image: ${prompt}. Return the modified image.`,
          },
        ],
      },
      // Note: responseModalities is intentionally omitted for gemini-2.5-flash-image
      // as it defaults to returning image data in the parts when prompted for image edits.
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64ImageBytes = part.inlineData.data;
          const imageMimeType = part.inlineData.mimeType || 'image/png';
          return `data:${imageMimeType};base64,${base64ImageBytes}`;
        }
      }
    }

    // If no image part was found, check for text response which might indicate refusal
    const textResponse = response.text;
    if (textResponse) {
        throw new Error(`AI response: ${textResponse}`);
    }

    throw new Error("The AI didn't return an image. Try a different prompt or check if the image is too complex.");

  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    
    // Check for "Requested entity was not found" which often means the API key is invalid/missing
    if (error?.message?.includes("Requested entity was not found")) {
        throw new Error("API configuration error. Please ensure your project is properly set up for Gemini 2.5 models.");
    }
    
    if (error?.message?.includes("INTERNAL")) {
        throw new Error("Gemini encountered an internal error. This can happen with very large images or complex prompts. Try again with a different photo or shorter prompt.");
    }

    throw new Error(error instanceof Error ? error.message : "Failed to communicate with the AI model.");
  }
};
