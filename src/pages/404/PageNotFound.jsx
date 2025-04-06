import React from "react";
import "./PageNotFound.css"
import { useNavigate } from 'react-router-dom';
const PageNotFound = () => {
    
    const navigate = useNavigate();
    const handleGoToHome = () => {
        navigate(`/`);
    }
    
    const handleGoToContact = () => {
        navigate(`/contact-us`);
    }

    return (
        <div className="container page-not-found">
            <div className="error-container">
                <h1 className="display-1">Oops!</h1>
                <h2 className="display-4">404 Not Found</h2>
                <div className="error-details mb-4">
                    Sorry, an error has occurred. The requested page was not found!
                </div>
                <div className="col-6 full-width-btns form-group mb-3">
                    <button className="button1" width={'240px'} onClick={handleGoToHome}> Take Me Home </button>
                    <button className="button2" onClick={handleGoToContact}> Contact Support </button>
                </div>
            </div>
        </div>
    )
};

export default PageNotFound;
