import React from 'react';

import './App.css';
import todos from './api/todos';
import users from './api/users';
import TodoList from './TodoList';
import NewTodo from './NewTodo';

const getUser = userId => users.find(user => user.id === userId);

function getTodoWithUsers(ListOfTodo) {
  return ListOfTodo.map(todo => (
    {
      ...todo,
      user: getUser(todo.userId),
    }));
}

class App extends React.Component {
  state = {
    todoList: getTodoWithUsers(todos),
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todoList: [...prevState.todoList, todo],
    }));
  };

  render() {
    const { todoList } = this.state;

    return (
      <div className="wrapper">
        <main className="ui segment">
          <div className="addTodo">
            <h1>Static list of todos</h1>
            <NewTodo
              users={users}
              todos={todoList}
              addTodo={this.addTodo}
            />
          </div>
          <TodoList
            todos={todoList}
          />
        </main>
      </div>
    );
  }
}

export default App;
