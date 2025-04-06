import React from "react";
import "./FindStore.css"

const FindStore = () => {
    return (
        <div className="container-fluid find-store-page" style={{ backgroundColor: "#f5f8e7" }}>
            <div className="container">
                <div className="text-center py-5"  >
                    <h6 className="text-uppercase mb-3">Find a Store</h6>
                    <div className="input-group mb-3 w-50 mx-auto">
                        <input type="text" className="form-control search-store-input" placeholder="Enter a city, postal code, address" />
                        <button className="btn btn-outline-secondary search-store-input-button" type="button">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                    <h5 className="mb-4">
                        Find the Van Cleef & Arpels boutique closest to you.
                    </h5>
                    <a href="#" className="text-muted">
                        See all shops
                    </a>
                </div>

                {/* Additional Text Section */}
                <div className="text-center my-4">
                    <p>
                        The Maison's advisors are at your service. We invite you to prepare
                        your visit and make an appointment in one of our boutiques.
                    </p>
                    <button className="btn btn-outline-dark">MAKE AN APPOINTMENT</button>
                </div>

                {/* Store Image Section */}
                <div className="text-center">
                    <img
                        src="https://via.placeholder.com/1200x400"
                        alt="Van Cleef & Arpels Store"
                        className="img-fluid rounded"
                    />
                </div>
            </div>
        </div>
    );
};

export default FindStore;
