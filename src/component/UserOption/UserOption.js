import React, { Component } from 'react';

export default class UserOption extends Component {

  render() {
    const { user, id } = this.props;

    return (
      <option value={id}>{user}</option>
    );
  }
}
