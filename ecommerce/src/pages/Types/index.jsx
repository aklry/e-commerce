import React, { useEffect, useState } from 'react'
import style from './index.module.css'
import api from '../../api/product'
import { Grid } from 'antd-mobile'
import { useDispatch } from 'react-redux'
import { viewProductList } from '../../store/actions/viewProductList'
import { useNavigate } from 'react-router-dom'
import Search from '../../component/SearchBar'

export default function Types() {
  const [types, setTypes] = useState([]) //用来保存商品的大的类型
  const [selectedLink, setSelectedLink] = useState({})
  const [childTypes, setChildTypes] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    //请求商品的大的类型
    api.getList(-1)
      .then(res => {
        setTypes(res.data.records)
        onSelectLink(res.data.records[0])()
      })
      .catch(error => console.log(error))
  }, [])
  //点击商品大的类型的事件
  const onSelectLink = (item) => {
    return async () => {
      setSelectedLink(item)

      //请求包含的商品的小类型
      const result = await api.getList(item.id)
      const { records } = result.data
      setChildTypes(records)
    }
  }
  //查看商品列表
  const onViewList = item => {
    return () => {
      dispatch(viewProductList(item.name)) //设置商品列表搜索的关键词
      navigate('/list')
    }
  }
  return (
    <>
      <Search />
      <div className={'content ' + style.container}>
        <div className={style.side}>
          {
            types && types.map(item => {
              return (
                <p key={item.id} onClick={onSelectLink(item)} className={selectedLink.id === item.id ? style.selectedLink : style.link}>{item.name}</p>
              )
            })
          }
        </div>
        <div className={style.content}>
          <h3>{selectedLink.name}</h3>
          <Grid columns={3} gap={10}>
            <React.Fragment>
              {
                childTypes.map(item => {
                  return (
                    <Grid.Item key={item.id}>
                      <div onClick={onViewList(item)}>
                        <img src={item.pic} alt="" />
                        <p>{item.name}</p>
                      </div>
                    </Grid.Item>
                  )
                })
              }
            </React.Fragment>
          </Grid>
        </div>
      </div>
    </>
  )
}
