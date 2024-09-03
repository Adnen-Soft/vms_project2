<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
class Carburant extends Model implements Auditable
{
	use \OwenIt\Auditing\Auditable;
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'carburant';
	

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
	protected $fillable = ["vehicle","date","type","quantity","montant","fournisseur","photo","document","commentaire","user_id"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				carburant.vehicle LIKE ?  OR 
				carburant.date LIKE ?  OR 
				carburant.quantity LIKE ?  OR 
				carburant.type LIKE ?  OR 
				carburant.montant LIKE ?  OR 
				carburant.fournisseur LIKE ? 
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
			"carburant.id AS id", 
			"carburant.vehicle AS vehicle", 
			"vehicule.immatricule AS vehicule_immatricule", 
			"carburant.date AS date", 
			"carburant.quantity AS quantity", 
			"carburant.type AS type", 
			"carburant.montant AS montant", 
			"carburant.fournisseur AS fournisseur" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"carburant.id AS id", 
			"carburant.vehicle AS vehicle", 
			"vehicule.immatricule AS vehicule_immatricule", 
			"carburant.date AS date", 
			"carburant.quantity AS quantity", 
			"carburant.type AS type", 
			"carburant.montant AS montant", 
			"carburant.fournisseur AS fournisseur" 
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
			"vehicle", 
			"date", 
			"montant", 
			"fournisseur", 
			"photo", 
			"document", 
			"commentaire", 
			"date_created", 
			"date_updated", 
			"user_id", 
			"quantity", 
			"type" 
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
			"vehicle", 
			"date", 
			"montant", 
			"fournisseur", 
			"photo", 
			"document", 
			"commentaire", 
			"date_created", 
			"date_updated", 
			"user_id", 
			"quantity", 
			"type" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"vehicle", 
			"date", 
			"type", 
			"quantity", 
			"montant", 
			"fournisseur", 
			"photo", 
			"document", 
			"commentaire", 
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
