import React from 'react'
import Logo from '../../logo/logo'
import NavigationItems from '../navigationItems/navigationItems'
import classes from './sideDrawer.css'
import Backdrop from '../../ui/backdrop/backdrop'

const sidebar = (props) => {
  let attachedClass = [classes.SideDrawer, classes.Close];
  if(props.opened){
    attachedClass = [classes.SideDrawer, classes.Open];
  }
  return (
    <>
    <Backdrop show={props.opened} clicked={props.closed}/>
     <div className={attachedClass.join(' ')}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
    </>
   
  )
}

export default sidebar