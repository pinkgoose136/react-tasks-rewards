import React from 'react';

function BottomNavBar({ selectedTab, onTabChange }) {
  return (
    <div style={styles.navBar}>
      <button onClick={() => onTabChange('tasks')} style={selectedTab === 'tasks' ? styles.activeButton : styles.button}>
        Задания
      </button>
      <button onClick={() => onTabChange('rewards')} style={selectedTab === 'rewards' ? styles.activeButton : styles.button}>
        Награды
      </button>
    </div>
  );
}

const styles = {
  navBar: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#1A1A1D',
    padding: '10px 0',
    color: 'white',
    borderTop: '1px solid #333',
  },
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '10px',
    transition: 'color 0.3s',
  },
  activeButton: {
    color: '#1F618D',
    fontWeight: 'bold',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '10px',
    transition: 'color 0.3s',
  },
};

export default BottomNavBar;
