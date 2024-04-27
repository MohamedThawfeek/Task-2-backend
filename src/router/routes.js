const { Router } = require('express')

const { signup, signin, userDetails, userDetailsUpdate, deleteUser, verifyUser, resend } = require('../controller/User');
const { addDetails, updateDetails, getDetails } = require('../controller/UserDetails');


const { createEmployee, updateEmployee, getEmployee, deleteEmployee, getAllEmployee} = require('../controller/Employee');
const { createProduct, updateProduct, getProduct, getAllProduct, deleteProduct } = require('../controller/Product');
const { updateCompany, deletCompany, getAllCompany, createCompany, updateSingleCompany } = require('../controller/Company');




const { userAuth } = require('../middleware');

const router = Router();

//user routes
router.post('/signup', signup)
router.post('/signin', signin)
router.get('/userDetails', [userAuth], userDetails)
router.post('/update-userdetails', [userAuth], userDetailsUpdate)
router.delete('/userdelete', [userAuth], deleteUser)
router.post('/verifyuser', [userAuth], verifyUser)
router.post('/otp-resend', resend)

//userDetails routes
router.post('/userdetails-add', [userAuth], addDetails)
router.post('/userdetails-update', [userAuth], updateDetails)
router.get('/userdetails-get', [userAuth], getDetails)

//employee routes
router.post('/create-employee', [userAuth], createEmployee)
router.post('/update-employee', updateEmployee)
router.post('/get-employee', getEmployee)
router.post('/delete-employee', deleteEmployee)
router.post('/get-all-employee', getAllEmployee)

//products routes
router.post('/create-product', [userAuth], createProduct)
router.post('/update-product', updateProduct)
router.post('/get-product', getProduct)
router.post('/delete-product', deleteProduct)
router.post('/get-all-product', getAllProduct)

//company routes
router.post('/create-company', [userAuth], createCompany)
router.post('/edit-company', [userAuth], updateCompany)
router.get('/list-company', [userAuth], getAllCompany)
router.post('/delete-company', deletCompany)
router.post('/edit-single-company', [userAuth], updateSingleCompany)





module.exports = router;



