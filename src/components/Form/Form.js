import React from 'react';
import users from '../../api/users';
import Todolist from '../Todolist/Todolist';


function Form(props) {
  const {
    firstState,
    buttonClick,
    addUser,
    addToDo
  } = props;

    return (
      <form onSubmit={buttonClick} className="ui form">
        <input className="field" type="text" onChange={addToDo} value={firstState.taskUser} className="input"/>
        <span>{firstState.error}</span>
        <p>
          <span>Users:</span>
          <select
            onChange={addUser}
            value={firstState.selectUser}
            role="listbox" aria-expanded="false" className="ui fluid selection dropdown" tabIndex="0">
            <option>Choose a person</option>
            {firstState.usersSelected.map(item => <option>{item.name}</option>)}
          </select>
          <span>{firstState.error}</span>
          <button type="submit" className="ui primary button">
            Add
          </button>
        </p>
        <Todolist state={firstState} />
      </form>

    );
}

export default Form;
