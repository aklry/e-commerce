import React from 'react'
import style from './index.module.css'
import { Button, ErrorBlock } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'

export default function Error() {
    const navigate = useNavigate()
    return (
        <div className={style.container}>
            <ErrorBlock fullPage />
            <Button onClick={() => navigate(-1)}>返回</Button>
        </div>
    )
}
