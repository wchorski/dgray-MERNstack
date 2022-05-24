const usersController = require('../controllers/usersController');
const registerController = require('../controllers/registerController');
const ROLES = require('./roles_list')
const User = require('../model/User');

const defaultAdmin  = async (req, res) => {

  // See if there is any users. 
  const users = await User.find();
  if (!users){

    //encrypt the password
    const hashedPwd = await bcrypt.hash("SamusAran_isaMetroid", 10);

    //create and store the new user
    const result = await User.create({
      "email": "admin@email.com",
      "username": "admin",
      "password": hashedPwd
    });

    console.log('*** Default Admin Created ***');
    return console.log(result);
  } 

  // check to see if any of them have the role as Admin
  // TODO this isn't working. nested findOne
  // const anyAdmins = await User.findOne({ roles: {Admin: ROLES.Admin} }).exec();
  // if (anyAdmins) {
  //   console.log('at least one admin exists');
  // } else {
  //   console.log(anyAdmins);
  //   console.log('no admins exist');
  // }
  

  return null
}

module.exports = defaultAdmin