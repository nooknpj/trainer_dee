import React, { Component } from 'react'

export class MyAccount extends Component {
  render() {
    return (
      <div>
        <span>My user id is </span>
        <span> {localStorage.getItem("userID")} </span>
        
      </div>
    )
  }
}


export default MyAccount
