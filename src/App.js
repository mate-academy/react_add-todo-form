import React from 'react';
import TodoList from './components/TodoList/TodoList';
import NewTodo from './components/NewTodo/NewTodo';

import todos from './api/todos';
import users from './api/users';

function getTodosWithUsers(todosList, usersList) {
  return todosList.map(todo => ({
    ...todo,
    user: usersList.find(user => user.id === todo.userId),
  }));
}

const preparedTodos = getTodosWithUsers(todos, users);

class App extends React.Component {
  state = {
    todosList: [...preparedTodos],
  };

  handleAddTodo = ({ userId, title }) => {
    this.setState(prevState => ({
      todosList: [
        ...prevState.todosList,
        {
          userId: +userId,
          id: prevState.todosList.length + 1,
          title,
          completed: false,
          user: users.find(u => u.id === +userId),
        },
      ],
    }));
  };

  render() {
    const { todosList } = this.state;

    return (
      <div>
        <NewTodo onAdd={this.handleAddTodo} />
        <TodoList todos={todosList} />
      </div>
    );
  }
}

export default App;
