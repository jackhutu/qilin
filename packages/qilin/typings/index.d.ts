import * as saga from 'redux-saga'
import produce from 'immer'
import { QilinConfig, QilinModule, QilinMutations, QilinSagas, SagaMiddleware } from './types'
import { Middleware, bindActionCreators, Store } from 'redux'
declare class Qilin {
  modules: any[]
  config: QilinConfig
  middlewares: Middleware[]
  rootReducers: object
  rootSagas: any[]
  sagaMiddleware: SagaMiddleware
  actions: Object
  mapDispatchToProps: Function
  constructor(config?: QilinConfig)
  init(): void
  prefix(mutations: QilinMutations | QilinSagas, name: string, type: string): any
  preHandleModule(module: QilinModule): QilinModule
  addModule(module: QilinModule): QilinModule
  createReducer(mutations: QilinMutations, initialState: any): (state: any, action: any) => any
  mapDispatch: Object
  createMapdispatch(store: any): void
  getAction(name: string): any
  parseModule(): void
  createStore(): Store
}
export default Qilin
export { bindActionCreators }
export { saga }
export { produce }
