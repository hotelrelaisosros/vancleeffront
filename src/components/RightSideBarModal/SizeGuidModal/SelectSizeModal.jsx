import React, { useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./SizeGuidModal.css";

const SelectSizeModal = ({ show, setShow, size, setSize, ringSizeRing2 }) => {
  return (
    <div
      className="select-size-popup"
      style={{ display: show === "select_size" ? "block" : "none" }}
    >
      <div className="select-size-popup-title mb-5">
        <h3>Size</h3>
        <button className="close-btn-select-size" onClick={() => setShow("")}>
          X
        </button>
      </div>
      <div className="select-size-popup-description">
        <ul style={{ listStyle: "none" }} className="row">
          {ringSizeRing2.map((item, index) => (
            <li
              className={
                item === size ? "col-2 size-box active" : "col-2 size-box"
              }
              onClick={() => {
                setSize(item); // Set the selected size
                setShow(""); // Close the modal
              }}
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectSizeModal;
