const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'ben',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});

//query for all users

function getUsers(req, res){
  pool.query('Select * FROM user_info ORDER BY user_id ASC', (error, results) => {
    if(error){
      throw error;
    }
    res.status(200).json(results.rows);
  });
}

// query for one users
function getUsersByID(req, res){
  const id = parseInt(req.params.id);
  pool.query('SELECT * FROM user_info WHERE id = $1', [id], (error,results) => {
    if(error){
      throw error
    }
    res.status(200).json(results.rows);
  })
}

// query for all books
function getBooks(req, res){
  pool.query('SELECT * FROM books_info ORDER BY book_ID ASC', (error, results) => {
    if(error){
      throw error;
    }
    res.status(200).json(results.rows);
  });
}

//query for one books
function getBookByID(req, res){
  const id = parseInt(req.params.id);
  pool.query("SELECT * FROM books_info WHERE id = $1", [id], (error, results) => {
    if(error){
      throw error;
    }
    res.status(200).json(results.rows);
  })
}

//add users
function addUser(req, res){
  let now = new DATE();
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let password = req.body.password;

  let created = now;

  pool.query(
    'INSERT INTO user_info( "firstName", "lastName", "address", "state", "zip") VAULES($1, $2, $3,$4, $5) RETURNING *',
    [user_ID, firstName, lastName, address, state, zip],
    (err, results, feilds) => {
      if(err){
        res.send({
          "code": 400,
          "failed": "error"
        });
      }
      else{
        const user = results.row[0];
        res.send({
          "code": 200,
          "sucess": "registered user",
          data: user
        });
      }
    });
}

//delete users
function deleteUser(req, res){
  const id = parseInt(req. params.id)

  pool.query('DELETE FROM user_info WHERE user_ID = $1', [user_ID], (err, results) => {
    if(error){
      throw error
    }
    res.status(200).send('User deleted with ID: ${user_ID}')
  })
}

//add books
function addBook(req,res){

}

//delete books
function deleteBook(req, res){
  const id = parseInt(req.params.id)
  pool.query('DELETE FROM books_info WHERE id = $1', [id], (error, results) => {
    if(error){
      throw error;
    }
    res.status(200).send('Book deleted with ID: ${id}');
  })
}

//update users
function updateUser(req,res){

}

//update books_info

function updateBook(req,res){

}

module.exports = {
  getUsers,
  getBooks,
  addUser,
  deleteUser,
  getBookByID,
  getUsersByID,
  deleteBook,

}
