import React from 'react'
import Search from '../../component/SearchBar'
import Filter from '../../component/Filter'

export default function list() {
  return (
    <>
          <Search />
          <div className='content'>
            <Filter />
          </div>
    </>
  )
}
