import * as React from "react";
import { useState } from "react";
import withCatalog from "../src/containers/withCatalog";
import withPromptState from "../src/containers/withPromptState";
import withRecommendations from "../src/containers/withRecommendations";
import flowRight from "../src/hoc";
import MainScreen from "../src/screens/MainScreen";
import WelcomeScreen from "../src/screens/WelcomeScreen";

const GEMINI_API_KEY = "AIzaSyADY1FMtiz8q9R9jfvzNEHEuaNIMbCzhR4";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

const MainScreenContainer = flowRight(
  withCatalog,
  withPromptState,
  withRecommendations
)((props) => {
  const {
    query,
    setQuery,
    catalog,
    setRecommendations,
    setIsLoading,
    setError,
    setSearched,
    isLoading,
  } = props;

  const onPromptSubmit = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError("");
    setRecommendations([]);
    setSearched(false);
    try {
      const prompt = `You are an expert product advisor. Your task is to recommend products from the given catalog based on a user's request.\nAnalyze the user's request and the product catalog provided below.\nSelect the top 1 to 3 products that best match the user's needs. If there are no perfect matches, you MUST still recommend the 1 to 3 closest products from the catalog and explain why you chose them, even if they are not related.\nFor each recommendation, provide a brief, one-sentence reason explaining why it's a good or closest match.\n\nUSER REQUEST: "${query}"\n\nPRODUCT CATALOG:\n${JSON.stringify(
        catalog,
        null,
        2
      )}\n\nYour response MUST be ONLY a valid JSON array of objects, with no other text, explanation, or markdown.\nThe structure of each object in the array should be:\n{\n  "product": { ...the full original product object from the catalog... },\n  "reason": "A brief, one-sentence explanation."\n}\nDo not include the \`\`\`json markdown wrapper.`;

      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      });
      const data = await response.json();
      let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      text = text.replace(/```json|```/g, "").trim();
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch (e) {
        throw new Error("Failed to parse AI response.");
      }
      setRecommendations(
        parsed.map((item) => ({ ...item.product, _reason: item.reason }))
      );
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      setSearched(true);
    }
  };

  return <MainScreen {...props} onPromptSubmit={onPromptSubmit} />;
});

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  if (showWelcome) {
    return <WelcomeScreen onGetStarted={() => setShowWelcome(false)} />;
  }
  return <MainScreenContainer />;
}
