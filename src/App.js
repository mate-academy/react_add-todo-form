import React from 'react';

// import users from './api/users';
// import todosApi from './api/todos';

import TodoList from './components/TodoList/TodoList';

export default class App extends React.Component {
  state = {
  };

  render() {
    // const { TodoList } = this.state;

    return (
      <div>
        <TodoList Todo={TodoList} />
      </div>
    );
  }
}
