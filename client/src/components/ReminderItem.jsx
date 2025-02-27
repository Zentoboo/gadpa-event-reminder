import React from 'react';

function ReminderItem({ reminder, onDelete, onEdit }) {
  // Format the deadline date for display
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Check if deadline is approaching (less than 24 hours)
  const isDeadlineApproaching = () => {
    const deadlineDate = new Date(reminder.deadline);
    const now = new Date();
    const timeDiff = deadlineDate - now;
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    
    return hoursDiff < 24 && hoursDiff > 0;
  };

  // Check if deadline is past
  const isDeadlinePast = () => {
    const deadlineDate = new Date(reminder.deadline);
    const now = new Date();
    return deadlineDate < now;
  };

  return (
    <tr className={`reminder-item ${isDeadlineApproaching() ? 'approaching' : ''} ${isDeadlinePast() ? 'past' : ''}`}>
      <td>{reminder.activity}</td>
      <td>
        {formatDate(reminder.deadline)}
        {isDeadlineApproaching() && <span className="deadline-alert"> (Soon!)</span>}
        {isDeadlinePast() && <span className="deadline-past"> (Overdue!)</span>}
      </td>
      <td>{reminder.department_responsible}</td>
      <td className="action-buttons">
        <button onClick={() => onEdit(reminder)} className="edit-btn">Edit</button>
        <button onClick={() => onDelete(reminder.id)} className="delete-btn">Delete</button>
      </td>
    </tr>
  );
}

export default ReminderItem;