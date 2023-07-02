import React, { useEffect, useState } from 'react'
import api from '../../api/product'
import { useLocation } from 'react-router-dom'
import SwiperCom from './Swiper'
import { Card, Space, Toast } from 'antd-mobile'
import style from './index.module.css'
import { HeartOutline, HeartFill } from 'antd-mobile-icons'

export default function Detail() {
    const location = useLocation()
    const [stared, setStared] = useState(false)
    const [details, setDetails] = useState({})
    const { id } = location.state
    const starHandler = () => {
        api.starProduct(details.id)
            .then(res => {
                const { code, msg } = res.data
                code === -1
                    ?
                    Toast.show({
                        icon: 'fail',
                        content: msg
                    })
                    :
                    Toast.show({
                        icon: 'success',
                        content: msg
                    })
                setStared(true)
            })
            .catch(error => console.log(error))
    }
    //取消商品收藏
    const cancelStarHandler = () => {
        api.cancelStarProduct(details.id)
            .then(res => {
                const { code, msg } = res.data
                code === -1
                    ?
                    Toast.show({
                        icon: 'fail',
                        content: msg
                    })
                    :
                    Toast.show({
                        icon: 'success',
                        content: msg
                    })
                setStared(false)
            })
            .catch(error => console.log(error))
    }
    //获取所有的收藏商品
    const onGetListStared = () => {
        return api.getListStared()
    }
    //请求商品详情
    useEffect(() => {
        api.getDetails(id)
            .then(result => {
                setDetails({ ...result.data.record })
                //获取所有的商品数据,然后跟当前商品详情的id比较，
                //如果收藏的商品id包含商品详情的id，则表示当前的商品已被收藏
                onGetListStared()
                    .then(res => {
                        const { records } = res.data
                        const record = records && records.find((item) => result.data.record.id === item.productId)
                        if (record) {
                            setStared(true)
                        }
                    })
            })
            .catch(error => console.log(error))
    }, [id])
    return (
        <>
            <SwiperCom imgUrl={details.mainPic ? details.mainPic.split(','[0]) : []} />
            <Card>
                <Space justify='between' className={style.space}>
                    <span className={style.price}>￥<b>{details.price}</b></span>
                    {
                        !stared ?
                            <p className={style.star} onClick={starHandler}>
                                <HeartOutline />
                                收藏
                            </p>
                            :
                            <p className={style.star} onClick={cancelStarHandler}>
                                <HeartFill style={{ color: 'red' }} />
                                已收藏
                            </p>
                    }
                </Space>
                <div>
                    <h4>{details.name}</h4>
                </div>
            </Card>
        </>
    )
}
