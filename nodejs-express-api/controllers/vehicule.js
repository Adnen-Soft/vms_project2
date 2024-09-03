import { Router } from 'express';
import { body } from 'express-validator';
import uploader from '../helpers/uploader.js';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list vehicule records
 * @GET /vehicule/index/{fieldname}/{fieldvalue}
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
		const joinTables = []; // hold list of join tables
		joinTables.push({
			model: DB.Users,
			required: true,
			as: 'users',
			attributes: [], //already set via model class
		})
		query.include = joinTables;
		let search = req.query.search;
		if(search){
			let searchFields = DB.Vehicule.searchFields();
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
		query.attributes = DB.Vehicule.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Vehicule.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Vehicule record
 * @GET /vehicule/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		const joinTables = []; // hold list of join tables
		joinTables.push({
			model: DB.Users,
			required: true,
			as: 'users',
			attributes: [], //already set via model class
		})
		query.include = joinTables;
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Vehicule.viewFields();
		let record = await DB.Vehicule.findOne(query);
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
 * Route to insert Vehicule record
 * @POST /vehicule/add
 */
router.post('/add/', 
	[
		body('image').optional({nullable: true, checkFalsy: true}),
		body('immatricule').optional({nullable: true, checkFalsy: true}),
		body('marque').optional({nullable: true, checkFalsy: true}),
		body('nbr_places').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('nbr_chevaux').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('departement').optional({nullable: true, checkFalsy: true}),
		body('chauffeur').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.image !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.image, 'image');
			modeldata.image = fileInfo.filepath;
		}
		
		//save Vehicule record
		let record = await DB.Vehicule.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['id'];
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues: null, newValues });
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Vehicule record for edit
 * @GET /vehicule/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Vehicule.editFields();
		let record = await DB.Vehicule.findOne(query);
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
 * Route to update  Vehicule record
 * @POST /vehicule/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('image').optional({nullable: true, checkFalsy: true}),
		body('immatricule').optional({nullable: true, checkFalsy: true}),
		body('marque').optional({nullable: true, checkFalsy: true}),
		body('nbr_places').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('nbr_chevaux').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('departement').optional({nullable: true, checkFalsy: true}),
		body('chauffeur').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.image !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.image, 'image');
			modeldata.image = fileInfo.filepath;
		}
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Vehicule.editFields();
		let record = await DB.Vehicule.findOne(query);
		if(!record){
			return res.notFound();
		}
		const oldValues = JSON.stringify(record); //for audit trail
		await DB.Vehicule.update(modeldata, {where: where});
		record = await DB.Vehicule.findOne(query);//for audit trail
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues, newValues });
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Vehicule record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /vehicule/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Vehicule.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
			const oldValues = JSON.stringify(record); //for audit trail
			req.writeToAuditLog({ recid: record['id'], oldValues });
		});
		await DB.Vehicule.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
