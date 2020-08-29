# 数据流

数据流的简化方案基于 redux, redux-saga

## 传统方案

通常我们定义一系列的 action 函数, reducer 函数, 然后定义一些 type 常量, action 函数一个 FSA 对象, 通过 type 来定位处理的 reducer 方法, 如果用 redux-saga 来处理副作用, 还会有一些 saga 函数, 下面是一个典型的目录结构

```
|-----acttions  // action函数
|-----reducers  // reducers 状态改变处理
|-----sagas     // 副作用处理
|-----store
|--------createStore.js  // 生成store
```

当然你也可以根据业务模块划分, 甚至写在同一个文件中, 但是整个过程仍然显得繁琐, 而实际上我们经常改动的副作用处理和状态改变处理.

## 简化方案

从上面可以看出 action 和 reducer, sagas 函数几乎是一一对应的, 我们可以省去 action 函数的定义, 使用方法如下:

#### 定义 modules

```
export default {
  name: 'posts',
  state: {
    list: []
  },
  mutations: {
    update: (state, { payload: { list } }) => (state.list = list)
  },
  sagas: {
    *fetch({ call, put, actions: { update } }, { payload: { page } }) {
      try {
        const { data } = yield call(fetchPost, { page })
        yield put(
          update({
            list: data
          })
        )
      } catch (err) {
        console.log(err)
      }
    }
  }
}
```

- `name` 每个 modules 的命名空间
- `state` 初始 state
- `mutations` 对应 reducer 状态处理函数, 由于内置 immer 这里称为 mutations
- `sagas` 副作用处理函数
  上面省略了 actions 函数, 但经过 qilin 处理后, 最终会生成 actions

#### 添加模块, 生成 store

```
import qilin from 'qilin'
import posts from './posts'
const Qilin = new qilin()

Qilin.addModule(posts)

const store = Qilin.createStore()

export default store
```

初始 qilin, 模块经过处理, 生成 store

#### class 组件使用

```
import { connect } from 'react-redux'
import { Qilin } from '../modules'

class TestsComponent extends React.Component<TestsProps> {
  render() {
    const {
      list,
      posts: { fetch }
    } = this.props

    return (
      <div>
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
    list: state.posts.list
  }
}

export default connect(mapStateToProps, Qilin.mapDispatchToProps)(TestsComponent)
```

- `Qilin.mapDispatchToProps` 生成 store 后, qilin 会生成 mapDispatchToProps, 传入 connect, 则在 props 中可以调用每一个 actions 方法

##### hooks 组件调用

```
import { useSelector } from 'react-redux'
import { Qilin } from '../modules'
const { fetch } = Qilin.getAction('posts')

const HooksTests = () => {
  const {list} = useSelector((state: any) => state.posts)
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
```

- `Qilin.getAction` 生成 store 后, 可通过 getAction 获取每个模块的 action 函数

这些 action 函数都经过了 bindActionCreators 包装, 省去了 dispatch({type: ...})的过程
