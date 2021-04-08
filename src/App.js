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
    id: 3,
    todoList: [...personalTodos],
  }

  addTodo = (title, selectValue) => {
    const currentUser = users.find(user => (
      user.name === selectValue
    ));

    this.setState(state => ({
      todoList: [
        ...state.todoList,
        {
          userId: currentUser.id,
          id: state.id,
          title,
          completed: false,
          user: currentUser,
        },
      ],
      id: state.id + 1,
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
