import React from 'react'
import { Divider, Card, Grid } from 'antd-mobile'
import style from './index.module.css'
import { hotProducts } from './data'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { viewProductList } from '../../store/actions/viewProductList'

export default function HotProduct() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //查看商品列表
    const onViewList = (product) => {
        return () => {
            navigate('/list')
            dispatch(viewProductList(product.title))
        }
    }
    return (
        <div>
            <Divider contentPosition='center' direction='horizontal'>
                <h4>热销单品</h4>
            </Divider>
            <Card>
                <Grid columns={4} gap={10}>
                    {
                        hotProducts.map((product, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Grid.Item>
                                        <div className={style.imgBox} onClick={ onViewList(product) }>
                                            <img src={product.imgUrl} alt="" />
                                            <p>{product.title}</p>
                                        </div>
                                    </Grid.Item>
                                </React.Fragment>
                            )
                        })
                    }
                </Grid>
            </Card>
        </div>
    )
}
