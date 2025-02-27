import React from 'react';
import ReminderItem from './ReminderItem';

function ReminderList({ reminders, onDelete, onEdit }) {
  if (reminders.length === 0) {
    return <p className="no-reminders">No reminders found. Add one!</p>;
  }

  return (
    <div className="reminder-list">
      <h2>Your Reminders</h2>
      <table>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Deadline</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reminders.map((reminder) => (
            <ReminderItem 
              key={reminder.id} 
              reminder={reminder} 
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReminderList;