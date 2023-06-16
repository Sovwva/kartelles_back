import Router from 'express'
import User_controller from "./User_controller.js"
import User from "./user.js";

const User_router = new Router()

User_router.post('/create', User_controller.create);
User_router.post('/login', User_controller.Login);
User_router.put('/update/:id', User_controller.update);
User_router.delete('/delete/:id', User_controller.delete);
User_router.get('/logout/:id', User_controller.logout);

export default User_router;