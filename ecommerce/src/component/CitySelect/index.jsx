import React from 'react'
import { IndexBar, List } from 'antd-mobile'
import cities from './city'

export default function CitySelect(props) {
    const { getCityName } = props
    //选中城市
    const selectCity = name => {
        getCityName && getCityName(name)
    }
    return (
        <div style={{ height: window.innerHeight }}>
            <IndexBar>
                {
                    cities.map(city => {
                        const [title, data] = city
                        return (
                            <IndexBar.Panel
                                index={title}
                                title={`${title}`}
                                key={`${title}`}
                            >
                                <List>
                                    {data.map((item, index) => (
                                        <List.Item key={index} onClick={ () => selectCity(item.name) }>{item.name}</List.Item>
                                    ))}
                                </List>
                            </IndexBar.Panel>
                        )
                    })}
            </IndexBar>
        </div>
    )
}
