import React from 'react'
import { Swiper } from 'antd-mobile'
import style from './index.module.css'
import { swiperData } from './data'

export default function SwiperComponent() {
    return (
        <div className={style.swiperContainer}>
            <Swiper autoplay loop>
                {
                    swiperData.map((item) => {
                        return (
                            <Swiper.Item key={item.imgUrl}>
                                <img src={item.imgUrl} alt='' />
                            </Swiper.Item>
                        )
                    })
                }
            </Swiper>
        </div>
    )
}
