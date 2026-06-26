const express = require('express');
const { isAutherizeduser, isAdmin } = require('../utils/auth.js');
const router = express.Router();
const { createGalary, getAllGalary, getSingleGalary, updateGalary, deleteGalary, getMyGalary } = require('../controllers/GalaryConroller.js');

router.route('/create').post(isAutherizeduser, createGalary);

router.route('/all').get(getAllGalary);

router.route('/me').get(isAutherizeduser, getMyGalary);

router.route('/:id')
    .get(isAutherizeduser, getSingleGalary)
    .put(isAutherizeduser, updateGalary)
    .delete(isAutherizeduser, deleteGalary);

module.exports = router;
