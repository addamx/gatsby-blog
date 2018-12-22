import React from 'react'
import style from './burge.module.scss'

export default (props) => (
    <div className={style.burgerMenu} onClick={() => props.toggleSidebar()}>
        <span className={style.burgerBars}></span>
        <span className={style.burgerBars}></span>
        <span className={style.burgerBars}></span>
    </div>
)