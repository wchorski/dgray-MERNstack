const User = require('../model/User');

const getAllUsers = async (req, res) => {
    console.log('wegot all users');
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const deleteUser = async (req, res) => {
  try{
    const user = await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: 'deleted user',
      user,
    })

  } catch (err){
    console.log(err);
    res.status(400).json({status: 'failed user deletion',})
  }

  // if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
  // const user = await User.findOne({ _id: req.body.id }).exec();
  // if (!user) {
  //     return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
  // }
  // const result = await user.deleteOne({ _id: req.body.id });
  // res.json(result);
}

const getUser = async (req, res) => {
  console.log('--getuser');
  try{
    const user = await User.findById(req.params.id)

    res.status(200).json(user)

  } catch (err){
    console.log(err);
    res.status(400).json({status: 'failed to user_details', message: err.toString()})
  }

  // if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
  // const user = await User.findOne({ _id: req.params.id }).exec();
  // if (!user) {
  //     return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
  // }
  // res.json(user);
}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser
}