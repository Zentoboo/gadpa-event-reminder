import React, { useState, useEffect } from 'react';
import './App.css';
import ReminderForm from './components/ReminderForm';
import ReminderTable from './components/ReminderTable';

function App() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReminder, setEditingReminder] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api/reminders';

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      setReminders(data);
    } catch (error) {
      console.error('Error fetching reminders:', error);
      setError('Failed to load reminders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const addReminder = async (reminder) => {
    try {
      setError(null);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reminder),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add reminder');
      }

      const newReminder = await response.json();
      setReminders([...reminders, newReminder]);
      return true;
    } catch (error) {
      console.error('Error adding reminder:', error);
      setError(error.message || 'Failed to add reminder');
      return false;
    }
  };

  const updateReminder = async (id, updatedReminder) => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReminder),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update reminder');
      }

      const updated = await response.json();
      setReminders(
        reminders.map((reminder) => (reminder.id === id ? updated : reminder))
      );
      setEditingReminder(null);
      return true;
    } catch (error) {
      console.error('Error updating reminder:', error);
      setError(error.message || 'Failed to update reminder');
      return false;
    }
  };

  const deleteReminder = async (id) => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete reminder');
      }

      setReminders(reminders.filter((reminder) => reminder.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting reminder:', error);
      setError(error.message || 'Failed to delete reminder');
      return false;
    }
  };

  const startEditing = (reminder) => {
    setEditingReminder(reminder);
  };

  const cancelEditing = () => {
    setEditingReminder(null);
  };

  return (
    <div className="app-container">
      <h1>Reminder App</h1>
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
      
      <ReminderForm 
        addReminder={addReminder} 
        editingReminder={editingReminder}
        updateReminder={updateReminder}
        cancelEditing={cancelEditing}
      />
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ReminderTable
          reminders={reminders}
          onDelete={deleteReminder}
          onEdit={startEditing}
        />
      )}
    </div>
  );
}

export default App;