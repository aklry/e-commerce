import React, { useEffect, useState } from 'react'
import NavBar from '../../component/NavBar'
import api from '../../api/orders'
import { Button, Card, Dialog, Grid, Toast } from 'antd-mobile'
import style from './index.module.css'
import { useNavigate } from 'react-router-dom'

export default function Orders() {
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()
    //获取所有订单信息
    const onGetList = async () => {
        return api.getOrderList()
    }
    //删除订单
    const onRemove = async (id, e) => {
        e.stopPropagation()
        const result = await Dialog.confirm({
            content: '确定要删除该订单吗?'
        })
        if (result) {
            const record = await api.deleteOrder({ id })
            const { code, msg } = record.data
            if (code !== -1) {
                Toast.show({ icon: 'success', content: msg })
                const results = await onGetList()
                const { code, records } = results.data
                if (code !== -1) {
                    setOrders(records)
                }
            } else {
                Toast.show({ icon: 'fail', content: msg })
            }
        }
    }
    //评价或更改评价
    const onEvaluate = (order, e) => {
        e.stopPropagation()
        const product = JSON.parse(order.product)
        navigate('/evaluate', {
            state: {
                orderId: order.id,
                productId: product.id
            }
        })
    }
    useEffect(() => {
        (async function () {
            const results = await onGetList()
            const { code, records } = results.data
            if (code !== -1) {
                setOrders(records)
            }
        }())
    }, [])
    //查看商品详情
    const onViewProduct = product => {
        return () => {
            navigate('/details', {
                state: {
                    id: product.id
                }
            })
        }
    }
    return (
        <>
            <NavBar>全部订单</NavBar>
            <div className='content'>
                {
                    orders.map(order => {
                        const product = JSON.parse(order.product)
                        const { selectAttr = {}, mainPic } = product
                        return (
                            <div onClick={onViewProduct(product)} key={order.id}>
                                <Card>
                                    <Grid columns={10} gap={20} style={{ alignItems: 'center' }}>
                                        <Grid.Item span={2}>
                                            <img src={mainPic.split(',')[0]} alt="" style={{ width: '100%' }} />
                                        </Grid.Item>
                                        <Grid.Item span={7}>
                                            <p>{product.name}</p>
                                            <i style={{ color: '#aaa' }}>{selectAttr.color + '  ' + selectAttr.size}</i>
                                        </Grid.Item>
                                        <Grid.Item span={1}>
                                            x{order.count}
                                        </Grid.Item>
                                    </Grid>
                                    <div className={style.money}>
                                        实付: ￥{order.total}
                                    </div>
                                    <div className={style.footer}>
                                        <Button size='mini' onClick={(e) => onRemove(order.id,e)}>删除</Button>
                                        {
                                            order.evaluated === 1
                                                ?
                                                <Button color='danger' size='mini' onClick={(e) => onEvaluate(order, e)}>更改评价</Button>
                                                :
                                                <Button color='danger' size='mini' onClick={(e) => onEvaluate(order, e)}>评价</Button>
                                        }
                                    </div>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
