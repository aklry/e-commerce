import React from 'react'
import { Popover } from 'antd-mobile'
import { actions } from './actions'
import { useNavigate } from 'react-router-dom'

export default function PopoverMenu(props) {
    const navigate = useNavigate()
    return (
        <>
            <Popover.Menu
                actions={actions}
                onAction={node => navigate(node.path)}
                trigger='click'
                mode='dark'
            >
                {props.children}
            </Popover.Menu>
        </>
    )
}
