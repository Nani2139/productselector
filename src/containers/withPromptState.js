import React, { useState } from "react";

const withPromptState = (Component) => (props) => {
  const [query, setQuery] = useState("");
  return <Component {...props} query={query} setQuery={setQuery} />;
};

export default withPromptState;
