const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

//the following assumes that you named your connection variable `pool`
pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {console.log(response)})
.catch(response => {console.log(response);});

/// Users
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  let query = `SELECT * FROM users WHERE email = $1`
  let values = [email]
  pool
  .query(query, values)
  .then(response => {
    if (response.rows[0]) {
      return Promise.resolve(response.rows);
    } else
    return Promise.resolve(null);
  })
  .catch(error => {
    console.log(error);
  })
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  let query = `SELECT * FROM users WHERE id = $1`
  let values = [id]
  pool
  .query(query, values)
  .then(response => {
    if (response.rows[0]) {
      return Promise.resolve(response.rows);
    } else
    return Promise.resolve(null);
  })
  .catch(error => {
    console.log(error);
  })
}
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

const addUser =  function(user) {
  let query = `INSERT INTO users (name,password,email)
  VALUES ($1,$2,$3)`
  let values = [user.name,user.password,user.email]
  pool
  .query(query, values)
  .then(response => {
    if (response.rows[0]) {
      return Promise.resolve(response.rows);
    } else
    return Promise.resolve(null);
  })
  .catch(error => {
    console.log(error);
  })
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  let query = `SELECT reservations.* FROM reservations 
  $2'
  LIMIT $2;`;
  let values;
  if (guest_id) {
    values = [`WHERE guest_id = '${guest_id}'` || '', limit]
  } else {
    values = ['', limit]
  }
  
  pool.query(query, values)
  .then ((res) =>{
    return Promise.resolve(res.rows);
  })
  .catch ((err => {
    console.log(err);
    return Promise.resolve(null);
  })

}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const limitedProperties = {};
  let query = `SELECT properties.*, AVG(rating) AS avg_rating
  FROM properties JOIN property_reviews ON property_id=properties.id
  $1
  GROUP BY properties.id;
  LIMIT $2 ;`;

  let values; 
  switch (options) {
    case options.city:
      if (!values[0]) {  
        values = [`WHERE city = '${options.city}' `, limit];
      } else {
        values = [` AND WHERE city = '${options.city}' `] , limit;
      }
    case options.owner_id:
      if (!values[0]) {
        values = [`WHERE owner_id = '${options.owner_id}' `, limit];
      } else {
        values = [` AND WHERE owner_id = '${options.owner_id}' `, limit];
      }
    case options.minimum_price_per_night:
      if (!values[0]) {
        values = [`WHERE minimum_price_per_night > ${options.minimum_price_per_night}`, limit];
      } else {
        values = [` AND WHERE minimum_price_per_night > ${options.minimum_price_per_night} `, limit];
      }
    case options.maximum_price_per_nght:
      if (!values[0]) {
        values = [`WHERE maximum_price_per_nght < ${options.maximum_price_per_nght}`, limit];
      } else {
        values = [` AND WHERE maximum_price_per_nght < ${options.maximum_price_per_nght} `, limit];
      }
    case minimum_rating:
      if (!values[0]) {
        values = [`WHERE avg_rating > ${minimum_rating}`, limit];
      } else {
        values = [` AND WHERE avg_rating > ${minimum_rating} `, limit]
      }
  }

  pool
  .query(query,[limit])
  .then((result) => {
    console.log(result.rows);
    if (result.rows[0]) {
      return Promise.resolve(result.rows);
    } else
    return Promise.resolve(null);
  })
  .catch((err) => {
    console.log(err.message);
  })
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
