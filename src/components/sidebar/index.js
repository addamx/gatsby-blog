import React from 'react';
import {Link} from 'gatsby'
import CategoryWidget from './categoryWidget'

import style from './sidebar.module.scss'

class Sidebar extends React.Component {

    render() {
        const { siteMetadata, categorys } = this.props;
        return (
            <React.Fragment>
                <div className={style.avatar}>
                    <Link to="/home"><h1 className={style.title}>{siteMetadata.title}</h1></Link>
                    <p className={style.description}>{siteMetadata.description}</p>
                </div>
                <CategoryWidget categorys={categorys} siteMetadata={siteMetadata} />
                
            </React.Fragment>
        )
    }
}

export default Sidebar;