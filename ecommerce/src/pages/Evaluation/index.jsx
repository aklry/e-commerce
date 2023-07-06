import React, { useEffect, useState } from 'react'
import { Button, Card, Rate, Space, TextArea, Toast } from 'antd-mobile'
import Nav from '../../component/NavBar'
import style from './index.module.css'
import api from '../../api/evaluation'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Evaluation() {
    const [evaluation, setEvaluation] = useState({})
    const { state } = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        //根据该条订单的id值获取对应的评价信息
        (async function () {
            const result = await api.getByOrderId(state.orderId)
            const { code, records } = result.data
            if (code !== -1 && records) {
                setEvaluation(records)
            }
       }())
    }, [])
    //评分发生变化
    const onRateChange = type => {
        return (value) => {
            setEvaluation({ ...evaluation, [type]: value })
        }
    }
    //保存商品评价
    const onSave = async () => {
        //判断一下是否填写文字描述评价
        if (!evaluation.descs) {
            Toast.show({ icon: 'fail', content: '请填写文字描述' })
            return
        }
        const result = await api.addEvaluation({ ...evaluation, ...state })
        const { code } = result.data
        if (code !== -1) {
            Toast.show({ icon: 'success', content: '感谢您的评价' })
            //返回上一页
            navigate(-1)
        }
    }
    return (
        <div className={style.container}>
            <Nav>商品评价</Nav>
            <div className='content'>
                <Card>
                    <TextArea value={evaluation.descs} showCount maxLength={300} rows={5} placeholder='请输入文字描述的评价' onChange={ onRateChange('descs') } />
                </Card>
                <Card>
                    <Space align='center'>
                        <label>商品符合度</label>
                        <Rate value={evaluation.productRate} onChange={onRateChange('productRate')} />
                    </Space>
                    <Space align='center'>
                        <label>服务态度</label>
                        <Rate value={evaluation.serviceRate} onChange={onRateChange('serviceRate')} />
                    </Space>
                    <Space align='center'>
                        <label>物流速度</label>
                        <Rate value={evaluation.logisticsRate} onChange={onRateChange('logisticsRate')} />
                    </Space>
                </Card>
                <Button block color='danger' onClick={ onSave }>提交</Button>
                <Button block onClick={() => navigate(-1)}>取消</Button>
            </div>
        </div>
    )
}
