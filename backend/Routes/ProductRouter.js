// This is not required right now but when we need data of a specific user "shyaam" we will fetch that by confirming that the 
// jwt token is right.

const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req,res) => {

    //currently this is hardcoded but we can use it our way
    console.log('logged in user details', req.user);
    res.status(200).json([
        {
            name: "resume1",
            date: "12 jan"
        },
        {
            name: "resume2",
            date: "22 jan"
        },
        {
            name: "resume3",
            date: "23 aug"
        }
    ])
});

module.exports = router;