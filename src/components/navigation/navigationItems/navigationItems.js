import React from 'react'
import classes from './navigationItems.css'
import NavigationItem from './navigationItem/navigationItem'

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/" >Checkout</NavigationItem>
    </ul>
  )
}

export default navigationItems