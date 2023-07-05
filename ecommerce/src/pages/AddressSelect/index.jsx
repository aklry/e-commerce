import React, { useEffect, useState } from 'react'
import NavBar from '../../component/NavBar'
import { Button, List, Radio } from 'antd-mobile'
import api from '../../api/address'
import { useDispatch, useSelector } from 'react-redux'
import { setAddress } from '../../store/actions/selectAddress'
import { useNavigate } from 'react-router-dom'

export default function AddressSelect() {
  const [addresses, setAddresses] = useState([])
  const { address: site } = useSelector(state => state.address)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    //获取所有的收货地址
    (async function () {
      const result = await api.getAddressList()
      const { records } = result.data
      setAddresses(records)
      //判断redux store树中是否有收货地址，如果没有则将请求的数据中的第一项设置为默认收货地址
      if (typeof JSON.stringify(site) === 'string') {
        dispatch(setAddress(records[0] || {}))
      }
    }())
  }, [dispatch, site])
  //选择收货地址
  const onselect = address => {
    dispatch(setAddress(address)) //将收货地址数据保存在redux
    navigate(-1)
  }
  //点击编辑按钮
  const onEdit = address => {
    navigate('/addAddress', {
      state: {
        ...address,
        area: address.area.split(',')
      }
    })
  }
  return (
    <>
      <NavBar>收货地址</NavBar>
      <div className='content'>
        <List>
          {
            addresses.map(address => {
              return (
                <List.Item key={address.id}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span onClick={() => onselect(address)}>
                      <Radio checked={site.id === address.id} style={{ width: '.7rem' }} />
                    </span>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '.35rem' }}>{address.name + '  ' + address.tel}</h4>
                      <p style={{ fontSize: '.28rem' }}>{address.labelArea + '  ' + address.address}</p>
                    </div>
                    <p style={{ fontSize: '.28rem' }} onClick={() => onEdit(address)}>编辑</p>
                  </div>
                </List.Item>
              )
            })
          }
        </List>
        <div className='footer'>
          <Button block color='danger' onClick={() => navigate('/addAddress')}>新增收货地址</Button>
        </div>
      </div>
    </>
  )
}
