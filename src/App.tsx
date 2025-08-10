import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { User } from './types/User';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const App = () => {

  const getUserById = (userId:number):User => {
      const user = usersFromServer.find((user:User) => {
        return user.id === userId;
      })

      if(!user) {
        return null;
      }

      return user;
  }

  const todosInitial:Todo[] = [];
  
  todosFromServer.map((todo:Todo) => {
    todosInitial.push({
      ...todo,
      user: getUserById(todo.id)
    })
  })

  const [todos, setTodos] = useState<Todo[]>([...todosInitial]);
  
  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);

  const [option, setOption] = useState<string>('0');
  const [optionError, setOptionError] = useState<boolean>(false);

  const onReset = () => {
    setTitle('');
    setOption('0');
    setTitleError(false);
    setOptionError(false);
  }

  const handleFormReset = (event: React.FormEvent) => {
    onReset();
  }

  const addTodo = (newTodo:Todo) => {
    setTodos([...todos, newTodo]);
  }

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if(!title || title === '') {
      setTitleError(true);
    }

    if(!option || option === '0') {
      setOptionError(true);
      return;
    }

    if(title !== '' && option !== '0') {
      addTodo({
        id: todos.length,
        title: title,
        completed: false,
        userId: Number(option),
        user: getUserById(Number(option))
      })
    }
    
    onReset();

  }

  const handleChangeInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const {value} = event.target;
    
    setTitle(value);
  }

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    
    const {value} = event.target;

    setOption(value);

  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos" 
        method="POST"
        onReset={handleFormReset}
        onSubmit={handleFormSubmit}
      >
        <div className="field">

          <label htmlFor="title">Title: &#160; 
            <input 
              type="text" 
              name="title" 
              data-cy="titleInput"  
              placeholder="Enter a title" 
              value={title}
              onChange={handleChangeInputTitle}
            />
          </label>

          {
            titleError &&
              <span className="error">Please enter a title</span>
          }
        </div>

        <div className="field">
          
          <label htmlFor="select-user">User: &#160;
            <select 
              data-cy="userSelect" 
              name='select-user'
              onChange={handleChangeSelect}
              defaultValue={option}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              
              {
                  usersFromServer.map((user:User) => {
                    return(
                      <option value={user.id} key={user.id}>{user.name}</option>
                    )
                  })
              }
            
            </select>
          </label>

          {
            optionError &&
            <span className="error">Please choose a user</span>
          }
        </div>

        <input type="submit" data-cy="submitButton" value="Add" />
        &#160;&#160;
        <input type="reset" value="Reset" />
      </form>
      {
        useMemo(() => {
          return <TodoList todos={todos}/>
        }, [todos]
        )
      }
    </div>
  );
};
