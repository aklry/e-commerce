import React from 'react'
import style from './index.module.css'
import { Avatar, Grid } from 'antd-mobile'
import { EnvironmentOutline, FileOutline, HeartOutline } from 'antd-mobile-icons'
import TabBar from '../../component/TabBar'
import { useNavigate } from 'react-router-dom'

export default function My() {
    const navigate = useNavigate()
    return (
        <>
            <div className={style.header}>
                <Grid columns={3}>
                    <Grid.Item span={1}>
                        <Avatar src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw%2F1e8de07f-2c9e-4ecb-8893-5a8194a09d8f%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691232247&t=7c4a1e5720fa6b7f02e43eb77216c3a7' />
                    </Grid.Item>
                    <Grid.Item span={2}>
                        <h3>hi, 用户xxx</h3>
                    </Grid.Item>
                    <Grid.Item span={1}>
                        <span onClick={() => navigate('/orders')}>
                            <FileOutline />
                            <p>我的订单</p>
                        </span>
                    </Grid.Item>
                    <Grid.Item span={1}>
                        <span onClick={() => navigate('/star')}>
                            <HeartOutline />
                            <p>我的收藏</p>
                        </span>
                    </Grid.Item>
                    <Grid.Item span={1}>
                        <span onClick={() => navigate('/addressList')}>
                            <EnvironmentOutline />
                            <p>收货地址</p>
                        </span>

                    </Grid.Item>
                </Grid>
            </div>
            <TabBar />
        </>
    )
}
