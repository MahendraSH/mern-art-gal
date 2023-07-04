const express = require('express');
const { isAutherizeduser, isAdmin } = require('../utils/auth.js');
const router = express.Router();
const { createGalary, getAllGalary, getSingleGalary, updateGalary, deleteGalary } = require('../controllers/GalaryConroller.js');

router.route('/create').post(isAutherizeduser, createGalary);

router.route('/all').get(getAllGalary);

router.route('/:id').get(isAutherizeduser,getSingleGalary);
module.exports = router;
