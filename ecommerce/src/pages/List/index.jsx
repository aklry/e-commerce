import React, { useRef, useState } from 'react'
import Search from '../../component/SearchBar'
import Filter from '../../component/Filter'
import api from '../../api/product'
import { useSelector } from 'react-redux'
import style from './index.module.css'
import { Grid, InfiniteScroll, List, DotLoading } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'


export default function ListPage() {
  const [list, setList] = useState([])
  const city = useSelector(state => state.citySelect.city.city)
  const name = useSelector(state => state.searchValue.title)
  const [filters, setFilters] = useState({ city: city && city.id, name: name })
  const [hasMore, setHasMore] = useState(true)
  const { current } = useRef({ count: 0 })
  const navigate = useNavigate()
  //请求商品列表
  const onGetList = async params => {
    return api.getProduct(params)
  }
  //加载更多数据
  const loadMore = async () => {
    const params = {
      ...filters,
      count: current.count,
      brand: filters.brand ? filters.brand.join(',') : undefined,
      price: filters.price ? filters.price.join(',') : undefined
    }
    const result = await onGetList(params) //请求商品列表
    setList([...list, ...result.data.records]) //整合新旧数据
    setHasMore(result.data.records.length > 0)
    current.count++
  }
  //当搜索条件发生变化时
  const onFilterChange = (newFilters = {}) => {
    setFilters({ ...filters, ...newFilters }) //合并过滤条件
    setList([]) //清空列表
    setHasMore(true) //自动调用loadMore加载数据
    current.count = 0
  }

  //查看商品详情
  const onViewDetails = item => {
    navigate('/details', {
      state: {
        id: item.id
      }
    })
  }


  return (
    <>
      <Search />
      <div className='content'>
        <Filter onChange={onFilterChange} />
        <div className={style.list}>
          <List>
            {
              list && list.map((item) => {
                return (
                  <List.Item arrow={false} key={item.id} onClick={() => onViewDetails(item)}>
                    <Grid columns={5} gap={20}>
                      <Grid.Item span={2}>
                        <img src={item.mainPic.split(',')[0]} alt="" style={{ width: '100%', height: '100%' }} />
                      </Grid.Item>
                      <Grid.Item span={3}>
                        <h4 data-bs-title={item.name} className='text'>{item.name}</h4>
                        <h3 className='price'>￥{item.price}</h3>
                        <h4 className='sale'>已售{item.sale}</h4>
                      </Grid.Item>
                    </Grid>
                  </List.Item>
                )
              })
            }
          </List>
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
            <>
              {hasMore ? (
                <>
                  <span>加载中</span>
                  <DotLoading />
                </>
              ) : (
                <span>---已全部加载完 ---</span>
              )}
            </>
          </InfiniteScroll>
        </div>
      </div>
    </>
  )
}
