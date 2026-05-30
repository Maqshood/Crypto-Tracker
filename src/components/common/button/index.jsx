import React from 'react'
import "./styles.css";

function Button({text, click, outlined}) {
  return (
    <button className={outlined?"outlined-btn":'btn'} onClick={click}>{text}</button>
  )
}

export default Button;