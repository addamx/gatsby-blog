import React from 'react';
import {Link} from 'gatsby'

import style from './categoryWidget.module.scss'

export default ({categorys}) => (
  <ul className={style.menu}>
    {
      categorys.map(el => (
        <li className={style.item} key={el.slug}>
          <Link className={style.itemLink} to={el.slug}>{el.name}</Link>
        </li>
      ))
    }
  </ul>
);