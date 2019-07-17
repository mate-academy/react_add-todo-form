import React from 'react';

import users from './api/users';
import todos from './api/todos';

import TodoItem from './TodoItem';
import NewTodo from './NewTodo';

class TodoList extends React.Component {
  state = {
    todos: [],
  }

  async componentDidMount() {
    const todosWithUser = todos.map((todo, index) => ({
      id: index + 1,
      ...todo,
      user: users.find(user => todo.userId === user.id),
    }));

    this.setState({
      todos: todosWithUser,
    });
  }

  AddTodo = (todo) => {
    this.setState(({ todos }) => {
      const copiedTodos = [...todos, todo];

      return {
        todos: copiedTodos,
      };
    }

    );
  }

  render() {
    const { todos } = this.state;
    return (
      <div>
        <NewTodo todos={todos} onSubmit={this.AddTodo} />
        <table className='table table-bordered'>
          <thead className='thead-dark'>
            <tr>
              <th>
                #
              </th>
              <th>
                Completed
              </th>
              <th>
                Title Post
              </th>
              <th>
                Name user
              </th>
            </tr>
          </thead>
          {todos.map(todo => (<TodoItem key={todo.id} todo={todo} />))}
        </table>
      </div>
    )
  }
};

export default TodoList
