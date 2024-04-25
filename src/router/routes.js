const { Router } = require('express')

const { signup, signin, userDetails, userDetailsUpdate, deleteUser, verifyUser, listCompany, resend } = require('../controller/User');
const { addDetails, updateDetails, getDetails, createCompany, editCompany, deleteCompany } = require('../controller/UserDetails');


const { createEmployee, updateEmployee, getEmployee, deleteEmployee, getAllEmployee} = require('../controller/Employee');
const { createProduct, updateProduct, getProduct, getAllProduct, deleteProduct } = require('../controller/Product');



const { userAuth } = require('../middleware');

const router = Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/userDetails', [userAuth], userDetails)
router.post('/update-userdetails', [userAuth], userDetailsUpdate)
router.delete('/userdelete', [userAuth], deleteUser)
router.post('/verifyuser', [userAuth], verifyUser)
router.post('/otp-resend', resend)

router.post('/userdetails-add', [userAuth], addDetails)
router.post('/userdetails-update', [userAuth], updateDetails)
router.get('/userdetails-get', [userAuth], getDetails)

router.post('/create-employee', [userAuth], createEmployee)
router.post('/update-employee', updateEmployee)
router.post('/get-employee', getEmployee)
router.post('/delete-employee', deleteEmployee)
router.post('/get-all-employee', getAllEmployee)



router.post('/create-product', [userAuth], createProduct)
router.post('/update-product', updateProduct)
router.post('/get-product', getProduct)
router.post('/delete-product', deleteProduct)
router.post('/get-all-product', getAllProduct)

router.get('/list-company', [userAuth], listCompany)

router.post('/create-company', [userAuth], createCompany)

router.post('/edit-company', [userAuth], editCompany)

router.post('/delete-company', [userAuth], deleteCompany)






module.exports = router;



