import React, { useEffect, useState } from 'react'
import Search from '../../component/SearchBar'
import { useNavigate } from 'react-router-dom'
import { Button, Tag } from 'antd-mobile'
import style from './index.module.css'
import api from '../../api/product'
import { useDispatch } from 'react-redux'
import { viewProductList } from '../../store/actions/viewProductList'

export default function SearchPage() {
    const [hotWords, setHotWords] = useState([])
    useEffect(() => {
        api.getProductHotWords()
            .then(res => {
                setHotWords(res.data.records)
            })
            .catch(error => console.log(error))
    }, [])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //执行商品搜索
    const onSearch = () => {
        navigate('/list')
    }
    //点击热搜词
    const onTagClick = (item) => {
        //设置商品搜索关键词
        dispatch(viewProductList(item.name))
        navigate('/list')
    }
    return (
        <>
            <Search defaultFocused={true}>
                <Button size="mini" shape="rounded" color='primary' onClick={onSearch}>搜索</Button>
            </Search>
            <div className={style.hot + ' content'}>
                <h4>热门搜索</h4>
                {
                    hotWords && hotWords.map((item, index) => {
                        return (
                            <Tag key={ index } onClick={ () => { onTagClick(item) } }>
                                { item.name }
                            </Tag>
                        )
                    })
                }
            </div>
        </>
    )
}
