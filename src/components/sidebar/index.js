import React from 'react';
import {Link} from 'gatsby'
import CategoryWidget from './categoryWidget'

import style from './sidebar.module.scss'

class Sidebar extends React.Component {

    render() {
        const { location, siteMetadata, categorys } = this.props;
        return (
            <React.Fragment>
                <div className={style.avatar}>
                    <Link to="/"><h1 className={style.title}>{siteMetadata.title}</h1></Link>
                    <p className={style.description}>{siteMetadata.description}</p>
                    {
                        location.pathname === '/search' ||
                        (
                            <Link to="/search"><span className={style.search}>Search</span></Link>
                        )
                    }
                </div>
                <CategoryWidget categorys={categorys} />
                
            </React.Fragment>
        )
    }
}

export default Sidebar;