import { Router } from 'express';
import { body } from 'express-validator';
import uploader from '../helpers/uploader.js';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list services records
 * @GET /services/index/{fieldname}/{fieldvalue}
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
			model: DB.Vehicule,
			required: true,
			as: 'vehicule',
			attributes: [], //already set via model class
		})
		query.include = joinTables;
		let search = req.query.search;
		if(search){
			let searchFields = DB.Services.searchFields();
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
		query.attributes = DB.Services.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Services.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Services record
 * @GET /services/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Services.viewFields();
		let record = await DB.Services.findOne(query);
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
 * Route to insert Services record
 * @POST /services/add
 */
router.post('/add/', 
	[
		body('vehicule_id').optional({nullable: true, checkFalsy: true}),
		body('date').optional({nullable: true, checkFalsy: true}),
		body('type').optional({nullable: true, checkFalsy: true}),
		body('montant').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('fournisseur').optional({nullable: true, checkFalsy: true}),
		body('note').optional({nullable: true, checkFalsy: true}),
		body('image').optional({nullable: true, checkFalsy: true}),
		body('document').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.image !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.image, 'image');
			modeldata.image = fileInfo.filepath;
		}
		
		//save Services record
		let record = await DB.Services.create(modeldata);
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
 * Route to get  Services record for edit
 * @GET /services/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Services.editFields();
		let record = await DB.Services.findOne(query);
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
 * Route to update  Services record
 * @POST /services/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('vehicule_id').optional({nullable: true, checkFalsy: true}),
		body('date').optional({nullable: true, checkFalsy: true}),
		body('type').optional({nullable: true, checkFalsy: true}),
		body('montant').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('fournisseur').optional({nullable: true, checkFalsy: true}),
		body('note').optional({nullable: true, checkFalsy: true}),
		body('image').optional({nullable: true, checkFalsy: true}),
		body('document').optional({nullable: true, checkFalsy: true}),
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
		query.attributes = DB.Services.editFields();
		let record = await DB.Services.findOne(query);
		if(!record){
			return res.notFound();
		}
		const oldValues = JSON.stringify(record); //for audit trail
		await DB.Services.update(modeldata, {where: where});
		record = await DB.Services.findOne(query);//for audit trail
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues, newValues });
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Services record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /services/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Services.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
			const oldValues = JSON.stringify(record); //for audit trail
			req.writeToAuditLog({ recid: record['id'], oldValues });
		});
		await DB.Services.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
