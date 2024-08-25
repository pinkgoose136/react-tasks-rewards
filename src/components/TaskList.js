import React from 'react';

function ItemList({ items, onItemClick, onEditClick, onDeleteClick }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <span onClick={() => onItemClick(item)}>{item.name}</span>
          <div>
            <button className="icon-button" onClick={() => onEditClick(item)}>
              <i className="icon">✏️</i>
            </button>
            <button className="icon-button" onClick={() => onDeleteClick(item.id)}>
              <i className="icon">🗑️</i>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
