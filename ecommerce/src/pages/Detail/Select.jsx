import React, { useEffect, useState } from 'react'
import { Button, CapsuleTabs, Grid, Popup, Space, Stepper } from 'antd-mobile'
import { MoreOutline } from 'antd-mobile-icons'
import style from './index.module.css'
import { useNavigate } from 'react-router-dom'

export default function Select(props) {
    const { details = {} } = props
    const colors = details.colors ? details.colors.split(',') : []
    const sizes = details.sizes ? details.sizes.split(',') : []
    const navigate = useNavigate()
    const [popupVisible, setPopupVisible] = useState(false)
    const [selectedStr, setSelectedStr] = useState('')
    const [selected, setSelected] = useState({}) //选中的所有属性(包含颜色以及尺寸)
    //监听selected值的变化,生成规格拼接的字符串
    useEffect(() => {
        setSelectedStr([selected.color, selected.size, selected.count + '个'].join('   '))
    }, [selected])

    useEffect(() => {
        onSelect({ color: colors[0], size: sizes[0], count: 1 })
    },[details])
    //弹出层点击确定
    const onSave = () => {
        navigate('/confirmOrder', {
            state: {
                details: {...details, selectedAttr: selected}
            }
        })
        setPopupVisible(false)
    }
    //选择规格的回调
    const onSelect = select => {
        setSelected(select)
        //传递数据到index.jsx
        props.onChange && props.onChange(select)
    }
    return (
        <div className={style.selectContainer}>
            <Grid columns={8}>
                <Grid.Item>
                    <h4>已选</h4>
                </Grid.Item>
                <Grid.Item span={6}>
                    {selectedStr}
                </Grid.Item>
                <Grid.Item>
                    <MoreOutline onClick={() => setPopupVisible(true)} />
                </Grid.Item>
            </Grid>
            {
                popupVisible
                &&
                <Popup bodyClassName={style.popupBody} visible onMaskClick={() => setPopupVisible(false)}>
                    <Space align='end'>
                        <img src={details.mainPic.split(',')[0]} alt="" />
                        <>
                            <span className={style.price}>￥{details.price}</span><br />
                            已选: {selectedStr}
                        </>
                    </Space>
                    <div style={{ margin: '.3rem' }}>
                        <h3>颜色</h3>
                        <CapsuleTabs onChange={color => onSelect({ ...selected, color })}>
                            {
                                colors.map((color, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <CapsuleTabs.Tab title={color} key={color} />
                                        </React.Fragment>
                                    )
                                })
                            }
                        </CapsuleTabs>
                    </div>
                    <div style={{ margin: '.3rem' }}>
                        <h3>尺码</h3>
                        <CapsuleTabs onChange={size => onSelect({ ...selected, size })}>
                            {
                                sizes.map((size, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <CapsuleTabs.Tab title={size} key={size} />
                                        </React.Fragment>
                                    )
                                })
                            }
                        </CapsuleTabs>
                    </div>
                    <div className={style.stepper}>
                        <h3>数量</h3>
                        <Stepper
                            defaultValue={1}
                            min={1}
                            onChange={count => onSelect({ ...selected, count })}
                        />
                    </div>
                    <div className='footer'>
                        <Button block onClick={() => setPopupVisible(false)}>关闭</Button>
                        <Button block onClick={onSave} color='danger'>立即购买</Button>
                    </div>
                </Popup>
            }
        </div>
    )
}
