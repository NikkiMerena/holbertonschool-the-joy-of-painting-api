require('dotenv').config();
const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql2/promise');
const colorsCsvPath = './data_list/The Joy Of Painting - Colors Used.csv';
const episodesCsvPath = './data_list/The Joy Of Painting - Episode Dates.csv';
const subjectsCsvPath = './data_list/The Joy Of Painting - Subject Matter.csv';

// MySQL connection setup
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

const insertData = async (data) => {
  try {
    const statement = `INSERT INTO episodes (title, description, broadcast_date) VALUES (?, ?, ?)`;
    const results = await connection.query(statement, [data.title, data.description, data.broadcastDate]);
    console.log(results);
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

// Read and parse the CSV file
fs.createReadStream('data_list/The Joy Of Painting - Colors Used.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Insert each row into the database
    insertData(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
