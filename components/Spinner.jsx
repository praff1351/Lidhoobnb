"use client";
import ClipLoader from "react-spinners/ClipLoader";
import React from "react";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = () => {
  return (
    <ClipLoader
      color="#e2e8f0"
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default Spinner;
