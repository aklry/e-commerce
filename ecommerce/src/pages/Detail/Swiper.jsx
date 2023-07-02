import React from 'react'
import style from './index.module.css'
import { Swiper } from 'antd-mobile'
import { LeftOutline, MoreOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
import PopoverMenu from '../../component/PopoverMenu'

export default function SwiperCom(props) {
    const navigate = useNavigate()
    const { imgUrl } = props
    return (
        <div className={style.swiper}>
            <Swiper autoplay loop>
                {
                    imgUrl && imgUrl.map((url, index) => {
                        return (
                            <Swiper.Item key={index}>
                                <img src={url} alt="" />
                            </Swiper.Item>
                        )
                    })
                }
            </Swiper>
            <span className={style.icon} onClick={() => navigate(-1)} style={{ left: '.2rem'} }>
                <LeftOutline />
            </span>
            <PopoverMenu>
                <span className={style.icon} style={ {right: '.2rem'} }>
                    <MoreOutline />
                </span>
            </PopoverMenu>
        </div>
    )
}
