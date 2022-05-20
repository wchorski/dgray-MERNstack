const express = require('express');
const router = express.Router();
const postCont = require('../controllers/postsCont');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

router.route('/')
  .get(postCont.getAllPosts)
  .delete( postCont.deletePost)
  .post(postCont.createPost)
  // .get(verifyRoles(ROLES_LIST.User), postCont.getAllPosts)
  // .delete(verifyRoles(ROLES_LIST.Editor), postCont.deletePost)
  

router.route('/:id')
  .get(postCont.getPost)
  .delete(postCont.deletePost)
  // .get(verifyRoles(ROLES_LIST.User), postCont.getPost)
  // .delete(verifyRoles(ROLES_LIST.Editor), postCont.deletePost)

module.exports = router;