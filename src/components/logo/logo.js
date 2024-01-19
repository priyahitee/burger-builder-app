import React from 'react'
import logoImage from '../../assets/images/burger-logo.png'
import classes from './logo.css'

const logo = (props) => {
  return (
    <div className={classes.Logo}><img src={logoImage} alt='logo'/></div>
  )
}

export default logo;