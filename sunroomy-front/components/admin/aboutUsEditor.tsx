"use client";
import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

interface IAboutUsEditor {
  onChangeDesc: (desc: string) => void;
  desc: string;
}
export default function AboutUsEditor({ onChangeDesc, desc }: IAboutUsEditor) {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );
  return <ReactQuill theme="snow" value={desc} onChange={onChangeDesc} />;
}
