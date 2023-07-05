import { Button, Card, Grid, List, Space, Stepper, Toast } from 'antd-mobile'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import NavBar from '../../component/NavBar'
import api from '../../api/address'
import orderApi from '../../api/orders'
import { useSelector, useDispatch } from 'react-redux'
import { setAddress } from '../../store/actions/selectAddress'

export default function ConfirmOrder() {
    const { address } = useSelector(state => state.address)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { details } = location.state
    const { selectedAttr = {} } = details
    const [total, setTotal] = useState(details.price * selectedAttr.count)
    const [count, setCount] = useState(selectedAttr.count)
    const onCountChange = value => {
        setTotal(details.price * value)
        setCount(value)
    }
    useEffect(() => {
        if (JSON.stringify(address) === '{}') {
            (async function () {
                const result = await api.getAddressList()
                const [records] = result.data.records
                dispatch(setAddress(records))
            }())
        }
    }, [])
    const addAddress = () => {
        navigate('/addressSelect')
    }
    //生成订单
    const onSave = async () => {
        //判断有没有收货地址
        if (!address.id) {
            Toast.show({
                icon: 'fail',
                content: '请先添加收货地址'
            })
            return
        }
        const result = await orderApi.addOrder({
            product: JSON.stringify({ id: details.id, name: details.name, selectedAttr, mainPic: details.mainPic }),
            count,
            addressId: address.id,
            total
        })
        if (result) {
            Toast.show({
                icon: 'success',
                content: '操作成功'
            })
            navigate('/orders') //跳转到订单列表页面
        }
    }
    return (
        <>
            <NavBar>确认订单</NavBar>
            <div className='content'>
                <List>
                    <List.Item onClick={addAddress}>
                        {
                            JSON.stringify(address) === undefined
                                ?
                                <div style={{ textAlign: 'center', color: 'red', padding: '.2rem' }}>
                                    您还没有收货地址, 点击新增地址
                                </div>
                                :
                                <>
                                    <h4>{address.name + '  ' + address.tel}</h4>
                                    <p>{address.labelArea + '  ' + address.address}</p>
                                </>
                        }
                    </List.Item>
                </List>
                <Card>
                    <Grid columns={5} gap={20}>
                        <Grid.Item span={2}>
                            <img src={details.mainPic.split(',')[0]} alt="" style={{ width: '100%', height: '100%' }} />
                        </Grid.Item>
                        <Grid.Item span={3}>
                            <Space direction='vertical' justify='between' style={{ width: '100%' }}>
                                <h4>{details.name}</h4>
                                {selectedAttr.color + ' ' + selectedAttr.size}
                                <Space justify='between' align='center'>
                                    <h2 style={{ color: 'red' }}>￥{details.price}</h2>
                                    <Stepper min={1} defaultValue={selectedAttr.count} onChange={onCountChange} />
                                </Space>
                            </Space>
                        </Grid.Item>
                    </Grid>
                    <Space justify='between' style={{ width: '100%' }}>
                        <span>商品总额:</span>
                        <span>￥{total}</span>
                    </Space>
                    <Space justify='between' style={{ marginTop: '.15rem', width: '100%' }}>
                        <span>运费: </span>
                        <span>免运费</span>
                    </Space>
                </Card>
                <div className='footer'>
                    <Button block color='danger' onClick={onSave}>确定</Button>
                </div>
            </div>

        </>
    )
}
