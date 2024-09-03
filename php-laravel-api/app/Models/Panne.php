<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
class Panne extends Model implements Auditable
{
	use \OwenIt\Auditing\Auditable;
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'panne';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'id';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["vehicule_id","date","type","description","statut","priorite","user_id","photo","document"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				panne.id LIKE ?  OR 
				panne.vehicule_id LIKE ?  OR 
				panne.type LIKE ?  OR 
				panne.statut LIKE ?  OR 
				panne.description LIKE ?  OR 
				panne.priorite LIKE ?  OR 
				panne.document LIKE ? 
		)';
		$search_params = [
			"%$text%","%$text%","%$text%","%$text%","%$text%","%$text%","%$text%"
		];
		//setting search conditions
		$query->whereRaw($search_condition, $search_params);
	}
	

	/**
     * return list page fields of the model.
     * 
     * @return array
     */
	public static function listFields(){
		return [ 
			"panne.id AS id", 
			"panne.vehicule_id AS vehicule_id", 
			"vehicule.immatricule AS vehicule_immatricule", 
			"panne.date AS date", 
			"panne.type AS type", 
			"panne.statut AS statut", 
			"panne.photo AS photo", 
			"panne.description AS description", 
			"panne.priorite AS priorite", 
			"panne.document AS document" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"panne.id AS id", 
			"panne.vehicule_id AS vehicule_id", 
			"vehicule.immatricule AS vehicule_immatricule", 
			"panne.date AS date", 
			"panne.type AS type", 
			"panne.statut AS statut", 
			"panne.photo AS photo", 
			"panne.description AS description", 
			"panne.priorite AS priorite", 
			"panne.document AS document" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"id", 
			"date", 
			"type", 
			"photo", 
			"vehicule_id", 
			"date_created", 
			"date_updated", 
			"user_id", 
			"statut", 
			"description", 
			"priorite", 
			"document" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"id", 
			"date", 
			"type", 
			"photo", 
			"vehicule_id", 
			"date_created", 
			"date_updated", 
			"user_id", 
			"statut", 
			"description", 
			"priorite", 
			"document" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"vehicule_id", 
			"date", 
			"type", 
			"description", 
			"statut", 
			"priorite", 
			"photo", 
			"document", 
			"id" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = true;
	const CREATED_AT = 'date_created'; 
	const UPDATED_AT = 'date_updated'; 
	

	/**
     * Audit log events
     * 
     * @var array
     */
	protected $auditEvents = ['created', 'updated', 'deleted'];
}
