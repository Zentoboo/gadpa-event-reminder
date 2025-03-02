import React, { useState, useEffect } from 'react';

function ReminderForm({ addReminder, editingReminder, updateReminder, cancelEditing }) {
  const [formData, setFormData] = useState({
    activity: '',
    deadline: '',
    department_responsible: '',
    event: 'General' // Default event value
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingReminder) {
      // Format the date for the input field (YYYY-MM-DDTHH:MM)
      const deadlineDate = new Date(editingReminder.deadline);
      const formattedDeadline = deadlineDate.toISOString().slice(0, 16);
      
      setFormData({
        activity: editingReminder.activity,
        deadline: formattedDeadline,
        department_responsible: editingReminder.department_responsible,
        event: editingReminder.event || 'General'
      });
    } else {
      // Reset form when not editing
      setFormData({
        activity: '',
        deadline: '',
        department_responsible: '',
        event: 'General'
      });
    }
  }, [editingReminder]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.activity || !formData.deadline || !formData.department_responsible) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    let success = false;

    try {
      if (editingReminder) {
        success = await updateReminder(editingReminder.id, formData);
      } else {
        success = await addReminder(formData);
      }

      // Only reset the form if submission was successful
      if (success) {
        setFormData({
          activity: '',
          deadline: '',
          department_responsible: '',
          event: 'General'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      activity: '',
      deadline: '',
      department_responsible: '',
      event: 'General'
    });
    cancelEditing();
  };

  return (
    <div className="form-container">
      <h2>{editingReminder ? 'Edit Reminder' : 'Add New Reminder'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="activity">Activity*</label>
          <input
            type="text"
            id="activity"
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            placeholder="Enter activity"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Deadline*</label>
          <input
            type="datetime-local"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="department_responsible">Department Responsible*</label>
          <input
            type="text"
            id="department_responsible"
            name="department_responsible"
            value={formData.department_responsible}
            onChange={handleChange}
            placeholder="Enter department responsible"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="event">Event</label>
          <input
            type="text"
            id="event"
            name="event"
            value={formData.event}
            onChange={handleChange}
            placeholder="Enter event name"
          />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : (editingReminder ? 'Update' : 'Add')}
        </button>
        {editingReminder && (
          <button 
            type="button" 
            onClick={handleCancel}
            className="cancel-btn"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default ReminderForm;