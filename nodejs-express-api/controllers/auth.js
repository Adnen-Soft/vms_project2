import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import config from '../config.js';
import utils from '../helpers/utils.js';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();


/**
 * Route to login user using credential
 * @POST /auth/login
 */
router.post('/login', [
		body('username').trim().not().isEmpty(),
		body('password').not().isEmpty(),
	], validateFormData, async (req, res, next) => {
	try{
		let { username, password } = req.body;
		
		let user = await DB.Users.findOne({where: {[DB.op.or]: {email: username, username: username}}});
		if(!user){
			return res.unauthorized("Nom d'utilisateur ou mot de passe incorrect!");
		}
		if(!utils.passwordVerify(password, user.password)){
			return res.unauthorized("Nom d'utilisateur ou mot de passe incorrect!");
		}
		
		
		req.writeToAuditLog({ recid: user['id'] });
		let loginData = await getUserLoginData(user);
		return res.ok(loginData);
	}
	catch(err){
		return res.serverError(err);
	}
});









/**
 * Return user login data
 * generate a signed jwt for the user
 * @param {object} user - current user
 */
async function getUserLoginData(user){
	const expiresIn = config.auth.jwtDuration + 'm' //in minutes;
	const userid = user.id;
	const token = jwt.sign({ sub: userid }, config.auth.apiTokenSecret, { expiresIn });
	return { token }; //return user object and token
}


/**
 * Generate user auth token
 * @param {object} user - current user
 */
function generateUserToken(user){
	const expiresIn = '10m' //in minutes;
	const userid = user.id;
	const token = jwt.sign({ sub: userid }, config.auth.userTokenSecret, { expiresIn });
	return token;
}


/**
 * Get userid from jwt token
 * @param {string} token
 */
function getUserIDFromJwt(token){
	try {
		let decoded = jwt.verify(token, config.auth.userTokenSecret);
		return decoded.sub
	}
	catch (err) {
		throw new Error(err);
	}
}
export default router;
