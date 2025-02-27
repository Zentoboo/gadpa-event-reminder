import React, { useState, useEffect } from 'react';
import './App.css';
import ReminderForm from './components/ReminderForm';
import ReminderList from './components/ReminderList';

function App() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReminder, setEditingReminder] = useState(null);

  const API_URL = 'http://localhost:5000/api/reminders';

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setReminders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reminders:', error);
      setLoading(false);
    }
  };

  const addReminder = async (reminder) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reminder),
      });

      if (response.ok) {
        const newReminder = await response.json();
        setReminders([...reminders, newReminder]);
      }
    } catch (error) {
      console.error('Error adding reminder:', error);
    }
  };

  const updateReminder = async (id, updatedReminder) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReminder),
      });

      if (response.ok) {
        const updated = await response.json();
        setReminders(
          reminders.map((reminder) => (reminder.id === id ? updated : reminder))
        );
        setEditingReminder(null);
      }
    } catch (error) {
      console.error('Error updating reminder:', error);
    }
  };

  const deleteReminder = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setReminders(reminders.filter((reminder) => reminder.id !== id));
      }
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  const startEditing = (reminder) => {
    setEditingReminder(reminder);
  };

  return (
    <div className="app-container">
      <h1>Reminder App</h1>
      <ReminderForm 
        addReminder={addReminder} 
        editingReminder={editingReminder}
        updateReminder={updateReminder}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ReminderList
          reminders={reminders}
          onDelete={deleteReminder}
          onEdit={startEditing}
        />
      )}
    </div>
  );
}

export default App;