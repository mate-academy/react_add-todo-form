import React from 'react';
import './App.css';

import users from './api/users';
import itemsTodo from './api/itemsTodo';
import TodoList from './components/TodoList/TodoList';
import AddTodoItem from './components/AddTodoItem/AddTodoItem';

class App extends React.Component {
  state = {
    itemsTodo: itemsTodo.map(todo => ({
      ...todo,
      person: users.find(user => user.id === todo.userId),
    })),
  }

  addNewTodo = (todo) => {
    this.setState(state => ({
      itemsTodo: [...state.itemsTodo, todo],
    }));
  };

  toggleComplete = (id) => {
    this.setState(prevState => ({
      itemsTodo: prevState.itemsTodo.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  render() {
    return (
      <div>
        <AddTodoItem
          users={users}
          id={itemsTodo.length + 1}
          addNewTodo={this.addNewTodo}
        />
        <TodoList
          itemsTodo={this.state.itemsTodo}
          toggleComplete={this.toggleComplete}
        />
      </div>
    );
  }
}

export default App;
