import React from 'react';

function ColumnSettings({ columns, onToggleColumn, onClose }) {
  return (
    <div className="column-settings-modal">
      <div className="column-settings-header">
        <h3 className="column-settings-title">Select columns to display</h3>
        <button 
          onClick={onClose}
          className="column-settings-close"
          aria-label="Close settings"
        >
          ✕
        </button>
      </div>
      <div className="column-settings-content">
        {columns.map((column) => (
          <div key={column.id} className="column-checkbox-item">
            <input
              type="checkbox"
              id={`col-${column.id}`}
              checked={column.visible}
              onChange={() => onToggleColumn(column.id)}
              className="column-checkbox"
            />
            <label htmlFor={`col-${column.id}`} className="column-label">{column.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColumnSettings;