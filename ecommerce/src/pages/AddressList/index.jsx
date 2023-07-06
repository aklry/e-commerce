import React, { useEffect, useState } from 'react'
import NavBar from '../../component/NavBar'
import { Button, List } from 'antd-mobile'
import api from '../../api/address'
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AddressList() {
  const [addresses, setAddresses] = useState([])
  const { address: site } = useSelector(state => state.address)
  const navigate = useNavigate()
  useEffect(() => {
    //获取所有的收货地址
    (async function () {
      const result = await api.getAddressList()
      const { records } = result.data
      setAddresses(records)
    }())
  }, [site])
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
      <NavBar>收货地址管理</NavBar>
      <div className='content'>
        <List>
          {
            addresses.map(address => {
              return (
                <List.Item key={address.id}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
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
