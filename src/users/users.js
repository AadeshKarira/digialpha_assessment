const express = require('express');
const router = express.Router();
const logger = require('../../config/logger');
const model = require("../../models");

/* add user using sequalize*/ 
router.post('/', async(req, res) => {
    try 
    {
        let {first_name, last_name, email, phone} = req.body;
        let user = await model.Users.create({first_name, last_name, email, phone});
        if(user.id){
            res.status(200).send({status: true, statusCode: 200, message: "User added successfully", data: user});
        }
        else{
            res.status(400).send({status: false, statusCode: 400, message: "User not added successfully"});
        }
    }
    catch(err)
    {
        logger.logEvents("Error", err.stack);
        res.status(400).send({status: false, statusCode: 400, message: err.message}); 
    }
});

router.put('/', async(req, res) => {
    try 
    {
        let {id} = req.query;
        let user = await model.Users.update(req.body, {
			where: {
				id: id
			}
		});

        if(user[0]){
            res.status(200).send({status: true, statusCode: 200, message: "User updated successfully", data: user});
        }
        else{
            res.status(400).send({status: false, statusCode: 400, message: "User not updated successfully"});
        }
    }
    catch(err)
    {
        logger.logEvents("Error", err.stack);
        res.status(400).send({status: false, statusCode: 400, message: err.message}); 
    }
});


router.delete('/', async(req, res) => {
    try 
    {
        let {id} = req.query;
        let user = await model.Users.destroy({
            where: {
                id: id
            }
        });
        if(user){
            res.status(200).send({status: true, statusCode: 200, message: "User deleted successfully", data: user});
        }
        else{
            res.status(400).send({status: false, statusCode: 400, message: "User not deleted successfully"});
        }
    }
    catch(err)
    {
        logger.logEvents("Error", err.stack);
        res.status(400).send({status: false, statusCode: 400, message: err.message}); 
    }
});
// get user with one or more parameters
router.get('/', async(req, res) => {
    try
    {
        console.log(req.query)
        let user = await model.Users.findAll({
            where: req.query
        });
        if(user){
            res.status(200).send({status: true, statusCode: 200, message: "User fetched successfully", data: user});
        }
        else{
            res.status(400).send({status: false, statusCode: 400, message: "User not fetched successfully"});
        }
    }
    catch(err)
    {
        logger.logEvents("Error", err.stack);
        res.status(400).send({status: false, statusCode: 400, message: err.message}); 
    }
});


module.exports = router;