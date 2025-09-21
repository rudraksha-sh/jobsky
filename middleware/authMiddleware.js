
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // 1. Get token from header
    const authHeader = req.header('Authorization');

    // 2. Check if token exists and is in the correct format ('Bearer <token>')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    
    const token = authHeader.split(' ')[1];

    // 3. Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 4. Add user from payload to the request object
        req.user = decoded; // The payload contains { id: '...' }
        next();

    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
