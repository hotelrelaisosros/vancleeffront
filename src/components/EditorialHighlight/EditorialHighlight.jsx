import React from "react";
import "./EditorialHighlight.css"
const EditorialHighlight = () => {
    return (
        <section className="container-fluid m-0 mt-5 p-0 editorial-highlight-section" height={'700px'} style={{ backgroundColor: "#FBF5F5", color: "#111111" }}>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-center text-center">
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: '375px', height: '700px' }}>
                            <blockquote className="vca-ec-blockquote" aria-atomic="true">
                                <div className="vca-ec-static-text">
                                    <p>Every stone has a soul of its own.</p>
                                </div>
                                <span className="vca-ec-author">Claude Arpels</span>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditorialHighlight;
