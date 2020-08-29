# 与 dva 的异同

### 相同之处

都省去了 action 函数, 而每个 saga 和 reducer 函数对应的 key 实际是长这样 `{namespce}/key`,

### dva 的处理方式

dva 为了准确触发相应函数, effects 中的 put 方法是经过包装后的, 而非 redux-saga 原生提供的, 内部实际要将 type 转成`{namespace}/fetch`

```
yield put({ type: 'fetch', payload: { page } });
```

而在组件中的 dispatch, 只能使用用写全 type 方式:

```
dispatch({
  type: 'users/patch',
  payload: { id, values },
});
```

### qilin 的处理方式

qilin 采用了推导 action 的方式, 虽然不写 action 函数, 但是内部推导全部 actions, 并提供 mapDispatchToProps, getActions 两种方式, 方便触发 dispatch, saga 内部也返回了全部 action.

相比之下实现更为简洁, 代码量更少.
