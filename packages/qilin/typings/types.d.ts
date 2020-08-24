import { Middleware, Action } from 'redux'
import { Saga, SagaMiddleware } from 'redux-saga'
export interface IAction extends Action {
  payload: any
}
export interface IActions {
  [key: string]: Function
}
export declare type IReducer<S = any, A = IAction> = (state: S | undefined, action: A) => S
export interface QilinMutations {
  [key: string]: IReducer
}
export interface QilinConfig {
  middlewares?: Middleware[]
  initialState?: object
  initialReducer?: QilinMutations
}
export interface QilinSagas {
  [key: string]: Saga
}
export interface QilinModule {
  name: string
  mutations?: QilinMutations
  sagas?: QilinSagas
  actions?: IActions
}
export { SagaMiddleware }
