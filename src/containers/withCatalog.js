import React from "react";
import { PRODUCT_CATALOG } from "../data/catalog";

const withCatalog = (Component) => (props) => {
  return <Component {...props} catalog={PRODUCT_CATALOG} />;
};

export default withCatalog;
