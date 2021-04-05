import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

const personalTodos = todos.map(todo => (
  {
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }
));

class App extends React.Component {
  state = {
    usersList: users,
    id: personalTodos.length,
    todoList: [...personalTodos],
  }

  addTodo = (value, selectValue) => {
    const title = value;
    const currentUser = users.find(user => (
      user.name === selectValue
    ));

    this.setState(state => ({
      id: state.id + 1,
      todoList: [
        ...state.todoList,
        {
          userId: currentUser.id,
          id: state.id + 1,
          title,
          completed: false,
          user: currentUser,
        },
      ],
    }));
  }

  render() {
    const {
      usersList,
      todoList,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <TodoForm
          usersList={usersList}
          addTodo={this.addTodo}
        />
        <TodoList todoList={todoList} />
      </div>
    );
  }
}

export default App;
