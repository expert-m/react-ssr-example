import React, { Component } from 'react'
import { UserList } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class Home extends Component {
  static fetchData({ dispatch }) {
    return Promise.all([
      dispatch(UserList.get()),
    ])
  }

  componentDidMount() {
    if (!this.props.loading && !this.props.value) {
      this.props.getUserList()
    }
  }

  render() {
    const { value } = this.props

    return (
      <div>
        {value && value.map((user, index) => (
            <div key={index}>{user.email}</div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  value: state.value,
})

const mapDispatchToProps = (dispatch) => ({
  getUserList: bindActionCreators(UserList.get, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
