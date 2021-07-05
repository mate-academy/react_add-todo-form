import React from 'react';

import './App.css';
import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

function userListofTodo(ListOfTodo) {
  const userInfo = userId => users.find(user => user.id === userId);

  return ListOfTodo.map(list => (
    {
      ...list,
      user: userInfo(list.userId),
    }));
}

class App extends React.Component {
  state = {
    todoList: userListofTodo(todos),
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todoList: [...prevState.todoList, todo],
    }));
  };

  render() {
    const { todoList } = this.state;

    return (
      <div>
        <div className="box">
          <h1>Add todo form</h1>
          <p>
            <span>Users: </span>
            {users.length}
          </p>
          <NewTodo
            users={users}
            todos={todoList}
            addTodo={this.addTodo}
          />
        </div>
        <TodoList
          todos={todoList}
        />
      </div>
    );
  }
}

export default App;
