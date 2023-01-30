require("dotenv").config();
const jwt = require("jsonwebtoken");


module.exports = {
    verifyToken(req, res, next) {
        let tokenHeader = req.headers['authorization'];
		if (tokenHeader == undefined) {
			return res.status(500).send({
				auth: false,
				message: "Error",
				errors: "Token Invalid or Null",
			});
		}

		if (tokenHeader.split(" ")[0] !== "Bearer") {
			return res.status(500).send({
				auth: false,
				message: "Error",
				errors: "Incorrect token format",
			});
		}

		let token = tokenHeader.split(" ")[1];

		if (!token) {
			return res.status(403).send({
				auth: false,
				message: "Error",
				errors: "No token provided",
			});
		}

		jwt.verify(token, process.env.KEY, (err, decoded) => {
			if (err) {
				return res.status(500).send({
					auth: false,
					message: "Error",
					errors: err,
				});
			}
			req.id = parseInt(decoded.id);
			next();
		});
    }
}
