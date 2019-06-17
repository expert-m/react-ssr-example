import { ReducerClass } from 'redux-class-decorators'

@ReducerClass('UserList')
class UserListReducer {
  static initialState = {
    loading: false,
    value: null,
  }

  static $reducer

  static start(state, action) {
    return {
      ...state,
      loading: true,
      value: action.payload,
    }
  }

  static finish(state, action) {
    return {
      ...state,
      loading: false,
      value: action.payload,
    }
  }
}

export {
  UserListReducer,
}
