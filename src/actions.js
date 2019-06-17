import { ActionClass } from 'redux-class-decorators'
import { UserListReducer } from './reducers'


@ActionClass
class UserList {
  static get() {
    return (dispatch) => {
      dispatch({ type: UserListReducer.start })

      return fetch('https://reqres.in/api/users').then(
        response => response.json(),
      ).then((json) => dispatch({
        type: UserListReducer.finish,
        payload: json.data,
      }))
    }
  }
}


export {
  UserList,
}
