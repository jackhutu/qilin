import createSagaMiddleware, * as saga from 'redux-saga'
import { all } from 'redux-saga/effects'
import { separator, isFunction, isArray } from './utils'
import warning from 'tiny-warning'
import invariant from 'tiny-invariant'
import produce from 'immer'
import { QilinConfig, QilinModule, QilinMutations, QilinSagas, SagaMiddleware } from './types'
import {
  applyMiddleware,
  combineReducers,
  createStore as storeCreator,
  Middleware,
  compose,
  bindActionCreators,
  Store
} from 'redux'
import { createSaga } from './saga'
class Qilin {
  modules: any[] = []
  config: QilinConfig
  middlewares: Middleware[] = []
  rootReducers: object = {}
  rootSagas: any[] = []
  sagaMiddleware: SagaMiddleware
  actions: Object = {}
  mapDispatchToProps: Function
  constructor(config: QilinConfig = {}) {
    this.config = config
    this.init()
  }

  init() {
    this.sagaMiddleware = createSagaMiddleware()
    this.middlewares = [this.sagaMiddleware]
    if (this.config?.middlewares && this.config?.middlewares.length > 0) {
      invariant(
        isArray(this.config.middlewares),
        `[init] config middlewares should be array, but got ${typeof this.config.middlewares}`
      )
      this.middlewares = this.middlewares.concat(this.config.middlewares)
    }
    this.rootReducers = Object.assign(this.rootReducers, this.config.initialReducer || {})
  }

  prefix(mutations: QilinMutations | QilinSagas, name: string, type: string) {
    return Object.keys(mutations).reduce((memo: any, key) => {
      warning(
        key.indexOf(`${name}${separator}`) !== 0,
        `[preHandleModule]: ${type} ${key} should not be prefixed with name ${name}`
      )
      const newKey = `${name}${separator}${key}`
      if (!this.actions[name][key]) {
        this.actions[name][key] = (params: any) => {
          return {
            type: newKey,
            payload: {
              ...params
            }
          }
        }
      }
      invariant(
        isFunction(mutations[key]),
        `[preHandleModule] mutations and sagas should be function, but got ${typeof mutations[key]}`
      )
      memo[newKey] = mutations[key]
      return memo
    }, {})
  }

  preHandleModule(module: QilinModule) {
    const { name, mutations, sagas, actions } = module
    if (!this.actions[name]) this.actions[name] = {}
    if (actions) {
      Object.keys(actions).map(key => {
        invariant(
          isFunction(actions[key]),
          `[preHandleModule] actions should be function, but got ${typeof actions[key]}`
        )
        if (!this.actions[name][key]) {
          this.actions[name][key] = actions[key]
        }
      })
    }

    if (mutations) {
      module.mutations = this.prefix(mutations, name, 'mutation')
    }
    if (sagas) {
      module.sagas = this.prefix(sagas, name, 'sagas')
    }
    return module
  }

  addModule(module: QilinModule) {
    const preModule = this.preHandleModule(module)
    this.modules.push(preModule)
    return preModule
  }

  createReducer(mutations: QilinMutations, initialState: any) {
    return function _reducer(state = initialState, action) {
      const mutationMethod = mutations[action.type]

      if (mutationMethod) {
        const nextState = produce(state, draftState => {
          mutationMethod(draftState, action)
        })
        return nextState
      }
      return state
    }
  }

  mapDispatch: Object = {}

  createMapdispatch(store) {
    for (const module of this.modules) {
      if (this.actions[module.name]) {
        this.mapDispatch[module.name] = bindActionCreators(this.actions[module.name], store.dispatch)
      }
    }
  }

  getAction(name: string) {
    return this.mapDispatch[name]
  }

  parseModule() {
    for (const module of this.modules) {
      this.rootReducers[module.name] = this.createReducer(module.mutations, module.state)
      if (module.sagas) {
        this.rootSagas = this.rootSagas.concat(createSaga(module, this.actions))
      }
    }
  }

  createStore(): Store {
    this.parseModule()
    let combinedReducer = combineReducers(this.rootReducers)
    let sagas = this.rootSagas
    const store = storeCreator(combinedReducer, this.config.initialState, compose(applyMiddleware(...this.middlewares)))

    this.createMapdispatch(store)
    this.mapDispatchToProps = () => this.mapDispatch
    function* rootSaga() {
      try {
        yield all(sagas)
      } catch (err) {
        console.error('[ERROR] Something went wrong in rootSaga: ', err)
      }
    }

    this.sagaMiddleware.run(rootSaga)
    return store
  }
}

export default Qilin
export { bindActionCreators }
export { saga }
