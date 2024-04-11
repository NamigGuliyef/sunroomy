"use client";
import { SpeedInsights } from "@vercel/speed-insights/next";
import React from "react";

const Insights = () => {
  return (
    <SpeedInsights
      beforeSend={(data) => {
        if (data.url.includes("/admin")) {
          return null; // this will ignore the event
        }
        return data; // this will send the event as is
      }}
    />
  );
};

export default Insights;
