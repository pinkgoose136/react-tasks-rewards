import React, { useState, useEffect } from 'react';

function AddItemModal({ type, onClose, onSave, editItem }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setPrice(editItem.price);
    }
  }, [editItem]);

  const handleSave = () => {
    onSave(type, name, price, editItem ? editItem.id : null);
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal">
        <h2>{editItem ? 'Редактировать' : 'Добавить'} {type === 'task' ? 'задание' : 'награду'}</h2>
        <input
          type="text"
          placeholder="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Цена"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={handleSave}>
            {editItem ? 'Сохранить изменения' : 'Сохранить'}
          </button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </>
  );
}

export default AddItemModal;
