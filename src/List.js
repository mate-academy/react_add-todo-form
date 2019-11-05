import React from 'react';

function List (list) {
  return (
    <ul>
      {list.item.map( (item, index) => <li key={index}>{item}</li>)}
    </ul>
  )
}

export default List;

