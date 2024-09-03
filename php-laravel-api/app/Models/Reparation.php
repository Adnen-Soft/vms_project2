<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
class Reparation extends Model implements Auditable
{
	use \OwenIt\Auditing\Auditable;
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'reparation';
	

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
	protected $fillable = ["vehicule_id","panne_id","date","type","note","montant","fournisseur","photo","document","user_id"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				reparation.id LIKE ?  OR 
				reparation.vehicule_id LIKE ?  OR 
				reparation.type LIKE ?  OR 
				reparation.note LIKE ?  OR 
				reparation.fournisseur LIKE ?  OR 
				reparation.document LIKE ? 
		)';
		$search_params = [
			"%$text%","%$text%","%$text%","%$text%","%$text%","%$text%"
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
			"reparation.id AS id", 
			"reparation.vehicule_id AS vehicule_id", 
			"vehicule.immatricule AS vehicule_immatricule", 
			"reparation.panne_id AS panne_id", 
			"reparation.date AS date", 
			"reparation.type AS type", 
			"reparation.note AS note", 
			"reparation.montant AS montant", 
			"reparation.fournisseur AS fournisseur", 
			"reparation.photo AS photo", 
			"reparation.document AS document", 
			"reparation.date_created AS date_created", 
			"reparation.date_updated AS date_updated", 
			"reparation.user_id AS user_id" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"reparation.id AS id", 
			"reparation.vehicule_id AS vehicule_id", 
			"vehicule.immatricule AS vehicule_immatricule", 
			"reparation.panne_id AS panne_id", 
			"reparation.date AS date", 
			"reparation.type AS type", 
			"reparation.note AS note", 
			"reparation.montant AS montant", 
			"reparation.fournisseur AS fournisseur", 
			"reparation.photo AS photo", 
			"reparation.document AS document", 
			"reparation.date_created AS date_created", 
			"reparation.date_updated AS date_updated", 
			"reparation.user_id AS user_id" 
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
			"vehicule_id", 
			"date", 
			"type", 
			"note", 
			"montant", 
			"fournisseur", 
			"photo", 
			"document", 
			"date_created", 
			"date_updated", 
			"user_id", 
			"panne_id" 
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
			"vehicule_id", 
			"date", 
			"type", 
			"note", 
			"montant", 
			"fournisseur", 
			"photo", 
			"document", 
			"date_created", 
			"date_updated", 
			"user_id", 
			"panne_id" 
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
			"panne_id", 
			"date", 
			"type", 
			"note", 
			"montant", 
			"fournisseur", 
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
