import { Middleware, Reducer, Action } from 'redux'
import { Saga, SagaMiddleware } from 'redux-saga'
import { AnyAction } from 'redux'

export interface IAction extends Action {
  payload: any
}

export interface IActions {
  [key: string]: Function
}

export type IReducer<S = any, A = IAction> = (state: S | undefined, action: A) => S

export interface QilinMutations {
  [key: string]: IReducer
}

export interface QilinConfig {
  middlewares?: Middleware[]
  initialState?: object
  initialReducer?: QilinMutations
}

export interface SagasCommandMap {
  put: <A extends AnyAction>(action: A) => any
  call: Function
  select: Function
  take: Function
  cancel: Function
  actions: {
    [key: string]: Function
  }
  [key: string]: any
}

export interface QilinSagas {
  [key: string]: (sagas: SagasCommandMap, action: AnyAction) => void
}
export interface QilinModule {
  name: string
  mutations?: QilinMutations
  sagas?: QilinSagas
  actions?: IActions
}

export { SagaMiddleware }
