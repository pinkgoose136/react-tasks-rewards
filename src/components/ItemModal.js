import React from 'react';

function ItemModal({ item, type, onClose, onAction, onEditClick, onDeleteClick }) {
  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-header">
          <button className="icon-button" onClick={() => { onEditClick(); onClose(); }}>
            ✏️
          </button>
          <button className="icon-button" onClick={onDeleteClick}>
            🗑️
          </button>
        </div>
        <h2>{item.name}</h2>
        <p>Цена: {item.price} баллов</p>
        <button className="action-button" onClick={() => onAction(type, item.id)}>
          {type === 'task' ? 'Выполнено' : 'Купить'}
        </button>
        <button className="close-button" onClick={onClose}>Закрыть</button>
      </div>
    </>
  );
}

export default ItemModal;
