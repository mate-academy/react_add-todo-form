import React from 'react';

function List (list) {
  return (
    <ul>
      {list.item.map( item => <li>{item}</li>)}
    </ul>
  )
}

export default List;

