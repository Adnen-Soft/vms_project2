import { Router } from 'express';
import { body } from 'express-validator';
import uploader from '../helpers/uploader.js';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list fournisseurs records
 * @GET /fournisseurs/index/{fieldname}/{fieldvalue}
 */
router.get(['/', '/index/:fieldname?/:fieldvalue?'], async (req, res) => {  
	try{
		const query = {};
		let queryFilters = [];
		let where = {};
		let replacements = {};
		let fieldName = req.params.fieldname;
		let fieldValue = req.params.fieldvalue;
		
		if (fieldName){
			queryFilters.push(DB.filterBy(fieldName, fieldValue));
		}
		let search = req.query.search;
		if(search){
			let searchFields = DB.Fournisseurs.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'id', 'desc');
		query.attributes = DB.Fournisseurs.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Fournisseurs.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Fournisseurs record
 * @GET /fournisseurs/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Fournisseurs.viewFields();
		let record = await DB.Fournisseurs.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to insert Fournisseurs record
 * @POST /fournisseurs/add
 */
router.post('/add/', 
	[
		body('nom').optional({nullable: true, checkFalsy: true}),
		body('type').optional({nullable: true, checkFalsy: true}),
		body('telephone').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('adresse').optional({nullable: true, checkFalsy: true}),
		body('note').optional({nullable: true, checkFalsy: true}),
		body('photo').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.photo !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.photo, 'photo');
			modeldata.photo = fileInfo.filepath;
		}
		
		//save Fournisseurs record
		let record = await DB.Fournisseurs.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Fournisseurs record for edit
 * @GET /fournisseurs/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Fournisseurs.editFields();
		let record = await DB.Fournisseurs.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to update  Fournisseurs record
 * @POST /fournisseurs/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('nom').optional({nullable: true, checkFalsy: true}),
		body('type').optional({nullable: true, checkFalsy: true}),
		body('telephone').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('adresse').optional({nullable: true, checkFalsy: true}),
		body('note').optional({nullable: true, checkFalsy: true}),
		body('photo').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.photo !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.photo, 'photo');
			modeldata.photo = fileInfo.filepath;
		}
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Fournisseurs.editFields();
		let record = await DB.Fournisseurs.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.Fournisseurs.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Fournisseurs record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /fournisseurs/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Fournisseurs.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.Fournisseurs.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
