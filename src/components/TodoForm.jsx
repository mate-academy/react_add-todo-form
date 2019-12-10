import React from 'react';
import TodosList from './TodosList/TodosList';
import FormSubmit from './FormSubmit/FormSubmit';

import users from '../api/users';
import todos from '../api/todos';

class TodoForm extends React.Component {
  state = {
    todos: todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    })),
    users,
  }

  handlerSubmitForm = (newPost) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          id: prevState.todos[prevState.todos.length - 1].id + 1,
          ...newPost,
          user: users.find(user => user.id === +newPost.selectedUser),
        },
      ],
    }));
  }

  render() {
    const { users, todos } = this.state;

    return (
      <div className="TodoForm">
        <FormSubmit onAdd={this.handlerSubmitForm} users={users} />
        <TodosList todos={todos} />
      </div>
    );
  }
}
export default TodoForm;
