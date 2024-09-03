import { Router } from 'express';
import utils from '../helpers/utils.js';
import DB from '../models/db.js';


const router = Router();


 /**
 * Route to get vehicle_option_list records
 * @GET /components_data/vehicle_option_list
 */
router.get('/vehicle_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT id AS value,immatricule AS label,marque AS caption,image AS image FROM vehicule ORDER BY id ASC` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get role_id_option_list records
 * @GET /components_data/role_id_option_list
 */
router.get('/role_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT role_id as value, role_name as label FROM roles` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get vehicule_id_option_list records
 * @GET /components_data/vehicule_id_option_list
 */
router.get('/vehicule_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT id AS value,immatricule AS label FROM vehicule ORDER BY id ASC` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get panne_id_option_list records
 * @GET /components_data/panne_id_option_list
 */
router.get('/panne_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT id AS value,date AS label,note AS caption,photo AS image FROM panne ORDER BY id ASC` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get departement_option_list records
 * @GET /components_data/departement_option_list
 */
router.get('/departement_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT nom AS value,nom AS label FROM departement ORDER BY id ASC` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get chauffeur_option_list records
 * @GET /components_data/chauffeur_option_list
 */
router.get('/chauffeur_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT id AS value,username AS label,email AS caption,photo AS image FROM users ORDER BY id ASC` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get barchart_kilometrage records
 * @GET /components_data/barchart_kilometrage
 */
router.get('/barchart_kilometrage',  async (req, res) => {
	let chartData = { labels:[], datasets:[] };
	try{
		let sqltext = `SELECT  kilometrage.compteur, vehicule.immatricule FROM kilometrage JOIN vehicule ON kilometrage.vehicule_id=vehicule.id` ;
		
		let records = await DB.rawQueryList(sqltext);
		chartData['labels'] = records.map(function(v){ return v.immatricule });
		let dataset1 = {
			data: records.map(function(v){ return parseFloat(v.compteur) }),
			label: "",
			backgroundColor: utils.randomColor(), 
			borderColor: utils.randomColor(), 
			borderWidth: "2",
		};
		chartData.datasets.push(dataset1);
		return res.ok(chartData) ;
	}
	catch(err) {
		return res.serverError(err);
	}
});


 /**
 * Route to get barchart_comsommationdecarburant records
 * @GET /components_data/barchart_comsommationdecarburant
 */
router.get('/barchart_comsommationdecarburant',  async (req, res) => {
	let chartData = { labels:[], datasets:[] };
	try{
		let sqltext = `SELECT  MONTHNAME(carburant.date) AS monthname_of_date, SUM(carburant.montant) AS sum_of_montant FROM carburant GROUP BY monthname_of_date` ;
		
		let records = await DB.rawQueryList(sqltext);
		chartData['labels'] = records.map(function(v){ return v.monthname_of_date });
		let dataset1 = {
			data: records.map(function(v){ return parseFloat(v.sum_of_montant) }),
			label: "",
			backgroundColor: utils.randomColor(), 
			borderColor: utils.randomColor(), 
			borderWidth: "2",
		};
		chartData.datasets.push(dataset1);
		return res.ok(chartData) ;
	}
	catch(err) {
		return res.serverError(err);
	}
});
export default router;
