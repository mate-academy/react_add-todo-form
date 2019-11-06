import React from 'react';
import users from '../../api/users';
import Todolist from '../Todolist/Todolist';


function Form(props) {
  const {state,
    listOfUsers,
    usersSelected,
    selectUser,
    taskUser,
    error,
    name,
    task,
    buttonClick,
    addUser,
    addToDo} = props;

    return (
      <form onSubmit={buttonClick} className="ui form">
        <input className="field" type="text" onChange={addToDo} value={taskUser} className="input"/>
        <span>{error}</span>
        <p>
          <span>Users:</span>
          <select
            onChange={addUser}
            value={selectUser}
            role="listbox" aria-expanded="false" className="ui fluid selection dropdown" tabIndex="0">
            <option>Choose a person</option>
            {usersSelected.map(item => <option>{item.name}</option>)}
          </select>
          <span>{error}</span>
          <button type="submit" className="ui primary button">
            Add
          </button>
        </p>
        <Todolist state={state} />
      </form>

    );
}

export default Form;
