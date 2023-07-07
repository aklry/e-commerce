import React, { useEffect, useState } from 'react'
import Nav from '../../component/NavBar'
import { Space, List, Grid, Checkbox, Button, Toast } from 'antd-mobile'
import api from '../../api/product'
import style from './index.module.css'

export default function Star() {
    const [total, setTotal] = useState(0)
    const [editable, setEditable] = useState(false)
    const [list, setList] = useState([])
    const [selected, setSelected] = useState([])

    const onGetList = async () => {
        //获取所有已收藏商品的数量
        const { data } = await api.getListStared()
        const { records } = data
        setTotal(records.length > 0 ? records.length : 0)
        if (records.length) {
            //获取所有已收藏商品的id
            let ids = records.map(item => item.productId).join(',')
            const { data: newData } = await api.getListById(ids)
            const { code, records: product } = newData
            if (code !== '-1') {
                setList(product)
                setSelected([])
            }
            return
        }
        setList([])
    }
    useEffect(() => {
        onGetList()
    }, [])
    //选择商品
    const onCheckChange = (item, value) => {
        if (value) {
            //选中商品
            selected.push(item.id)
            setSelected([...selected])
            return
        }
        if (selected.includes(item.id)) {
            selected.splice(selected.indexOf(item.id), 1)
            setSelected([...selected])
        }
    }
    //取消收藏
    const onCancelStar = async () => {
        const promises = selected.map(item => api.cancelStarProduct(item))
        const result = await Promise.all(promises)
        result.forEach(result => {
            const { code, msg } = result.data
            if (code !== -1) {
                Toast.show({ icon: 'success', content: msg })
                onGetList()
            } else {
                Toast.show({ icon: 'fail', content: msg })
            }
        })
    }
    //全选
    const onCheckAll = () => {
        //判断商品是否全部选中,如果是，取消全部选中,否则选中全部商品
        if (selected.length === list.length) {
            setSelected([])
        } else {
            setSelected(list.map(item => item.id))
        }
    }
    return (
        <div className={style.container}>
            <Nav>我的收藏</Nav>
            <div className='content'>
                <Space justify='between'>
                    <span>共{total}件收藏</span>
                    {
                        editable ?
                            <span onClick={() => setEditable(false)}>完成</span>
                            :
                            <span onClick={() => setEditable(true)}>编辑</span>
                    }
                </Space>
                <List>
                    {
                        list
                            ?
                            list.map(item => {
                                return (
                                    <List.Item key={item.id}>
                                        <Grid gap={10} columns={editable ? 8 : 5}>
                                            {
                                                editable &&
                                                <Grid.Item>
                                                    <Checkbox checked={selected.includes(item.id)} onChange={(value) => onCheckChange(item, value)} />
                                                </Grid.Item>
                                            }
                                            <Grid.Item span={editable ? 4 : 2}>
                                                <img src={item.mainPic.split(',')[0]} alt="" />
                                            </Grid.Item>
                                            <Grid.Item span={3}>
                                                <h4>{item.name}</h4>
                                                <h3>￥{item.price}</h3>
                                            </Grid.Item>
                                        </Grid>
                                    </List.Item>
                                )
                            })
                            :
                            null
                    }
                </List>
                {
                    editable
                    &&
                    <div className='footer'>
                        <Button block onClick={onCheckAll}>全选</Button>
                        <Button block color='danger' disabled={selected.length === 0} onClick={onCancelStar}>取消收藏</Button>
                    </div>
                }
            </div>
        </div>
    )
}
