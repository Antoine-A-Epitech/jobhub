const mysql = require('mysql2');
const getTableRows = require('./getTableRows.js');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PWD,
  waitForConnections: true
});

// For GET requests
const getAnnouncements = (req, res) => {
  pool.query(`SELECT * FROM announcement ORDER BY creation_date DESC`, function(err, results) {

    if (err) throw err;
    res.status(200).json(results);
  })
};

// For GET requests with an ID
const getAnnouncementsById = (req, res) => {
  const id = parseInt(req.params.id);

  const query = `SELECT
    announcement.*,
    company.company_name,
    company.logo_url
    FROM announcement
    INNER JOIN company ON announcement.company_id = company.company_id
    WHERE announcement_id = ?
    `
  pool.query(query, [id], function(err, results) {

    if (err) throw err;

    res.status(200).json(results);
  })
};

// For POST requests
const addAnnouncement = async (req, res) => {

  let fields = [] // Where the fields will be concatenated to be added to the db
  let fields_inputs = [] // Where their respective data will be added
  let question_marks = [];

  let tableRows = await getTableRows('announcement');

  for (const field of Object.keys(req.body)) {
    if (!tableRows.includes(field) || !req.body[field]) continue;
    fields.push(field)
    let field_input = isNaN(req.body[field]) ? req.body[field].trim() : req.body[field];

    field_input = isNaN(field_input) ? field_input : parseInt(field_input);
    fields_inputs.push(field_input);
    question_marks.push("?");
  };

  let user_id = 3;
  let company_id = 1;

  pool.query(`INSERT INTO announcement (user_id, company_id, ${fields.join(",")})
  VALUES (?, ?, ${question_marks.join(', ')})`, [user_id, company_id].concat(fields_inputs), function(err, results) {

    if (err) throw err;

    res.status(200).json(results);
  });

};

// For DELETE requests
const deleteAnnouncement = (req, res) => {
  let announcement_id = parseInt(req.params.id);
  pool.query(`DELETE FROM announcement
    WHERE announcement_id = ?`, [announcement_id]);
  res.send('Annoucement deleted.');
};

// Delete user
const deleteUser = (req, res) => {
  let user_id = parseInt(req.params.id);

  pool.query(`DELETE FROM user WHERE user_id = ?`, [user_id]);

  res.send('User deleted !');
}

const deleteCompany = (req, res) => {
  let company_id = parseInt(req.params.id);

  pool.query(`DELETE FROM company WHERE company_id = ?`, [company_id]);

  res.send('Company Deleted !');
}

// For PUT requests
const updateAnnouncement = async (req, res) => {
  let announcement_id = parseInt(req.params.id);

  if (!announcement_id) throw "The announcement_id is missing.";

  // Go over the fields that need to be updated
  let fields = [] // Where the fields will be concatenated to be added to the db
  let fields_inputs = [] // Where their respective data will be added

  let tableRows = await getTableRows('announcement');

  for (const field of Object.keys(req.body)) {
    if (!tableRows.includes(field) || !req.body[field]) continue;
    fields.push(`${field} = ?`)
    let field_input = isNaN(req.body[field]) ? req.body[field].trim() : req.body[field];
    fields_inputs.push(field_input)
  }

  fields_inputs.push(announcement_id);

  pool.query(`UPDATE announcement
    SET ${fields.join(',')}
    WHERE announcement_id = ?`, fields_inputs, function (err, success) {

      if (err) throw err;

      res.status(200).send(`Announcement with id : ${announcement_id} - modified !`);
    });
};


// For POST application
const addApplication = (req, res) => {
  const announcement_id = parseInt(req.params.id);
  const user_id = req.body.user_id;

  if (!announcement_id) throw "'announcement_id' is missing !";

  const query =  `INSERT INTO application (user_id, announcement_id, message) VALUES (?, ?, ?)`

  pool.query(query, [user_id, announcement_id, req.body.message], function(err, success) {
    if (err) throw err;

    res.status(200).send(`Application ${success.insertId} of user ${user_id} has been added !`);
  })
}

