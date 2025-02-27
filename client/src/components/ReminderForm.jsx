import React, { useState, useEffect } from 'react';

function ReminderForm({ addReminder, editingReminder, updateReminder }) {
  const [formData, setFormData] = useState({
    activity: '',
    deadline: '',
    department_responsible: ''
  });

  useEffect(() => {
    if (editingReminder) {
      // Format the date for the input field (YYYY-MM-DDTHH:MM)
      const deadlineDate = new Date(editingReminder.deadline);
      const formattedDeadline = deadlineDate.toISOString().slice(0, 16);
      
      setFormData({
        activity: editingReminder.activity,
        deadline: formattedDeadline,
        department_responsible: editingReminder.department_responsible
      });
    }
  }, [editingReminder]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.activity || !formData.deadline || !formData.department_responsible) {
      alert('Please fill in all fields');
      return;
    }

    if (editingReminder) {
      updateReminder(editingReminder.id, formData);
    } else {
      addReminder(formData);
    }

    // Reset the form
    setFormData({
      activity: '',
      deadline: '',
      department_responsible: ''
    });
  };

  return (
    <div className="form-container">
      <h2>{editingReminder ? 'Edit Reminder' : 'Add New Reminder'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="activity">Activity</label>
          <input
            type="text"
            id="activity"
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            placeholder="Enter activity"
          />
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input
            type="datetime-local"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="department_responsible">Department Responsible</label>
          <input
            type="text"
            id="department_responsible"
            name="department_responsible"
            value={formData.department_responsible}
            onChange={handleChange}
            placeholder="Enter department responsible"
          />
        </div>
        <button type="submit">{editingReminder ? 'Update Reminder' : 'Add Reminder'}</button>
        {editingReminder && (
          <button 
            type="button" 
            onClick={() => {
              setFormData({
                activity: '',
                deadline: '',
                department_responsible: ''
              });
              // Call a function to cancel editing (you'd need to pass this from App.jsx)
            }}
            className="cancel-btn"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default ReminderForm;