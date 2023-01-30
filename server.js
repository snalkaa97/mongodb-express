require("dotenv").config();
const express = require('express');
const app = express();
const routes = require('./routes/index');
var cors = require('cors')
app.use(cors())


app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

const mongoose = require('mongoose');
const Role = require('./models/Role/RoleModel');
// mongoose.set('strictQuery', false);
mongoose.set('strictQuery', true);
const main = async () => {
    await mongoose.connect('mongodb://localhost:27017/backend-express',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    // Role.insertMany([
    //     {name: 'admin'},
    //     {name: 'user'} 
    // ]);

    // console.log(test)
}
main().catch(err => console.log(err));

app.use(routes);
app.use((req,res, next)=>{
    res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
	);
    next();
})

app.get('/', (req, res)=>{
    res.status(200).send({message: '/ get'})
})

app.listen(process.env.NODE_PORT || 5000, ()=>{
    console.log('running on port: ' + process.env.NODE_PORT);
})



