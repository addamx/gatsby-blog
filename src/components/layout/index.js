import React from 'react'
import { Link } from 'gatsby'
import Header from '../header'
import Sidebar from '../sidebar'
import BurgeMenu from '../burgeMenu'


import '../../styles/styles.scss'
import style from './layout.module.scss'
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpened: false
    }
    
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    this.setState(state => ({
      sidebarOpened: !state.sidebarOpened
    }))
  }

  render() {

    const { location, children, siteMetadata, categorys } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    const {sidebarOpened} = this.state;
    const sidebarOpenedStyle = sidebarOpened ? {
      transform: 'none'
    } : {};

    // if (location.pathname === rootPath) {

    return (
      <React.Fragment>
        <Header/>
        <div className={style.mainWrapper}>
          <main className={style.main}>{children}</main>
          <BurgeMenu toggleSidebar={this.toggleSidebar} />
          <aside className={style.aside} style={sidebarOpenedStyle}>
            <Sidebar location={location} categorys={categorys} siteMetadata={siteMetadata}/>
          </aside>
        </div>
      </React.Fragment>
    )
  }
}

export default Layout
