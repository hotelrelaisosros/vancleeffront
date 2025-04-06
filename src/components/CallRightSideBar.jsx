import React from 'react';

const CallRightSideBar = ({closePopup}) => {



    return (
        <>
            <div className="overlay-call" onClick={() => closePopup("call")}></div>
            <div className="popup-call" style={{ display: 'block' }}>
                <button className="close-btn-call" onClick={() => closePopup("call")}><i className="fa fa-times" aria-hidden="true"></i></button>
                <div className="popup-content-call">
                    <h3>A question?</h3>
                    <p>Our advisors are available to answer your requests from Monday to Friday from 9 a.m. to 7 p.m. and Saturday from 9 a.m. to 5 p.m.</p>
                    <span className="callus">CALL US: +33 1 70 70 02 63</span>
                </div>
            </div>
        </>
    )
}

export default CallRightSideBar