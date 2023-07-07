const express = require('express');
const router = express.Router();
const Users = require('../../models/Users');

// route to (GET) ALL THE USERS
router.get('/', async (req, res) => {
    try {
        const userData = await Users.findAll();
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// (GET) user by id
router.get('/:id', async (req, res) => {
    try {
        const userData = await Users.findByPk(req.params.id);
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// (DELETE) user by id
router.delete('/:id', async (req, res) => {
    try {
        const userData = await Users.findByPk(req.params.id);
        await Users.destroy({
            where: {
                user_id: req.params.id
            }
        });
        res.status(200).json("Deleted user: ", + userData);
    } catch (err) {
        res.status(500).json("User not found " + err);
    }
});


// Create User (POST)
router.post('/', (req, res) => {
    try {
        const userData = Users.create({
            user_name: req.body.user_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            mobile_phone: req.body.mobile_phone
        })
        res.status(200).json("User created: " + userData);
    } catch(err) {
        res.status(500).json("Something went wrong: " + err);
    }

})

// (UPDATE) user by id
router.put('/:id', async (req, res) => {
    try {
        const userData = await Users.update(
            {
                user_name: req.body.user_name,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                mobile_phone: req.body.mobile_phone
            },
            {
                where: {
                    user_id: req.params.id
                }
            }
        );
        res.status(200).json("Updated user: ", + userData);

    } catch (err) {
        res.status(500).json("User not found " + err);
    }
})
module.exports = router;