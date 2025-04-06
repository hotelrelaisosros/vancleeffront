import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
    
    return (
        <>
            <div style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: '#ECF2EA', textAlign: 'center' }}>
                <h1>Privacy Policy</h1>
            </div>
            <div className="container privacy-policy-page">
                <div className="row">
                    <div className="col-12">
                        <div className="card" style={{ margin: '50px 0px' }}>
                            <div className="card-body">
                                <h4>1. Information Collection</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet consectetur sem, sed fringilla urna aliquet at.</p>
                                
                                <h4>2. How We Use Your Information</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas luctus lectus vitae urna auctor, ac fringilla felis feugiat.</p>
                                
                                <h4>3. Data Security</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Quisque tincidunt, felis a auctor viverra.</p>
                                
                                <h4>4. Cookies</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a mi eu nulla feugiat varius.</p>
                                
                                <h4>5. Contact Information</h4>
                                <p>If you have any questions about our Privacy Policy, please contact us at support@example.com.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default PrivacyPolicy;
