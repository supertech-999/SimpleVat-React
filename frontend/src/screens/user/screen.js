import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
  })
}

class User extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      
    }

  }

  render() {

    return (
      <div className="user-screen">
        <div className="animated fadeIn">
          <h1>User Screen</h1>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
