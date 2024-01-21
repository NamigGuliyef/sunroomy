"use client";

import ReactDOM from "react-dom";

export function PreloadResources() {
  ReactDOM.preload("/flags.svg", {
    as: "image",
  });

  return null;
}
