import React from 'react'
import { connect } from 'react-redux'
import { Qilin } from '../modules'
import { Link } from 'react-router-dom'

interface TestsProps {
  list: any[]
  tests?: {
    fetch: Function
  }
}

class TestsComponent extends React.Component<TestsProps> {
  componentDidMount() {
    const {
      tests: { fetch }
    } = this.props
    fetch({ page: 1 })
  }

  render() {
    const {
      list,
      tests: { fetch }
    } = this.props

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
          <button onClick={() => fetch({ page: 1 })}>第一页</button>
          <button onClick={() => fetch({ page: 2 })}>第二页</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    list: state.tests.list
  }
}

export default connect(mapStateToProps, Qilin.mapDispatchToProps)(TestsComponent)
