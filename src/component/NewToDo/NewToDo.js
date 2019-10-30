import React, { Component } from 'react';
import UserOption from '../UserOption/UserOption';
import './newtodo.css'

export default class NewToDo extends Component {

  render() {
    const {
            users,
            select,
            changeInput,
            addItem,
            value,
            valid,
            isValidToDo
          } = this.props;

    const err = isValidToDo ? `` : isValidToDo === false ? `err` : ``;

    const errMessage = isValidToDo ? ``
    : isValidToDo === false ? `Enter correct todo value`
    : `Dont add todo nothing`;

    return (
      <form className="col-sm-12">
        <select className="form-control mb-3" onChange={select}>
          <option value="0">Choose a user</option>
          {users.map(user => <UserOption user={user.name} key={user.id} id={user.id}/>)}
        </select>
        <div className="input-group d-flex align-items-center">
          <label htmlFor="todoItem" className="col-sm-1 px-0 mb-0">
            Enter your "todo"
          </label>
          <input type="text" name="todoItem" id="todoItem"
          className={`form-control col-sm-9 ${err}`}
          placeholder={errMessage}
          onChange={changeInput}
          value={value}
          disabled = {!valid}/>
          <button className="btn btn-dark col-sm-2 ml-3" onClick={addItem}>Add</button>
        </div>
      </form>
    );
  }
}
