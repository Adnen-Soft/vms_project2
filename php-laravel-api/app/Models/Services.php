<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
class Services extends Model implements Auditable
{
	use \OwenIt\Auditing\Auditable;
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'services';
	

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
	protected $fillable = ["vehicule_id","date","type","montant","fournisseur","note","image","document","user_id"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				services.id LIKE ?  OR 
				services.type LIKE ?  OR 
				services.fournisseur LIKE ?  OR 
				services.note LIKE ?  OR 
				services.document LIKE ? 
		)';
		$search_params = [
			"%$text%","%$text%","%$text%","%$text%","%$text%"
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
			"services.id AS id", 
			"services.vehicule_id AS vehicule_id", 
			"vehicule.immatricule AS vehicule_immatricule", 
			"services.date AS date", 
			"services.type AS type", 
			"services.montant AS montant", 
			"services.fournisseur AS fournisseur", 
			"services.note AS note", 
			"services.image AS image", 
			"services.document AS document", 
			"services.date_created AS date_created", 
			"services.date_updated AS date_updated", 
			"services.user_id AS user_id" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"services.id AS id", 
			"services.vehicule_id AS vehicule_id", 
			"vehicule.immatricule AS vehicule_immatricule", 
			"services.date AS date", 
			"services.type AS type", 
			"services.montant AS montant", 
			"services.fournisseur AS fournisseur", 
			"services.note AS note", 
			"services.image AS image", 
			"services.document AS document", 
			"services.date_created AS date_created", 
			"services.date_updated AS date_updated", 
			"services.user_id AS user_id" 
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
			"type", 
			"montant", 
			"fournisseur", 
			"note", 
			"image", 
			"document", 
			"date", 
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
			"type", 
			"montant", 
			"fournisseur", 
			"note", 
			"image", 
			"document", 
			"date", 
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
			"date", 
			"type", 
			"montant", 
			"fournisseur", 
			"note", 
			"image", 
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
