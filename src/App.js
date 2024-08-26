import React, { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import BottomNavBar from './components/BottomNavBar';
import ItemList from './components/ItemList';
import AddItemModal from './components/AddItemModal';
import ItemModal from './components/ItemModal';
import './styles.css';

function App() {
  const [selectedTab, setSelectedTab] = useState('tasks');
  const [modalOpen, setModalOpen] = useState(false);
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [balance, setBalance] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const savedRewards = JSON.parse(localStorage.getItem('rewards')) || [];
    const savedBalance = JSON.parse(localStorage.getItem('balance')) || 0;
    setTasks(savedTasks);
    setRewards(savedRewards);
    setBalance(savedBalance);
  }, []);

  const handleAddItem = (type, name, price, id = null) => {
    if (id) {
      // Update existing item
      if (type === 'task') {
        const updatedTasks = tasks.map(task =>
          task.id === id ? { ...task, name, price } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      } else if (type === 'reward') {
        const updatedRewards = rewards.map(reward =>
          reward.id === id ? { ...reward, name, price } : reward
        );
        setRewards(updatedRewards);
        localStorage.setItem('rewards', JSON.stringify(updatedRewards));
      }
    } else {
      // Add new item
      const newItem = { name, price, id: Date.now() };
      if (type === 'task') {
        const updatedTasks = [...tasks, newItem];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      } else if (type === 'reward') {
        const updatedRewards = [...rewards, newItem];
        setRewards(updatedRewards);
        localStorage.setItem('rewards', JSON.stringify(updatedRewards));
      }
    }
    setModalOpen(false);
    setEditItem(null);
  };

  const handleItemAction = (type, id) => {
    if (type === 'task') {
      const task = tasks.find(t => t.id === id);
      setBalance(prev => prev + Number(task.price));
      localStorage.setItem('balance', JSON.stringify(balance + Number(task.price)));
    //  const updatedTasks = tasks.filter(t => t.id !== id);
    //  setTasks(updatedTasks);
    //  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } else if (type === 'reward') {
      const reward = rewards.find(r => r.id === id);
      setBalance(prev => prev - Number(reward.price));
      localStorage.setItem('balance', JSON.stringify(balance + Number(reward.price)));
      //const updatedRewards = rewards.filter(r => r.id !== id);
      //setRewards(updatedRewards);
      //localStorage.setItem('rewards', JSON.stringify(updatedRewards));
    }
    setItemModalOpen(false);
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setModalOpen(true);
  };

  const handleDeleteItem = (type, id) => {
    if (type === 'task') {
      const updatedTasks = tasks.filter(t => t.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } else if (type === 'reward') {
      const updatedRewards = rewards.filter(r => r.id !== id);
      setRewards(updatedRewards);
      localStorage.setItem('rewards', JSON.stringify(updatedRewards));
    }
    setItemModalOpen(false);
  };

  const handleSwipe = (direction) => {
    if (direction === 'left') {
      setSelectedTab(prevTab => (prevTab === 'tasks' ? 'rewards' : 'tasks'));
    } else if (direction === 'right') {
      setSelectedTab(prevTab => (prevTab === 'rewards' ? 'tasks' : 'rewards'));
    }
  };

  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 100) {
      handleSwipe('left');
    } else if (touchEndX - touchStartX > 100) {
      handleSwipe('right');
    }
  };

  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <TopBar balance={balance} onAddClick={() => setModalOpen(true)} />
      {selectedTab === 'tasks' ? (
        <ItemList
          items={tasks}
          onItemClick={(item) => { setSelectedItem(item); setItemModalOpen(true); }}
        />
      ) : (
        <ItemList
          items={rewards}
          onItemClick={(item) => { setSelectedItem(item); setItemModalOpen(true); }}
        />
      )}
      <BottomNavBar selectedTab={selectedTab} onTabChange={setSelectedTab} />
      {modalOpen && (
        <AddItemModal
          type={selectedTab === 'tasks' ? 'task' : 'reward'}
          onClose={() => { setModalOpen(false); setEditItem(null); }}
          onSave={handleAddItem}
          editItem={editItem}
        />
      )}
      {itemModalOpen && (
        <ItemModal
          item={selectedItem}
          type={selectedTab === 'tasks' ? 'task' : 'reward'}
          onClose={() => setItemModalOpen(false)}
          onAction={handleItemAction}
          onEditClick={() => handleEditClick(selectedItem)}
          onDeleteClick={() => handleDeleteItem(selectedTab === 'tasks' ? 'task' : 'reward', selectedItem.id)}
        />
      )}
    </div>
  );
}

export default App;
