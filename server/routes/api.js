const express = require('express');
const mysql = require('mysql2');
const { authenticateAdminToken } = require('../helpers/adminAuth.js');

let router = express.Router();
const {
  getAnnouncements,
  getAnnouncementsById,
  addAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
  addApplication,
  getUserById,
  getUserByAnnId,
  getUserByEmail,
  getAllUsers,
  getAllCompanies,
  addUser,
  updateUser,
  deleteUser,
  deleteCompany,
  getUserApplications
} = require('../helpers/dbFunctions.js');

// Get all the announcements
router.get('/announcements', getAnnouncements);

// Get details about a specific announcement
router.get('/announcements/:id', getAnnouncementsById);

// Create a new announcement
router.post('/announcements', function(req, res) {
  addAnnouncement(req, res);
});

// Update an announcement
router.put('/announcements/:id', function(req, res) {
  updateAnnouncement(req, res);
})

// Delete a specific announcement
router.delete('/announcements/:id', authenticateAdminToken, deleteAnnouncement);

// Add an application
router.post('/applications/:id', addApplication);

// Get user by announcement id
router.get('/users/announcements/:id', getUserByAnnId);

// Get user by id
router.get('/user/:id', getUserById);

// Get a user by email
router.get('/user/email/:email', getUserByEmail);

// Add a user
router.post('/users', addUser);

// Get all users
router.get('/users', authenticateAdminToken, getAllUsers);

// Update a user
router.post('/users/:id', updateUser);

// Delete a user
router.delete('/users/:id',authenticateAdminToken, deleteUser);

// Get user's applications
router.get('/applications/user/:id', getUserApplications);

// Get all companies
router.get('/companies', authenticateAdminToken, getAllCompanies);


// Delete a company
router.delete('/companies/:id', authenticateAdminToken, deleteCompany);


module.exports = router;
