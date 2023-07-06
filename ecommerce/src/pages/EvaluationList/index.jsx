import React, { useEffect, useState } from 'react'
import Nav from '../../component/NavBar'
import api from '../../api/evaluation'
import { useLocation } from 'react-router-dom'
import { Card, Rate, Space } from 'antd-mobile'

export default function EvaluationList() {
    const { state } = useLocation()
    const [evaluationList, setEvaluationList] = useState([])
    useEffect(() => {
        (async function () {
            if (state) {
                //根据商品id获取该商品的所有评价
                const result = await api.getEvaluation(state.id)
                const { code, records } = result.data
                if (code !== -1) {
                    setEvaluationList(records)
                }
            }
        }())
    }, [state])
    return (
        <>
            <Nav>全部评价</Nav>
            <div className='content'>
                {
                    evaluationList.map(evaluation => {
                        return (
                            <React.Fragment key={evaluation.id}>
                                <Card style={{ margin: '.15rem 0'}}>
                                    <p>
                                        商品评分: <Rate readOnly value={evaluation.productRate} />
                                    </p>
                                    <p>
                                        描述: <span>{evaluation.descs}</span>
                                    </p>
                                </Card>
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </>
    )
}
