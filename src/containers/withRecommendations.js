import React, { useState } from "react";

const withRecommendations = (Component) => (props) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  return (
    <Component
      {...props}
      recommendations={recommendations}
      setRecommendations={setRecommendations}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      error={error}
      setError={setError}
      searched={searched}
      setSearched={setSearched}
    />
  );
};

export default withRecommendations;
