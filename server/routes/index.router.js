const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');
const ctrlAdmin = require('../controllers/admin.controller');
const foodItemController = require('../controllers/foodItem.controller');
const ngoUserController = require('../controllers/ngo-user.controller');
const restaurantUserController = require('../controllers/restaurant-user.controller');
const foodRequestController = require('../controllers/food-request.controller');
const foodPackageController = require('../controllers/foodPackage.controller');
const resNotificationController = require('../controllers/res-notification.controller');

//routing to admin controller modules
router.post('/admin-authenticate', ctrlAdmin.authenticate);

//routing to user controller modules
router.get('/userprofile', ctrlUser.userProfile);
router.post('/recovery-mail', ctrlUser.recoverPassword);

//routing to restaurant-user controller modules
router.get('/get-restaurants', restaurantUserController.getAllRestaurants);
router.post('/remove-restaurant', restaurantUserController.removeRestaurant);
router.post('/restaurant-register', restaurantUserController.restRegister);
router.post('/restaurant-authenticate', restaurantUserController.authenticate);

//routing to ngo-user controller modules
router.get('/get-ngos', ngoUserController.getAllNgos);
router.post('/remove-ngo', ngoUserController.removeNgo);
router.post('/ngo-register', ngoUserController.ngoRegister);
router.post('/ngo-authenticate', ngoUserController.authenticate);


//routing to foodItem controller modules
router.get('/get-foodItems', foodItemController.getAllFoodItems);
router.post('/add-food', foodItemController.addFoodItem);
router.post('/remove-food', foodItemController.removeFoodItem);

//routing to foodRequest controller modules
router.post('/add-food-request', foodRequestController.addFoodRequest);
router.post('/get-current-requests', foodRequestController.getCurrentRequests);
router.get('/get-all-pending-requests', foodRequestController.getAllPendingRequests);
router.post('/remove-request', foodRequestController.removeRequest);


//routing to foodPackage controller modules
router.post('/add-food-package', foodPackageController.addFoodPackage);
router.post('/get-current-packages', foodPackageController.getCurrentPackages);
router.get('/get-all-available-packages', foodPackageController.getAllAvailablePackages);
router.post('/get-available-packages', foodPackageController.getAvailablePackages);


//routing to restaurant notification controller modules
router.post('/send-request-notice',resNotificationController.sendRequestNotice)
router.post('/get-restaurant-notifications',resNotificationController.getAllNotificaions)

module.exports = router;