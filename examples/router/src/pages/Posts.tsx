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
  render() {
    const {
      list,
      tests: { fetch }
    } = this.props

    return (
      <div>
        <Link to={'/posthooks'}>跳转到posthooks</Link>
        <button onClick={() => fetch({ page: 1 })}>第一页(Component)</button>
        <button onClick={() => fetch({ page: 2 })}>第二页(Component)</button>
        {list.map(item => (
          <div key={item.id}>{item.title}</div>
        ))}
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
