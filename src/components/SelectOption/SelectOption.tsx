import React, { ChangeEvent } from 'react';

import { useState } from 'react';

type Props = {
  selectName: string[];
};

export const SelectOption: React.FC<Props> = ({ selectName }) => {
  const [userName, setUserName] = useState('');
  const [hasSelectError, setHasSelectError] = useState(true);

  const handleSelectCahnge = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.target.value);
    setHasSelectError(false);
  };

  // console.log(selectName);
  // const personName = selectName.map(person => selectName.person);

  // console.log(personName);

  return (
    <div className="field">
      <label htmlFor="user-id">User:</label>
      <select
        id="user-id"
        data-cy="userSelect"
        required
        value={userName}
        onChange={handleSelectCahnge}
      >
        <option value="" disabled>
          Choose a user
        </option>

        {selectName.map((name, index) => (
          <option value={name} key={index}>
            {name}
          </option>
        ))}
      </select>
      {hasSelectError && <span className="error">Please choose a user</span>}
    </div>
  );
};
