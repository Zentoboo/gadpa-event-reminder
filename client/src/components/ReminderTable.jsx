import React, { useState, useEffect } from 'react';
import ColumnSettings from './ColumnSettings';

function ReminderTable({ reminders, onDelete, onEdit }) {
  // Define all available columns
  const allColumns = [
    { id: 'id', name: 'ID', visible: true },
    { id: 'activity', name: 'Activity', visible: true },
    { id: 'deadline', name: 'Deadline', visible: true },
    { id: 'department_responsible', name: 'Department', visible: true },
    { id: 'event', name: 'Event', visible: true },
    { id: 'created_at', name: 'Created At', visible: true },
  ];

  // State for column visibility
  const [columns, setColumns] = useState(allColumns);
  
  // State for column settings modal
  const [showColumnSettings, setShowColumnSettings] = useState(false);
  
  // State for record display limit
  const [recordLimit, setRecordLimit] = useState(10);
  const [inputValue, setInputValue] = useState("10");

  // State for sorting
  const [sortConfig, setSortConfig] = useState({
    key: 'deadline',
    direction: 'asc',
  });

  // Handle record limit change
  const handleRecordLimitChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle record limit input blur or Enter key
  const handleRecordLimitSubmit = () => {
    let newLimit = parseInt(inputValue, 10);
    
    // Validate the input
    if (isNaN(newLimit) || newLimit < 1) {
      newLimit = 1;
    } else if (newLimit > reminders.length) {
      newLimit = reminders.length;
    }
    
    setRecordLimit(newLimit);
    setInputValue(newLimit.toString());
  };

  // Handle key press for Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRecordLimitSubmit();
    }
  };

  // Handle sort
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to data
  const sortedData = [...reminders].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  // Apply record limit
  const limitedData = sortedData.slice(0, recordLimit);

  // Toggle column visibility
  const toggleColumnVisibility = (columnId) => {
    setColumns(
      columns.map((col) => {
        if (col.id === columnId) {
          return { ...col, visible: !col.visible };
        }
        return col;
      })
    );
  };

  // Format date for display
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
  const isDeadlineApproaching = (deadline) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const timeDiff = deadlineDate - now;
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    
    return hoursDiff < 24 && hoursDiff > 0;
  };

  // Check if deadline is past
  const isDeadlinePast = (deadline) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    return deadlineDate < now;
  };

  return (
    <div className="reminder-list">
      <div className="reminder-header">
        <h2 className="schedule-title">Schedule</h2>
        
        <div className="records-indicator">
          <span>Show </span>
          <input 
            type="number"
            min="1"
            max={reminders.length}
            value={inputValue}
            onChange={handleRecordLimitChange}
            onBlur={handleRecordLimitSubmit}
            onKeyPress={handleKeyPress}
            className="record-limit-input"
            aria-label="Number of records to display"
          />
          <span> out of {reminders.length}</span>
        </div>
        
        <button
          onClick={() => setShowColumnSettings(!showColumnSettings)}
          className="column-settings-btn"
        >
          ⚙️ Columns
        </button>
      </div>

      {/* Column settings modal */}
      {showColumnSettings && (
        <ColumnSettings
          columns={columns}
          onToggleColumn={toggleColumnVisibility}
          onClose={() => setShowColumnSettings(false)}
        />
      )}

      {reminders.length === 0 ? (
        <p className="no-reminders">No reminders found. Add one!</p>
      ) : (
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {columns
                  .filter((col) => col.visible)
                  .map((column) => (
                    <th
                      key={column.id}
                      onClick={() => handleSort(column.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>{column.name}</span>
                        {sortConfig.key === column.id && (
                          <span>
                            {sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {limitedData.map((reminder) => (
                <tr 
                  key={reminder.id}
                  className={`reminder-item ${isDeadlineApproaching(reminder.deadline) ? 'approaching' : ''} 
                  ${isDeadlinePast(reminder.deadline) ? 'past' : ''}`}
                >
                  {columns
                    .filter((col) => col.visible)
                    .map((column) => {
                      if (column.id === 'deadline') {
                        return (
                          <td key={`${reminder.id}-${column.id}`}>
                            {formatDate(reminder.deadline)}
                            {isDeadlineApproaching(reminder.deadline) && <span className="deadline-alert"> (Soon!)</span>}
                            {isDeadlinePast(reminder.deadline) && <span className="deadline-past"> (Overdue!)</span>}
                          </td>
                        );
                      } else if (column.id === 'created_at') {
                        return (
                          <td key={`${reminder.id}-${column.id}`}>
                            {formatDate(reminder.created_at)}
                          </td>
                        );
                      } else {
                        return (
                          <td key={`${reminder.id}-${column.id}`}>
                            {reminder[column.id]}
                          </td>
                        );
                      }
                    })}
                  <td className="action-buttons">
                    <button onClick={() => onEdit(reminder)} className="edit-btn">Edit</button>
                    <button onClick={() => onDelete(reminder.id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ReminderTable;