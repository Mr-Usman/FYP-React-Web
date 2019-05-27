import React, { Component } from "react";
import FileSection from "./FileSection/FileSection";
import NavbarPage from "./Navbar/Navbar";
import styles from "./Main.module.css";

const Main = () => {
  return (
    <div>
      <NavbarPage />
      <div className={styles["FileContainer"]}>
        <FileSection />
      </div>
    </div>
  );
};

export default Main;
