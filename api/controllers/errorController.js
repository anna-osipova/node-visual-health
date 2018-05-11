const ACCESS_DENIED = 'Access denied';
const UNAUTHORIZED = 'Unauthorized';
const NOT_FOUND = 'User not found';

exports.ACCESS_DENIED = ACCESS_DENIED;
exports.UNAUTHORIZED = UNAUTHORIZED;
exports.NOT_FOUND = NOT_FOUND;

exports.sendError = function(err, res) {
    switch (err) {
        case ACCESS_DENIED: {
            res.status(403).json({ error: err });
            break;
        }
        case NOT_FOUND:
        default: {
            res.status(500).json({ error: err });
        }
    }
};
