const express = require('express');
const router = express.Router();
const RoleController=require('../controller/RoleController');

router.post('/create-role', RoleController.createRole)

module.exports=router;