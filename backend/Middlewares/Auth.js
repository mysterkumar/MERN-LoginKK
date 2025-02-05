// This is not required right now but when we need data of a specific user "shyaam" we will fetch that by confirming that the 
// jwt token is right.

const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req,res,next) => {
    const auth = req.headers['authorization'];
    if (!auth){
        return res.status(403)
            .json({message: 'Unauthorized, JWT token is require'});
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403)
            .json({message: 'Unauthorized, JWT token wrong or expired'});
    }
}

module.exports = ensureAuthenticated;