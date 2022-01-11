const express = require('express');
const router = express.Router();
const catchAsync=require('../utils/catchAsync');
const campground = require('../controllers/camgrounds');
const Campground = require('../models/campground');
const multer  = require('multer');
const {storage}=require('../cloudinary');
const upload = multer({ storage })
const { isLoggedIn ,validateCampground,isAuthor } = require('../utils/middleware');

router.route('/')
    .get( catchAsync(campground.index))
    .post( isLoggedIn,upload.array('image'),validateCampground,catchAsync(campground.createCampground))


router.get('/new', isLoggedIn,campground.newCampForm)

router.route('/:id')
    .get( catchAsync(campground.showCampground))
    .put( isLoggedIn,isAuthor,upload.array('image'),validateCampground, catchAsync(campground.campgroundEdit))
    .delete( isLoggedIn,isAuthor,catchAsync(campground.deleteCampground))

router.get('/:id/edit', isLoggedIn,isAuthor,catchAsync(campground.editCampground))


module.exports = router;