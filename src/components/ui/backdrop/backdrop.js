import React from 'react'
import classes from './backdrops.css'

const backdrop = (props) => {
  return (
  props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
  )
}

export default backdrop