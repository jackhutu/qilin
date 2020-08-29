# 实例方法

const Qilin = new qilin()

## addModule

添加 modules

```
Qilin.addModule({
  name: 'tests',
  state: {
    list: []
  },
  actions: {},
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
})
```

### `name`

命名空间

### `state`

state 初始值

### `actions`

可选, 默认为空

### `mutations`

key 为 action 收集值, value 为 recuder 处理 function, 由于内置 immer, 写法直接赋值既可

```
update: (state, { payload: { list } }) => (state.list = list)
```

### `sagas`

key 为 action 收集值, value 为对应的 saga 函数, Qilin 自动 watch, 类型暂时只有 takeEvery

```
fetch({ call, put, actions: { update } }, { payload: { page } }) {
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
```

参数值 call, put 为 redux-saga 原有方法, actions 格式为

```
{
  // 当前module下的action
  update,
  moduleName:{
    key,
    ....
  }
}
```

所以 put(action)即可触发相应 action

## createStore

生成 store

## mapDispatchToProps

提供给 connect 的第二个参数, 包含每个模块下的 actions

```
export default connect(mapStateToProps, Qilin.mapDispatchToProps)(TestsComponent)
```

## getAction

获取对应模块下的 actions, 参数为 module.name

```
const postAction = Qilin.getAction('posts')
```

## bindActionCreators

redux bindActionCreators 方法

## produce

immer produce 方法
