# 实例化

```
interface QilinConfig {
  middlewares?: Middleware[]
  initialState?: object
  initialReducer?: QilinMutations
}

const Qilin = new qilin(config: QilinConfig)
```

- `middlewares`
  redux 中间件
- `initialState`
  初始化 state
- `initialReducer`
  初始化 reducer

## 示例

```
const Qilin = new qilin({
  initialState: {},
  middlewares: [routerMiddleware(history)],
  initialReducer: {
    router: connectRouter(history)
  }
})
```
