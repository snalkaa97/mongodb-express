require('dotenv').config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../../models/User/UserModel')
const Role = require('../../models/Role/RoleModel');
const UserRole = require('../../models/UserRole/UserRoleModel')

module.exports = {
    async signin(req, res) {
        try{
            const user = await User.findOne({email:req.body.email});
            if(user){
                const passwordIsValid = bcrypt.compareSync(
					req.body.password.toString(),
					user.password.toString()
				);
                if(!passwordIsValid){
                    return res.status(200).send({
						auth: false,
						accessToken: null,
						userInfo: null,
						message: "Error",
						errors: "Invalid Password!",
					});
                }
                var token ="Bearer " +jwt.sign(
						{
							id: user._id,
							email: user.email,
						},
						process.env.KEY,
						{
							expiresIn: 86400, //24h expired
						}
					);
                return res.status(200).send({
					auth: true,
					accessToken: token,
					userInfo: {
						name: user.name,
						email: user.email,
					},
					message: "Error",
					errors: null,
				});
                
            } else {
                res.status(400).send({message: 'Invalid username or password'})
            }
        } catch(e){
            res.status(400).send({message: 'Invalid username or password'});
        }
    },
    async signup(req, res){
        try {
            let user = await User.findOne({email: req.body.email});
            if(user){
                return res.status(200).send({message: 'Your email already exists.'});
            } else {
                const roles = await Role.find({
                    name: {$in: req.body.role}
                })
                if(!roles){
                    return res.status(200).send({
						auth: false,
						id: req.body.id,
						message: "Role not found",
					})
                }
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password.toString(), 8)
                })
                .then(user =>{
                    roles.map((role)=>{
                        UserRole.create({
                            user_id: user._id,
                            role_id: role._id,
                        })
                    })
                    
                    res.status(200).send(user);
                })
                .catch(err =>{
                    res.status(200).send({message: 'error'});
                })

            }
        } catch(e){
            res.status(500).send({message: 'Error authenticating user'});
        }
    }
}

