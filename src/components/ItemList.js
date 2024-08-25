import React from 'react';

function ItemList({ items, onItemClick }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onItemClick(item)}>
          <span>{item.name}</span>
          <span>{item.price} баллов</span>
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
