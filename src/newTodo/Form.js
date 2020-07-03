import React from 'react';
import { AddUser } from './addElements/AddUser';
import { AddTitle } from './addElements/AddTitle';

const Form = (props) => {
  const { selectUser, users, giveNameTodo, letId, addToList } = props;

  return (
    <form onSubmit={letId}>
      <h1>Add Todo:</h1>

      <select onChange={selectUser} required>
        <option />
        {users.map(user => (
          <React.Fragment key={user.id}>
            <AddUser {...user} />
          </React.Fragment>
        ))}
      </select>

      <AddTitle
        giveName={giveNameTodo()}
      />

      <button
        type="submit"
        onClick={addToList}
      >
        Save
      </button>
    </form>
  )
}

export default Form;