// Get user by announcementID
const getUserByAnnId = (req, res) => {
  const announcement_id = parseInt(req.params.id);

  const queryStatment = `SELECT * FROM user
  JOIN announcement
  ON user.user_id = announcement.user_id WHERE announcement_id = ? `;


  pool.query(queryStatment, [announcement_id], function(err, results) {
    if (err) throw err;

    res.status(200).json(results);
  })
}

// Get user by ID
const getUserById = (req, res) => {
  const user_id = parseInt(req.params.id);

  pool.query(`SELECT * FROM user WHERE user_id = ?`, [user_id], function(err, results) {
    if (err) throw err;

    res.status(200).json(results);
  })
}

// Get user by email
const getUserByEmail = (req, res) => {
  const user_email = req.params.email;

  // Get everything about the user and if he's an admin get the admin_id as well
  // Otherwise the admin_id will be null
  const query = `SELECT user.*, admin.admin_id
                  FROM user
                  LEFT JOIN admin ON user.user_id = admin.user_id
                  WHERE user.email = ?`

  pool.query(query, [user_email], function(err, results) {
    if (err) throw err;

    res.status(200).json(results);
  });
}

// Add user to table
const addUser = async (req, res) => {
  let fields = [];
  let fields_inputs = [];
  let question_marks = [];

  // Get the table rows to exclude unknown fields
  let tableRows = await getTableRows('user');

  for (const field of Object.keys(req.body)) {
    if (!tableRows.includes(field)) continue;
    fields.push(field);
    let field_input = req.body[field] && typeof req.body[field] === "string" ? req.body[field].trim() : req.body[field];
    fields_inputs.push(field_input);
    question_marks.push("?");
  };

  pool.query(`INSERT INTO user (${fields.join(",")})
  VALUES (${question_marks.join(',')})`, fields_inputs, function(err, results) {

    if (err) throw err;

    res.status(200).json(results);
  });
};

// Update user information
const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  let fields = [];
  let fieldInputs = [];
  let questionMarks = [];

  if (!userId) throw "The userId was not provided !";

  // Get the table rows to exclude unknown fields
  const tableRows = await getTableRows('user');

  for (const field of Object.keys(req.body)) {
    if(!tableRows.includes(field)) continue;
    fields.push(`${field} = ?`);
    let fieldInput = isNaN(req.body[field]) ? req.body[field].trim() : req.body[field];
    fieldInputs.push(fieldInput);
    questionMarks.push('?');
  };

  pool.query(`UPDATE user SET ${fields.join(',')}
  WHERE user_id = ${userId}`, fieldInputs, function(err, success) {

    if (err) throw err;

    res.status(201).send('User information updated !');
  })
}

// Get all users
const getAllUsers = (req, res) => {
  const query = `SELECT * FROM user`;

  pool.query(query, function(err, results) {

    if (err) throw err;

    res.status(200).json(results);
  })
}

// Get all companies
const getAllCompanies = (req, res) => {
  const query = `SELECT * FROM company`;

  pool.query(query, function(err, results) {

    if (err) throw err;

    res.status(200).json(results);
  })
}

const getUserApplications = (req, res) => {
  const userId = parseInt(req.params.id);

  if (!userId) throw "User Id not provided";

  const query = `SELECT
                 application.application_id,
                 application.message,
                 application.created_date,
                 announcement.*
                 FROM application
                 INNER JOIN user ON user.user_id = application.user_id
                 LEFT JOIN announcement ON announcement.announcement_id = application.announcement_id
                 WHERE user.user_id = ?`

  pool.query(query, [userId], function(err, results) {

    if (err) throw err;

    res.status(200).send(results);
  })
}

module.exports = {
  getAnnouncements,
  getAnnouncementsById,
  addAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
  addApplication,
  getUserById,
  getUserByAnnId,
  getUserByEmail,
  addUser,
  getAllUsers,
  getAllCompanies,
  updateUser,
  deleteUser,
  deleteCompany,
  getUserApplications
 };
