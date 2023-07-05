import { Button, Form, Input, Cascader, Toast } from 'antd-mobile'
import NavBar from '../../component/NavBar'
import React, { useEffect, useState } from 'react'
import data from './data'
import api from '../../api/address'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteAddress } from '../../store/actions/selectAddress'

export default function AddressForm() {
    const [visible, setVisible] = useState(false)
    const { state: address } = useLocation()
    const { address: store } = useSelector(state => state.address)
    const [area, setArea] = useState(address ? address.area : [])
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //提交表单，发送添加收货地址的请求
    const onSave = async values => {
        if (address && address.id) {
            //修改用户
            const result = await api.updateAddress({
                id: address.id,
                ...values,
                area: area.join(',')
            })
            const { code, msg } = result.data
            if (code !== -1) {
                Toast.show({ icon: 'success', content: msg })
                //跳转到上一页
                navigate(-1)
            } else {
                Toast.show({ icon: 'fail', content: msg })
            }
        } else {
            //添加用户
            const result = await api.addAddress({
                ...values,
                area: area.join(',')
            })
            const { code, msg } = result.data
            if (code !== -1) {
                Toast.show({ icon: 'success', content: msg })
                //跳转到上一页
                navigate(-1)
            } else {
                Toast.show({ icon: 'fail', content: msg })
            }
        }
    }
    //删除收货地址
    const onRemove = async () => {
        const result = await api.deleteAddress({ id: address.id })
        const { code, msg } = result.data
        if (code !== -1) {
            Toast.show({ icon: 'success', content: msg })
            //如果删除的收货地址id与保存在redux中的一致，则一起删除redux中的地址信息
            if (address.id === store.id) {
                dispatch(deleteAddress({}))
            }
            //跳转到上一页
            navigate(-1)
        } else {
            Toast.show({ icon: 'fail', content: msg })
        }
    }
    useEffect(() => {
        //判断点击编辑按钮传递过来的数据是否存在,如果存在,则设置表单数据
        if (address) {
            form.setFieldsValue(address)
        }
    }, [address, form])
    return (
        <>
            <NavBar>填写收货地址</NavBar>
            <Form
                onFinish={onSave}
                form={form}
                style={{ padding: '0 .15rem', boxSizing: 'border-box' }}
                className='content'
                layout='horizontal'
                footer={
                    <>
                        <Button type='submit' block color='danger'>提交</Button>
                        {
                            address && <Button block color='warning' onClick={onRemove}>删除</Button>
                        }
                    </>
                }
            >
                <Form.Item
                    name='name'
                    label='收货人'
                    rules={[{ required: true, message: '姓名不能为空' }]}
                >
                    <Input placeholder='请输入姓名' />
                </Form.Item>
                <Form.Item
                    name='tel'
                    label='联系方式'
                    rules={[
                        { required: true, message: '联系不能为空' },
                        { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '不是合格的手机号' }
                    ]}
                >
                    <Input placeholder='手机号码' />
                </Form.Item>
                <Form.Item
                    name='labelArea'
                    label='所在地区'
                    rules={[
                        { required: true, message: '不能为空' }
                    ]}
                >
                    <Input placeholder='请选择所在地区' onFocus={() => setVisible(true)} />
                </Form.Item>
                <Form.Item
                    name='address'
                    label='详细地址'
                    rules={[
                        { required: true, message: '不能为空' }
                    ]}
                >
                    <Input placeholder='输入详细地址' />
                </Form.Item>
            </Form>
            <div className='citySelect'>
                <Cascader
                    title='请选择地区'
                    options={data}
                    visible={visible}
                    value={area}
                    onClose={() => {
                        setVisible(false)
                    }}
                    onConfirm={(value, { items }) => {
                        //遍历选中的值，取到每一级的label，拼接起来通过form实例赋给文本框
                        const labelArea = items.map(item => item.label).join(' ')
                        form.setFieldsValue({ labelArea })
                        setArea(value)
                    }}
                />
            </div>
        </>
    )
}
