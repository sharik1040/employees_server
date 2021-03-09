const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User =  require('../models/User');

const saltRounds = 10

router.post('/register',async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
        user = new User({
            login: req.body.login,
            email: req.body.email,
            password: hashedPassword
        });

        await user.save();
        res.json(user);
    }
});

router.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email, login: req.body.login });
    if (!user) {
        return res.status(400).send('That user not already exisits!');
    }else {
        const result = await bcrypt.compare(req.body.password, user.password);

        if(result){
            const token = jwt.sign({ sub: user.id }, "TEST" , { expiresIn: '7d' });

            await user.save();
            res.json({user, token});
        }else{
            return res.status(400).send('Passwords don\'t match!');
        }
    }
});

module.exports = router;