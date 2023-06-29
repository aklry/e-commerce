import React from 'react'
import { Divider, Grid } from 'antd-mobile'
import { types } from './data'
import { RightOutline } from 'antd-mobile-icons'
import style from './index.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { viewProductList } from '../../store/actions/viewProductList'

export default function Types() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onViewList = type => {
        navigate('/types')
        dispatch(viewProductList(type.title))
    }
    return (
        <div>
            <Divider>
                <h4>分类</h4>
            </Divider>
            <Grid columns={2}>
                {
                    types.map((type, index) => {
                        return (
                            <React.Fragment key={ index}>
                                <Grid.Item span={index > 1 ? 1 : 2}>
                                    <div className={ style.typeBox } onClick={ () => onViewList(type) }>
                                        <h3>{type.title}</h3>
                                        <img src={type.imgUrl} alt="" />
                                    </div>
                                </Grid.Item>
                            </React.Fragment>
                        )
                    })
                }
            </Grid>
            <div className={ style.typeMore } onClick={ () => navigate('/types') }>
                <h3>更多</h3>
                <RightOutline />
            </div>
        </div>
    )
}
