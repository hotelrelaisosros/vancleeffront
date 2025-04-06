import React, { useState, useEffect } from 'react'
import { AuthMiddleware } from '../store/auth/authMiddleware';
import { useDispatch, useSelector } from 'react-redux';
import { CircleLoader } from 'react-spinners';
import SidebarMenu from "./SidebarMenu";
import CallRightSideBar from "./CallRightSideBar";
import { isTokenExpired } from "../utils/isTokenExpired";
// import './style.css';
import './Navbar.css';
import SearchDropdown from './SearchBar';
import { useNavigate } from 'react-router-dom';

const Navbar = ({styleName}) => {
    const [isCallOpen, setIsCallOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [emailphone, setEmailphone] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [activeTab, setActiveTab] = useState('login');
    const [activeSubTab, setActiveSubTab] = useState('forgotPassword');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [civility, setCivility] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [notification, setNotification] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSearchDropdown = () => {
        setIsSearchOpen(!isSearchOpen);
    };
    
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.common);

    const token = localStorage.getItem('token');
    const isExpired = isTokenExpired(token);
    
    const validateForm = () => {
        const newErrors = {};

        if (!civility) newErrors.civility = 'Civility is required';
        if (!firstName) newErrors.firstName = 'First name is required';
        if (!lastName) newErrors.lastName = 'Last name is required';
        if (!registerEmail) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(registerEmail)) {
            newErrors.email = 'Email is invalid';
        }
        if (!registerPassword) {
            newErrors.password = 'Password is required';
        } else if (registerPassword.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(registerPassword)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one number and one special character';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateResetPasswordForm = () => {
        const newErrors = {};

        if (!resetToken) newErrors.resetToken = 'Token is required';
        if (!emailphone) newErrors.emailphone = 'Email address is required';
        if (!password) newErrors.password = 'Password is required';
        if (!cpassword) newErrors.cpassword = 'Confirm password is required';
        
        if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one number and one special character';
        } else if (password != cpassword) {
            newErrors.cpassword = 'Passsword doesnt match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate(`/`);
    };

    const showLogin = () => {
        setActiveTab('login');
    };

    const showForgotPass = () => {
        setActiveTab('forgotPassword');
    };

    const showRegister = () => {
        setActiveTab('register');
    };

    useEffect(() => {
        // Set initial state
        showLogin();
    }, []);

    const handleLogin = async () => {
        try {
            const formData = {
                emailphone,
                password
            };
            const response = dispatch(AuthMiddleware.UserLogin(formData));

            if (response?.data?.token) {
                closePopup('profile');
            }
        } catch (error) {
            console.log("Login error:", error);
        }
    };

    const handleForgotPassword = async () => {
        try {
            const formData = {
                emailphone
            };
            const response = await dispatch(AuthMiddleware.UserForgotPassword(formData));
            console.log("response",response);
            if (response?.token) {
                alert(response.Message);
                setActiveSubTab('resetpassword');
            }
        } catch (error) {
            console.log("Login error:", error);
        }
    };

    const handleResendToken = async () => {
        try {
            const formData = {
                emailphone:emailphone,
                send_code_only:1
            };
            const response = await dispatch(AuthMiddleware.UserResendToken(formData));
            console.log("response",response);
            if (response?.token) {
                alert(response.Message);
            }
        } catch (error) {
            console.log("Login error:", error);
        }
    };

    const handleResetPassword = async () => {
        if(validateResetPasswordForm()){
            try {
                const formData = {
                    token: resetToken,
                    password:password,
                    c_password:cpassword,
                    emailphone:emailphone
                };
                const response = dispatch(AuthMiddleware.UserResetPassword(formData));
                console.log("response",response);
                if (response?.data?.status) {
                    alert(response?.data?.Message);
                    setActiveTab('login');
                    setActiveSubTab('forgotPassword');
                    closePopup('profile');
                } else {
                    alert(response?.data?.Message);
                }
            } catch (error) {
                console.log("Login error:", error);
            }
        }
    };

    const handleRegister = async () => {
        if (validateForm()) {
            try {
                const formData = {
                    civility,
                    first_name: firstName,
                    last_name: lastName,
                    country,
                    emailphone: registerEmail,
                    password: registerPassword,
                    notification
                };
                
                dispatch(AuthMiddleware.UserRegister(formData, () => {
                    setShowSuccessAlert(true);
                    showLogin();
                    // Reset form
                    setCivility('');
                    setFirstName('');
                    setLastName('');
                    setCountry('');
                    setRegisterEmail('');
                    setRegisterPassword('');
                    setNotification(false);
                    setTimeout(() => {
                        setShowSuccessAlert(false);
                    }, 3000);
                }));

            } catch (error) {
                console.log("Register error:", error);
            }
        }
    };

    // Function to handle opening popups
    const openPopup = (type) => {
        console.log(type)
        if (type === 'call') {
            setIsCallOpen(true);
        } else if (type === 'profile') {
            setIsProfileOpen(true);
        }
        document.body.style.overflow = 'hidden';
    }

    // Function to handle closing popups 
    const closePopup = (type) => {
        if (type === 'call') {
            setIsCallOpen(false);
        } else if (type === 'profile') {
            setIsProfileOpen(false);
        }
        document.body.style.overflow = 'auto';
    }

    // Handle scroll lock when loading changes
    useEffect(() => {
        if (loading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [loading]);

    return (
        <div className="relative" >
            {loading && (
                <div style={{position: 'fixed', zIndex: 999999, backgroundColor: 'rgba(0, 0, 0, 0.8)', width: '100%', height: '100%'}}>
                    <CircleLoader
                        color="#ffffffad"
                        loading={true}
                        size={120}
                        style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            )}

            <section className={`navbar2 ${styleName}`}>
                <div className="burger-menu" id="burgerMenu">
                    <span className="brgr"></span>
                </div>
                <div className="search-wrap">
                    <span className="nav-search" onClick={toggleSearchDropdown}></span>
                    <span className="nav-searchtxt" onClick={toggleSearchDropdown}>Search</span>
                    <span className="nav-cyr"><a href="/rings">Customize your ring</a></span>
                </div>

                <SearchDropdown isSearchOpen={isSearchOpen} toggleSearchDropdown={toggleSearchDropdown} />

                <a href="/"><div className="logo bg-red-500 ml-5"></div></a>

                <div className="icons">
                    <span className="icon phone-ico" onClick={() => openPopup('call')}></span>
                    {token && !isExpired ? (
                        <span className="icon user-ico" onClick={handleLogout}></span>
                    ) : (
                        <span className="icon user-ico" onClick={() => openPopup('profile')}></span>
                    )}
                    <span className="icon cart-ico">
                        <div className="cart-hoverbox">
                            <span className="cart-empty">Your shopping cart is currently empty.</span>
                            <hr />
                            <span className="recentlyviewed">RECENTLY VIEWED</span>
                        </div>
                    </span>
                </div>
            </section>

            <SidebarMenu/>

            {isCallOpen && (<CallRightSideBar closePopup={closePopup} />)}

            {isProfileOpen && (!token || isExpired) && (
                <>
                    <div className="overlay-profile" onClick={() => closePopup('profile')}></div>
                    <div className="popup-profile" style={{ display: 'block' }}>
                        <button className="close-btn-profile" style={{ position: 'absolute', top: '10px', right: '10px', width: '60px', height: '60px', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => closePopup('profile')}>X</button>
                        <div className="popup-content-profile">
                            {showSuccessAlert && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                                    <strong className="font-bold">Success! </strong>
                                    <span className="block sm:inline">Your account has been created. Please login.</span>
                                </div>
                            )}
                            <div className="heading">
                                <h3 id="headingpopup">{activeTab === 'login' ? 'Log in' : (activeTab === 'register'? 'Create Account': 'forgot your password?')}</h3>
                            </div>

                            {activeTab != 'forgotPassword' && (
                            <div className="tabs">
                                <button
                                    className={activeTab === 'login' ? 'active' : ''}
                                    onClick={showLogin}
                                >
                                    LOG IN
                                </button>
                                <button
                                    className={activeTab === 'register' ? 'active' : ''}
                                    onClick={showRegister}
                                >
                                    Create your account
                                </button>
                            </div>)}

                            {activeTab === 'login' && (
                                <div>
                                    <div className="fields">
                                        <div className="input-pro">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={emailphone}
                                                onChange={(e) => setEmailphone(e.target.value)}
                                                placeholder="Your email address"
                                            />
                                        </div>
                                        <div className="input-pro">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Your password"
                                            />
                                        </div>
                                        <button onClick={handleLogin}>Login</button>
                                        <span className="fpass" onClick={showForgotPass}>Forgot your password?</span>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'forgotPassword' && (
                                <div>
                                    {activeSubTab === 'forgotPassword' && (
                                    <div className="fields">
                                        <div className="input-pro">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={emailphone}
                                                onChange={(e) => setEmailphone(e.target.value)}
                                                placeholder="Your email address"
                                            />
                                        </div>
                                        <button onClick={handleForgotPassword}>i want to receive the reset link</button>
                                        <span className="fpass" onClick={showLogin}>Login</span>
                                    </div>
                                    )}
                                    {activeSubTab === 'resetpassword' && (
                                    <div className="fields">
                                        <div className="input-pro">
                                            <label htmlFor="ResetToken">Token</label>
                                            <input
                                                type="text"
                                                id="resetToken"
                                                value={resetToken}
                                                onChange={(e) => setResetToken(e.target.value)}
                                                placeholder="Token"
                                            />
                                            {errors.resetToken && <span className="error" style={{color: 'red', fontSize: '12px'}}>{errors.resetToken}</span>}
                                        </div>
                                        <div className="input-pro">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={emailphone}
                                                onChange={(e) => setEmailphone(e.target.value)}
                                                placeholder="Your email address"
                                            />
                                            {errors.emailphone && <span className="error" style={{color: 'red', fontSize: '12px'}}>{errors.emailphone}</span>}
                                        </div>
                                        <div className="input-pro">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Your password"
                                            />
                                            {errors.password && <span className="error" style={{color: 'red', fontSize: '12px'}}>{errors.password}</span>}
                                        </div>
                                        <div className="input-pro">
                                            <label htmlFor="cpassword">Confirm Password</label>
                                            <input
                                                type="password"
                                                id="cpassword"
                                                value={cpassword}
                                                onChange={(e) => setCPassword(e.target.value)}
                                                placeholder="Conform Your password"
                                            />
                                            {errors.cpassword && <span className="error" style={{color: 'red', fontSize: '12px'}}>{errors.cpassword}</span>}
                                        </div>
                                        <button onClick={handleResetPassword}>Reset password</button>
                                        <span className="fpass" onClick={handleResendToken}>Resend Token</span>
                                        <span className="fpass" onClick={showLogin}>Login</span>
                                    </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'register' && (
                                <div >
                                    <div className="fields">
                                        <div style={{ marginBottom: '50px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                            <label style={{ display: 'block', marginBottom: '15px', color: '#222', textAlign: 'left' }}>Civility *</label>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                                                    <input 
                                                        type="radio"
                                                        id="mr" 
                                                        name="civility" 
                                                        value="mr"
                                                        checked={civility === 'mr'}
                                                        onChange={(e) => setCivility(e.target.value)}
                                                        style={{ 
                                                            marginRight: '8px',
                                                            width: '16px',
                                                            height: '16px',
                                                            cursor: 'pointer',
                                                            position: 'static',
                                                            opacity: '1',
                                                            appearance: 'auto',
                                                            WebkitAppearance: 'radio',
                                                            margin: '0 8px 0 0'
                                                        }}
                                                    />
                                                    <label htmlFor="mr" style={{ cursor: 'pointer', margin: 0 }}>Mr.</label>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <input 
                                                        type="radio" 
                                                        id="mrs" 
                                                        name="civility" 
                                                        value="mrs" 
                                                        checked={civility === 'mrs'}
                                                        onChange={(e) => setCivility(e.target.value)}
                                                        style={{ 
                                                            marginRight: '8px',
                                                            width: '16px',
                                                            height: '16px',
                                                            cursor: 'pointer',
                                                            position: 'static',
                                                            opacity: '1',
                                                            appearance: 'auto',
                                                            WebkitAppearance: 'radio',
                                                            margin: '0 8px 0 0'
                                                        }}
                                                    />
                                                    <label htmlFor="mrs" style={{ cursor: 'pointer', margin: 0 }}>Mrs.</label>
                                                </div>
                                            </div>
                                            {errors.civility && <span className="error" style={{color: 'red', fontSize: '12px'}}>{errors.civility}</span>}
                                        </div>

                                        <div className="input-pro">
                                            <label htmlFor="firstname">First name *</label>
                                            <input 
                                                type="text" 
                                                id="firstname" 
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                placeholder="John" 
                                            />
                                            {errors.firstName && <span className="error" style={{color: 'red', fontSize: '12px'}}>{errors.firstName}</span>}
                                        </div>
                                        <div className="input-pro">
                                            <label htmlFor="name">Last name *</label>
                                            <input 
                                                type="text" 
                                                id="name" 
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                placeholder="Doe" 
                                            />
                                            {errors.lastName && <span className="error" style={{color: 'red', fontSize: '12px'}}>{errors.lastName}</span>}
                                        </div>
                                        <div className="input-pro">
                                            <label htmlFor="country">Country / Place of residence</label>
                                            <select 
                                                style={{ borderRadius: 0, padding: 4, borderWidth: 0, borderBottomWidth: 1, borderBottomColor: '#e0e0e0', borderBottomStyle: 'solid' }} 
                                                id="country" 
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                                className="form-control"
                                            >
                                                <option value="">Select a country</option>
                                                <option value="Afghanistan">Afghanistan</option>
                                                <option value="Zimbabwe">Zimbabwe</option>
                                            </select>
                                        </div>
                                        <div className="input-pro">
                                            <label htmlFor="register-email">Email *</label>
                                            <input 
                                                type="email" 
                                                id="register-email" 
                                                value={registerEmail}
                                                onChange={(e) => setRegisterEmail(e.target.value)}
                                                placeholder="Your email address" 
                                            />
                                            {errors.email && <span className="error" style={{color: 'red', fontSize: '12px'}}>{errors.email}</span>}
                                        </div>
                                        <div className="input-pro last">
                                            <label htmlFor="register-password">Password *</label>
                                            <input 
                                                type="password" 
                                                id="register-password" 
                                                value={registerPassword}
                                                onChange={(e) => setRegisterPassword(e.target.value)}
                                                placeholder="Your password" 
                                            />
                                            {errors.password && <span className="error" style={{color: 'red', fontSize: '12px'}}>{errors.password}</span>}
                                        </div>
                                        <input
                                            type="checkbox"
                                            id="notification"
                                            checked={notification}
                                            onChange={(e) => setNotification(e.target.checked)}
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                margin: 0,
                                                padding: 0,
                                                opacity: 1,
                                                appearance: 'auto',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <label
                                            htmlFor="notification"
                                            style={{
                                                textAlign: 'left',
                                                fontSize: '13px',
                                                lineHeight: '1.4'
                                            }}
                                        >
                                            I would like to receive information about Van Cleef & Arpels creations and services. The Maison may contact you by email, text message, telephone, mail or via online advertising campaigns. You can request to unsubscribe at any time. For more information regarding the policy on the use of your personal data, we invite you to consult the <a href="http://test.com">Privacy Policy.</a>
                                        </label>
                                        <button onClick={handleRegister}>Create your account</button>
                                    </div>
                                </div>
                            )}

                            <div className="question">
                                <h3>A question?</h3>
                                <p className="question-des">Our advisors are delighted to assist you</p>
                                <a href="#" className="contact">contact us</a>
                                <a href="#" className="appointment">make an appointment</a>
                                <a href="#" className="contact-number">+33 1 70 70 02 63</a>
                                <span className="date-time1">Monday to Friday: 9:00 a.m. to 7:00 p.m.</span>
                                <span className="date-time2">Saturday: 9:00 a.m. to 5:00 p.m.</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Navbar