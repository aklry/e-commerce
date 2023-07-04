import { Card, Grid, Space, Stepper } from 'antd-mobile'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import NavBar from '../../component/NavBar'

export default function ConfirmOrder() {
    const location = useLocation()
    const { details } = location.state
    const { selectedAttr = {} } = details
    const [total, setTotal] = useState(details.price * selectedAttr.count)
    const onCountChange = value => {
        setTotal(details.price * value)
    }
    return (
        <>
            <NavBar>确认订单</NavBar>
            <div className='content'>
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
            </div>

        </>
    )
}
