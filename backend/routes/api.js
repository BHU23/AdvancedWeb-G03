const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');
const placeController = require('../controllers/place');
const commentController = require('../controllers/comment');
const planningController = require('../controllers/plan');
const planOntimeController = require('../controllers/planOntime');
const reviewController = require('../controllers/review');

// customer route
router.get('/customers', customerController.getAllCustomers);
router.get('/customer/:id', customerController.getCustomerByID);
router.post('/customer', customerController.createCustomer);
router.put('/customer/:id', customerController.updateCustomer);
router.delete('/customer/:id', customerController.deleteCustomer);

// comment route
router.get('/comments', commentController.getAllComments);
router.get('/comment/:id', commentController.getCommentByID);
router.post('/comment', commentController.createComment);
router.put('/comment/:id', commentController.updateComment);
router.delete('/comment/:id', commentController.deleteComment);

//place route
router.get('/places', placeController.getAllPlaces);
router.get('/place/:id', placeController.getPlaceByID);
router.post('/place', placeController.createPlace);
router.put('/place/:id', placeController.updatePlace);
router.delete('/place/:id', placeController.deletePlace);

// Routes for Planning
router.get('/plannings', planningController.getAllPlannings); 
router.get('/planning/:id', planningController.getPlanningByID);  
router.post('/planning', planningController.createPlanning);  
router.put('/planning/:id', planningController.updatePlanning);  
router.delete('/planning/:id', planningController.deletePlanning); 

// PlanOntime Routes
router.get('/planontimes', planOntimeController.getAllPlanOntimes);
router.get('/planontime/:id', planOntimeController.getPlanOntimeByID);
router.post('/planontime', planOntimeController.createPlanOntime);
router.put('/planontime/:id', planOntimeController.updatePlanOntime);
router.delete('/planontime/:id', planOntimeController.deletePlanOntime);

// Review Routes
router.get('/reviews', reviewController.getAllReviews);
router.get('/review/:id', reviewController.getReviewByID);
router.post('/review', reviewController.createReview);
router.put('/review/:id', reviewController.updateReview);
router.delete('/review/:id', reviewController.deleteReview);


module.exports = router;
