import React, { useEffect, useState } from 'react'
import { TabBar } from 'antd-mobile'
import { tabs } from './data'
import style from './index.module.css'
import { useNavigate, useLocation } from 'react-router-dom'

export default function TabBars() {
    const navigate = useNavigate()
    const location = useLocation()
    const [key, setKey] = useState() //代表当前选中的tab
    const onTabChange = key => {
        navigate(key)
    }
    //监听location的变化
    useEffect(() => {
        const { pathname } = location
        setKey(pathname) //设置当前选中的tab
    },[location])
    return (
        <div className={ style.container }>
            <TabBar activeKey={ key } onChange={ onTabChange }>
                {
                    tabs.map(item => {
                        return (
                            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                        )
                    })
                }
            </TabBar>
        </div>
    )
}
