import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { UserListReducer } from './reducers'


export default function configureStore(initialState = {}) {
  return createStore(
    UserListReducer.$reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  )
}
