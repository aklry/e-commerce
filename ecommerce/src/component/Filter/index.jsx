import React, { useRef, useState } from 'react'
import { CheckList, Dropdown, Popup, Button, Selector } from 'antd-mobile'
import style from './index.module.css'
import { FilterOutline } from 'antd-mobile-icons'
import api from '../../api/product'
import { useSelector } from 'react-redux'

export default function Filter(props) {
    const [filters, setFilters] = useState({ price: ['0'], sale: false }) //保存所有过滤条件
    const [popupVisible, setPopupVisible] = useState(false) //设置筛选弹出层的显示与隐藏
    const [ options, setOptions ] = useState([])
    const dropdownRef = useRef(null)
    const selector = useSelector(state => state.searchValue.title)
    /**
     * 当过滤条件发生变化时，重新将filters赋值(并将数据传递给调用的组件)
     * @param {Object} newFilters 
     */
    const onFilterChange = newFilters => {
        setFilters(newFilters)
        props.onChange && props.onChange(newFilters)
    }
    //当综合、价格排序发生变化时
    const onPriceChange = value => {
        //保存价格属性，并将销量排序初始化
        onFilterChange({ ...filters, price: value, sale: false })
        dropdownRef.current.close() //隐藏下拉菜单
    }
    const getFilterData = async () => {
        const result = await api.getProductTypeId(selector)
        const { record } = result.data
        if (record) {
            const data = await api.getBrandByTypeId(record.id)
            setOptions(data.data.records)
        }
    }
    //当销量发生变化时
    const onSaleChange = () => {
        //保存销量属性，并将价格排序初始化
        onFilterChange({ ...filters, sale: !filters.sale, price: ['0'] })
    }
    //点击筛选
    const onMoreFilter = () => {
        setPopupVisible(true)
        //加载筛选数据
        getFilterData()
    }
    //选择品牌
    const onBrandChange = value => {
        setFilters({ ...filters, brand: value })
    }
    //清空筛选的选项
    const onClear = () => {
        setFilters({ ...filters, brand: []})
    }
    //点击确定
    const onSave = () => {
        //关闭弹出层
        setPopupVisible(false)
        props.onChange && props.onChange(filters)
    }
    return (
        <div className={style.filterContainer}>
            <Dropdown closeOnClickAway ref={dropdownRef}>
                <Dropdown.Item key='price' highlight title={['综合', '价格由低到高', '价格由高到低'][filters.price]}>
                    <CheckList onChange={onPriceChange} value={filters.price}>
                        <CheckList.Item value='0'>综合</CheckList.Item>
                        <CheckList.Item value='1'>价格由低到高</CheckList.Item>
                        <CheckList.Item value='2'>价格由高到低</CheckList.Item>
                    </CheckList>
                </Dropdown.Item>
            </Dropdown>
            <span
                className={style.filterTitle}
                onClick={onSaleChange}
                style={{ color: filters.sale ? 'var(--adm-color-light)' : '' }}
            >
                销量
            </span>
            <span
                className={style.filterTitle}
                onClick={onMoreFilter}
            >
                筛选<FilterOutline />
            </span>
            <Popup
                position='right'
                visible={popupVisible}
                bodyStyle={{ width: '80vw', background: '#f7f7f7' }}
                onMaskClick={() => setPopupVisible(false)}
            >
                <div className={style.content}>
                    <h4>品牌</h4>
                    <Selector
                        options={options}
                        value={filters.brand}
                        multiple={true}
                        onChange={onBrandChange}
                        columns={ 3 }
                    />
                </div>
                <Button block style={{ marginTop: '.1rem' }} onClick={onClear}>清除选项</Button>
                <div className='footer'>
                    <Button block onClick={() => setPopupVisible(false)}>取消</Button>
                    <Button block color='primary' onClick={onSave}>确定</Button>
                </div>
            </Popup>
        </div>
    )
}
