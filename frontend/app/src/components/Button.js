import React from 'react';
import axios from 'axios';
import './Button.css';
import { Link } from 'react-router-dom';

axios.defaults.withCredentials = true;

const STYLES = ['btn--primary', 'btn--outline']

const SIZES = ['btn--medium', 'btn--large']

export const Button = ({ children, type, onClick, buttonStyle, buttonSize }) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <Link className='btn-mobile'>
            <button
                className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            >
                {/* this renders whatever i put in the button */}
                {children}
            </button>
        </Link>
    )
}

export const ButtonAdd=({children,type,onClick,buttonStyle,buttonSize})=>{
    const checkButtonStyle=STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    const checkButtonSize=SIZES.includes(buttonSize)?buttonSize:SIZES[0];

    return(
        <Link to='/addBug' className='btn-mobile'>
            <button
            className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            >
            {/* this renders whatever i put in the button */}
                {children}
            </button>
        </Link>
    )
}

export const ButtonEdit=({children,type,onClick,buttonStyle,buttonSize})=>{
    const checkButtonStyle=STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    const checkButtonSize=SIZES.includes(buttonSize)?buttonSize:SIZES[0];

    return(
        <Link to='/editBug' className='btn-mobile'>
            <button
            className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            >
            {/* this renders whatever i put in the button */}
                {children}
            </button>
        </Link>
    )
}

export const SignupButton = ({ children, type, onClick, buttonStyle, buttonSize }) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <Link className='btn-mobile' to='/sign-up'>
            <button
                className={`${checkButtonStyle} ${checkButtonSize}`}
            >
                {/* this renders whatever i put in the button */}
                {children}
            </button>
        </Link>
    )
}

export const LogoutButton = ({ children, type, onClick, buttonStyle, buttonSize }) => {
    const [modalShow, setModalShow] = React.useState(false);

    const checkButtonStyle = STYLES[1];

    const checkButtonSize = SIZES[0];

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8080/logout", { withCredentials: true })
                .then((response) => {
                    //console.log(response);
                    localStorage.removeItem('username');
                    window.location.reload();
                });
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <Link className='btn-mobile' to="/">
            <button
                onClick={() => handleLogout()}
                className={`${checkButtonStyle} ${checkButtonSize}`}
            >
                {/* this renders whatever i put in the button */}
                {children}
            </button>
        </Link>
    )
}