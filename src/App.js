import React, { useState, useReducer } from 'react';
import './App.css';

import { AddTodoForm } from './components/AddTodoForm';
import { SelectUser } from './components/SelectUser';
import { TodoList } from './components/TodoList';
import { reducer } from './reducer';

import users from './api/users';
import { todos } from './api/todos';

const fullTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

const defaultState = {
  selectedUserId: 0,
  todoList: fullTodos,
  selectMessage: '',
  inputMessage: '',
};

function App() {
  const [inputText, setInputText] = useState('');
  const [state, dispatch] = useReducer(reducer, defaultState);

  const changeInputText = (value) => {
    if (state.selectMessage) {
      setInputText('');
    } else {
      setInputText(value);
    }
  };

  const addTodo = (e) => {
    e.preventDefault();

    dispatch({
      type: 'ADD_TODO', payload: inputText,
    });
    setInputText('');
  };

  const handleFocusInput = () => {
    if (state.selectedUserId === 0) {
      dispatch({
        type: 'SHOW_SELECT_MESSAGE', payload: 'Please Choose a User',
      });
    } else {
      dispatch({
        type: 'SHOW_SELECT_MESSAGE', payload: '',
      });
      dispatch({ type: 'CLEAR_INPUT_MESSAGE' });
    }
  };

  const selectUser = (selectedUserId) => {
    dispatch({
      type: 'SELECT_USER', payload: Number(selectedUserId),
    });
  };

  return (
    <div className="App">
      <h1 className="App-title">Add todo form</h1>
      <div className="App-form">
        <SelectUser
          selectedUserId={state.selectedUserId}
          selectUser={selectUser}
          users={users}
          selectMessage={state.selectMessage}
        />
        <div className="selectMessage">{state.selectMessage}</div>

        <AddTodoForm
          addTodo={addTodo}
          inputText={inputText}
          changeInputText={changeInputText}
          handleFocusInput={handleFocusInput}
          selectedUserId={state.selectedUserId}
          inputMessage={state.inputMessage}
        />
        <div className="inputMessage">{state.inputMessage}</div>
      </div>

      <TodoList todoList={state.todoList} />
    </div>
  );
}

export default App;
