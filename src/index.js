import React from "react";
import { render } from "react-dom"; // named import
import App from "./App";

// HTML vs JSX
// 1. class vs className
// 2. for vs htmlFor (useful for tying labels to inputs)
// 3. string styles vs object styles - NOTE: IS OPTIONAL
// 4. must specify unit of measurement vs px is default
// 5. kebab-cased vs camelCased
render(<App />, document.getElementById("root"));
