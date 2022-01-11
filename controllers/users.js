const User = require('../models/user');

module.exports.renderRegister=(req,res)=>{
    res.render('users/register');
}

module.exports.registerUser=async(req,res,next)=>{
    try{
    const {email,username,password} = req.body;
    const newUser = new User({email,username});
    const registeredUser=await User.register(newUser,password);
    req.logIn(registeredUser,(err)=>{
        if (err)return next();
        req.flash('success','Welcome to YelpCamp');
        res.redirect('/campgrounds');
        
    })

    }
    catch(e){
        req.flash('error',e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin=(req,res)=>{
    res.render('users/login');
}

module.exports.loginUser=(req,res)=>{
    const returnUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    req.flash('success','Welcome back');
    res.redirect(returnUrl);
}

module.exports.logoutUser = (req,res)=>{
    req.logOut();
    req.flash('success','See  You Soon!!');
    res.redirect('/');
}