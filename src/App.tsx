import './App.scss';
import { useState } from 'react';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { NewPost } from './components/NewPost/NewPost';
import { TodoList } from './components/TodoList';

function getNewTodoId(ts: Todo[]) {
  const maxId = Math.max(...ts.map(t => t.id));

  return maxId + 1;
}

export const App = () => {
  const [newposts, setNewpost] = useState<Todo[]>(todosFromServer);

  const addPost = (newpost: Todo) => {
    const newPost = {
      ...newpost,
      id: getNewTodoId(newposts),
    };

    setNewpost(currentPosts => [...currentPosts, newPost]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <NewPost onAdd={addPost} />

      <TodoList todos={newposts} />
    </div>
  );
};
