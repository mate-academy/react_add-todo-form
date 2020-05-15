import React, { Component } from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component {

  render() {

    const { toDo, user, id} = this.props;

    return (
      <div className="col mb-2">
    <div className="card">
      <div className="card-body">
        <h6 className="card-title">№ {id}</h6>
        <h5 className="card-title">{user}</h5>
        <h5 className="card-text">{toDo}</h5>
      </div>
    </div>
  </div>
    );
  };
}

