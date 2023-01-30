const User = require('../../models/User/UserModel')
const bcrypt = require("bcryptjs");
module.exports = {
    async getUser(req, res) {
        try {
            const users = await User.find();
            res.status(200).send(users);
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    },

    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(404).send({message: error.message});
        }
    },

    async saveUser(req, res){
        try {
            const user = await User.findOne({email: req.body.email});
            if(user) return res.status(200).send({message: 'Your email already exists.'});
            const password = await bcrypt.hash(req.body.password.toString(), 8);
            const inserteduser = await User.create({
                name: req.body.name, 
                email: req.body.email,
                password: password
            });
            res.status(201).send(inserteduser);
        } catch (error) {
            res.status(400).send({message: error.message});
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
            if(!user){
                return res.status(404).send({message: 'User not found'})
            }
            res.status(200).send({status: 'updated'});
        } catch (error) {
            res.status(400).send({message: error.message});
        }
    },

    async deleteUser(req, res){
        try {
            const deleteduser = await User.deleteOne({_id:req.params.id});
            res.status(200).send({message: 'deleted user'});
        } catch (error) {
            res.status(400).send({message: error.message});
        }
    }
}