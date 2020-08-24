import { QilinModule } from './types'
import * as sagaEffects from 'redux-saga/effects'

export function createSaga(module: QilinModule, actions: Object) {
  const arr = []
  const sagas = module.sagas
  if (sagas) {
    Object.keys(sagas).map((key: string) => {
      let watcher = function*() {
        yield sagaEffects.takeEvery(key, sagas[key], handleSagaParams(module, actions))
      }
      arr.push(sagaEffects.fork(watcher))
    })
  }

  return arr
}

function handleSagaParams(module: QilinModule, actions: Object) {
  if (actions[module.name]) {
    actions = Object.assign(actions, actions[module.name])
  }
  return { ...sagaEffects, actions }
}
