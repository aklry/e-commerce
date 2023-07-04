import React, { useEffect, useState } from 'react'
import style from './index.module.css'

export default function Introduce(props) {
    const { details } = props
    const [imgs, setImgs] = useState([])
    useEffect(() => {
        setImgs(details.detailPic ? details.detailPic.split(',') : [])
    }, [details])
    return (
        <>
            <h4 className={style.iconTitle}>商品介绍</h4>
            {
                imgs.map(image => {
                    return (
                        <img key={image} src={image} alt="" style={{ width: '100%' }} />
                    )
                })
            }
        </>
    )
}
