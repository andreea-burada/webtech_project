import React from 'react';
import './Button.css';
import {Link} from 'react-router-dom';
import LoginModal from "./LoginModal";

const STYLES=['btn--primary','btn--outline']

const SIZES=['btn--medium','btn--large']

export const Button=({children,type,onClick,buttonStyle,buttonSize})=>{
    const checkButtonStyle=STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    const checkButtonSize=SIZES.includes(buttonSize)?buttonSize:SIZES[0];

    return(
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

export const SignupButton=({children,type,onClick,buttonStyle,buttonSize})=>{
    const checkButtonStyle=STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    const checkButtonSize=SIZES.includes(buttonSize)?buttonSize:SIZES[0];

    return(
        <Link className='btn-mobile' to='/sign-up'>
            <button
            className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            >
            {/* this renders whatever i put in the button */}
                {children}
            </button>
        </Link>
    )
}

export const LoginModalButton=({children,type,onClick,buttonStyle,buttonSize})=>{
    const [modalShow, setModalShow] = React.useState(false);
    
    const checkButtonStyle=STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    const checkButtonSize=SIZES.includes(buttonSize)?buttonSize:SIZES[0];

    return(
        <Link className='btn-mobile'>
            <button 
            variant="primary"
            onClick={() => setModalShow(true)}
            className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            >
            {/* this renders whatever i put in the button */}
                {children}
            </button>
            <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
        </Link>
    )
}