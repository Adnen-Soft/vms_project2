import { Router } from 'express';
import DB from '../models/db.js';
const router = Router();
/**
 * Route to view user account record
 * @GET /account
 */
router.get(['/','/index'], async (req, res) => {
	try{
		let recid = req.user.id;
		let query = {};
		let where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Users.accountviewFields();
		let record = await DB.Users.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});
router.get('/currentuserdata', async function (req, res)
{
	const user = req.user;
    return res.ok(user);
});
export default router;
