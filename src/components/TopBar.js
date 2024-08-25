import React from 'react';

function TopBar({ balance, onAddClick }) {
  return (
    <div style={styles.topBar}>
      <h1 style={styles.balance}>Баланс: {balance} баллов</h1>
      <button onClick={onAddClick} style={styles.addButton}>
        + Добавить
      </button>
    </div>
  );
}

const styles = {
  topBar: {
    padding: '10px',
    backgroundColor: '#1A1A1D',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
  },
  balance: {
    margin: '0',
    fontSize: '24px',
  },
  addButton: {
    position: 'absolute',
    top: '50%',
    right: '20px',
    transform: 'translateY(-50%)',
    backgroundColor: '#1F618D',
    border: 'none',
    padding: '10px 15px',
    color: 'white',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default TopBar;
