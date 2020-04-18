const Router=require("express").Router()
const {signinUser,getUser,signupUser,editUser,getUsers,getUserById}=require("../controller/user/user")
const passport=require("../services/jwtPassport")
/*
url : /api/user/signup
@return ok if success

*/
Router.post("/signup",signupUser)

/*
url : /api/user/signin
@return token

*/
Router.post("/signin",signinUser)

/*
url : /api/user/edit/:id
@return ok

*/
Router.put("/",passport.authenticate('jwt', { session: false }),editUser)
Router.get("/",passport.authenticate('jwt', { session: false }),getUser)


module.exports=Router;