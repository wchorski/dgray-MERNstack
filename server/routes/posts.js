const express = require('express');
const router = express.Router();
const postCont = require('../controllers/postsCont');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

router.route('/')
  .get(verifyRoles(ROLES_LIST.User), postCont.getAllPosts)
  .post(verifyRoles(ROLES_LIST.Editor), postCont.createPost)

router.route('/:id')
  .get(verifyRoles(ROLES_LIST.User), postCont.getPost)
  // TODO update permission for Editor
  .delete(verifyRoles(ROLES_LIST.Admin), postCont.deletePost)

module.exports = router;