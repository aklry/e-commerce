import React, { useEffect, useState } from 'react'
import style from './index.module.css'
import api from '../../api/evaluation'
import { Button, Divider, Rate } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'

export default function Evaluation(props) {
  const { details } = props
  const [evaluation, setEvaluation] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    if (details) {
      api.getEvaluation(details.id)
        .then(res => {
          setEvaluation(res.data.records.slice(0, 2))
        })
    }
  }, [details])
  //查看全部评价
  const onViewMore = () => {
    navigate('/evaluateList', {
      state: {
        id: details.id
      }
    })
  }
  return (
    <>
      <h4 className={style.iconTitle}>商品评价</h4>
      {
        evaluation.map(eva => {
          return (
            <div style={{padding: '.15rem'}} key={ eva.id }>
              商品评分:<Rate readOnly value={eva.productRate} />
              <p>描述: {eva.descs}</p>
              <Divider />
            </div>
          )
        })
      }
      <div style={{ textAlign: 'center' }}>
        <Button onClick={ onViewMore }>查看全部评价</Button>
      </div>
    </>
  )
}
