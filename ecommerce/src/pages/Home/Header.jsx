import React, { useState } from 'react'
import style from './index.module.css'
import { UnorderedListOutline, DownOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
import { SearchBar, Space, Popup } from 'antd-mobile'
import CitySelect from '../../component/CitySelect'
import { setCityName } from '../../store/actions/citySelect'
import { useDispatch, useSelector } from 'react-redux'

export default function Header() {
  const navigate = useNavigate()
  const [popupVisible, setPopupVisible] = useState(false) //控制弹出层的显示与隐藏
  const dispatch = useDispatch()
  const { city } = useSelector(state => state.citySelect.city)
  //获取城市列表子组件传过来的值
  const getCityName = city => {
    setPopupVisible(false)
    dispatch(setCityName({
      city
    }))
  }
  return (
    <div className={style.header}>
      <UnorderedListOutline onClick={() => navigate('/types')} />
      <SearchBar placeholder='请输入商品名称' onFocus={() => navigate('/search')} />
      <Space align='baseline' onClick={ () => setPopupVisible(true) }>
        <span>{ city ? city.name : '城市' }</span>
        <DownOutline style={{ fontSize: '.2rem' }} />
      </Space>
      <Popup
        visible={popupVisible}
        onMaskClick={() => {
          setPopupVisible(false)
        }}
        bodyStyle={{
          height: '90%',
        }}
      >
        <CitySelect getCityName={ getCityName } />
      </Popup>
    </div>
  )
}
