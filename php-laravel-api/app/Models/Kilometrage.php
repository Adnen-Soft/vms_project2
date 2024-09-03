<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
class Kilometrage extends Model implements Auditable
{
	use \OwenIt\Auditing\Auditable;
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'kilometrage';
	

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
	protected $fillable = ["vehicule_id","compteur","date","user_id"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				kilometrage.id LIKE ?  OR 
				kilometrage.date LIKE ?  OR 
				kilometrage.compteur LIKE ? 
		)';
		$search_params = [
			"%$text%","%$text%","%$text%"
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
			"kilometrage.id AS id", 
			"kilometrage.date AS date", 
			"kilometrage.vehicule_id AS vehicule_id", 
			"vehicule.immatricule AS vehicule_immatricule", 
			"kilometrage.compteur AS compteur" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"kilometrage.id AS id", 
			"kilometrage.date AS date", 
			"kilometrage.vehicule_id AS vehicule_id", 
			"vehicule.immatricule AS vehicule_immatricule", 
			"kilometrage.compteur AS compteur" 
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
			"compteur", 
			"date_created", 
			"date_updated", 
			"user_id" 
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
			"compteur", 
			"date_created", 
			"date_updated", 
			"user_id" 
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
			"compteur", 
			"date", 
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
