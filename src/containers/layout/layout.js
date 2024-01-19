import React, {Component} from 'react'
import classes from './layout.css'
import Toolbar from '../../components/navigation/toolbar/toolbar';
import SideDrawer from '../../components/navigation/sideDrawer/sideDrawer';

class Layout extends Component{
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({  showSideDrawer: false })
  }

  sideDrawerToggleHandler = prevState => {
    this.setState({  showSideDrawer: !prevState.showSideDrawer })
  }

  render(){
    return (
    <div>
      <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
      <SideDrawer closed={this.sideDrawerClosedHandler} opened={this.state.showSideDrawer}/>
      <main className={classes.content}>{this.props.children}</main>
    </div>
    )
  }
}

export default Layout;