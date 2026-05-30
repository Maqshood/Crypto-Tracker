import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import "./styles.css";
function Loader() {
  return (
    <div className='loader-container'> <CircularProgress /></div>
  )
}

export default Loader;