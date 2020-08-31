import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Qilin } from '../modules'
const { fetch } = Qilin.getAction('tests')

const HooksTests = () => {
  const { list } = useSelector((state: any) => state.tests)

  useEffect(() => {
    fetch({ page: 3 })
  }, [])

  return (
    <div>
      <nav>
        <Link to={'/posts'}>class 组件</Link>
        <Link to={'/posthooks'}>hooks 组件</Link>
      </nav>

      {list.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}

      <div>
        <button onClick={() => fetch({ page: 3 })}>第三页</button>
        <button onClick={() => fetch({ page: 4 })}>第四页</button>
      </div>
    </div>
  )
}

export default HooksTests
