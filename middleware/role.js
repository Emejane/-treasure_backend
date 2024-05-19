module.exports = function (roles) {
    return (req, res, next) => {
        if (!req.user || !req.user.roles || !roles.some(role => req.user.roles.includes(role))) {
            return res.status(403).json({ msg: 'Access denied' });
        }
        next();
    };
};
