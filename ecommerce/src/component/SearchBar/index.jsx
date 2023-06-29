import React, { useEffect, useRef } from 'react'
import Nav from '../NavBar'
import { SearchBar } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { viewProductList } from '../../store/actions/viewProductList'


export default function Search(props) {
  const { defaultFocused } = props
  const search = useRef(null)
  useEffect(() => {
    if (defaultFocused) {
      search.current.focus() //自动获得焦点
    }
  }, [defaultFocused])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const tag = useSelector(state => state.searchValue)
  const onFocus = () => {
    //防止search页面重复跳转
    if (!defaultFocused) {
      navigate('/search')
    }
  }

  const onSearch = () => {
    navigate('/list')
  }

  const onChange = value => {
    dispatch(viewProductList(value))
  }
  return (
    <Nav right={props.children}>
      <SearchBar value={ tag && tag.title} onSearch={ onSearch } ref={search} onFocus={onFocus} onChange={onChange} />
    </Nav>
  )
}
