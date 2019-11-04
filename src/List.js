import React from 'react';

function List (list) {
  console.log(list.item)
  return (
    <ul>
      {list.item.map( item => <li>{item}</li>)}
    </ul>
  )
}

export default List;

