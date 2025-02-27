-- @block
SHOW DATABASES;

-- @block
USE reminder_app;

CREATE TABLE reminders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  activity VARCHAR(255) NOT NULL,
  deadline DATETIME NOT NULL,
  department_responsible VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- @block
INSERT INTO reminders (activity, deadline, department_responsible) VALUES
('Deadline Open Sponsorship Design', '2025-02-28 00:00:00', 'Design'),
('Deadline Open Sponsorship Upload', '2025-03-01 00:00:00', 'PR'),
('Deadline 2nd General Meeting Booking Venue', '2025-03-01 00:00:00', 'GA'),
('Deadline Teaser Shooting', '2025-03-07 00:00:00', 'Actors, PGVG'),
('Deadline Actors Videoshoot', '2025-03-08 00:00:00', 'Actors, PGVG'),
('2nd General Meeting', '2025-03-08 00:00:00', 'All Committees'),
('Deadline Performers Photoshoot', '2025-03-09 00:00:00', 'PGVG, Performers, Actors'),
('Deadline Booking Venue', '2025-03-11 00:00:00', 'GA'),
('Deadline 3rd General Meeting Booking Venue', '2025-03-15 00:00:00', 'GA'),
('Deadline Feeds Template Event Design', '2025-03-15 00:00:00', 'Design'),
('Deadline Concert Registration Form Design', '2025-03-17 00:00:00', 'Design'),
('Deadline Concert Poster Design', '2025-03-17 00:00:00', 'Design'),
('Deadline Concert Invitation Template', '2025-03-17 00:00:00', 'Secretary'),
('Deadline Concert Registration', '2025-03-17 00:00:00', 'Secretary'),
('Deadline Poster Upload', '2025-03-18 00:00:00', 'PR'),
('Deadline Ticket Concert Design', '2025-03-19 00:00:00', 'Design'),
('Deadline Open Sponsorship Upload', '2025-03-19 00:00:00', 'PR'),
('Deadline Ticket Concert Printing', '2025-03-20 00:00:00', 'GA'),
('3rd General Meeting', '2025-03-22 00:00:00', 'All Committees'),
('Deadline Poster Upload', '2025-03-25 00:00:00', 'PR'),
('Deadline Open Sponsorship Upload', '2025-03-26 00:00:00', 'PR'),
('Deadline Sponsorship List', '2025-03-26 00:00:00', 'PR'),
('Deadline Decorations List', '2025-03-27 00:00:00', 'EP, Design'),
('Deadline 4th General Meeting Booking Venue', '2025-03-29 00:00:00', 'GA'),
('Deadline Poster Upload', '2025-04-01 00:00:00', 'PR'),
('Deadline Teaser Editing', '2025-04-01 00:00:00', 'PGVG'),
('Deadline Teaser Upload', '2025-04-03 00:00:00', 'PR'),
('Deadline Decoration Purchases', '2025-04-04 00:00:00', 'GA'),
('Deadline Invitation Upload', '2025-04-04 00:00:00', 'Secretary'),
('4th General Meeting', '2025-04-05 00:00:00', 'All Committees'),
('Deadline Performers Photoshoot Design', '2025-04-06 00:00:00', 'Design'),
('Deadline Performers Photoshoot Upload', '2025-04-07 00:00:00', 'PR'),
('Deadline Poster Upload', '2025-04-08 00:00:00', 'PR'),
('First Rehearsal', '2025-04-10 00:00:00', 'All Committees'),
('5th General Meeting', '2025-04-12 00:00:00', 'All Committees'),
('H-3 Countdown', '2025-04-15 00:00:00', 'PR'),
('H-2 Countdown', '2025-04-16 00:00:00', 'PR'),
('H-1 Countdown', '2025-04-17 00:00:00', 'PR'),
('Second Rehearsal', '2025-04-17 00:00:00', 'Performers & Emcee, GA'),
('D-Day Concert', '2025-04-18 00:00:00', 'All Committees'),
('Deadline Expense Report', '2025-04-25 00:00:00', 'Treasurer'),
('Deadline After Event Report', '2025-04-25 00:00:00', 'Secretary'),
('Deadline After Event Recap', '2025-04-25 00:00:00', 'PGVG, Design'),
('Deadline After Event Post', '2025-04-26 00:00:00', 'PR');

-- @block
SELECT * FROM reminders;