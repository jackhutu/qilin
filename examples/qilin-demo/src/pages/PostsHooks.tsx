import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Qilin } from '../modules'
const { fetch } = Qilin.getAction('tests')

const HooksTests = () => {
  const someReducer = useSelector((state: any) => state.tests)
  const { list } = someReducer
  return (
    <div>
      <button onClick={() => fetch({ page: 3 })}>第三页Hooks</button>
      <button onClick={() => fetch({ page: 4 })}>第四页Hooks</button>
      {list.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  )
}

export default HooksTests
