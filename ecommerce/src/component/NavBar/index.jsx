import React from 'react'
import style from './index.module.css'
import { NavBar } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import PopoverMenu from  '../PopoverMenu'
import { MoreOutline } from 'antd-mobile-icons'

export default function Nav(props) {
    const navigate = useNavigate()
    return (
        <div className={style.nav}>
            <NavBar onBack={() => navigate(-1)} right={<PopoverMenu>
                <MoreOutline style={{fontSize:'.4rem'}} />
            </PopoverMenu>} {...props} />
        </div>
    )
}
