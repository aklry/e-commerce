import React, { useRef, useState } from 'react'
import { CheckList, Dropdown } from 'antd-mobile'
import style from './index.module.css'
import { FilterOutline } from 'antd-mobile-icons'

export default function Filter() {
    const [filters, setFilters] = useState({ price: ['0'], sale: false }) //保存所有过滤条件
    const dropdownRef = useRef(null)
    //当综合、价格排序发生变化时
    const onPriceChange = value => {
        //保存价格属性，并将销量排序初始化
        setFilters({ ...filters, price: value, sale: false })
        dropdownRef.current.close() //隐藏下拉菜单
    }
    //当销量发生变化时
    const onSaleChange = () => {
        //保存销量属性，并并将价格排序初始化
        setFilters({ ...filters, sale: !filters.sale, price: ['0'] })
    }
    //点击筛选
    const onMoreFilter = () => {

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
        </div>
    )
}
