<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
class Vehicule extends Model implements Auditable
{
	use \OwenIt\Auditing\Auditable;
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'vehicule';
	

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
	protected $fillable = ["image","immatricule","marque","nbr_places","nbr_chevaux","departement","chauffeur","user_id"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				vehicule.immatricule LIKE ?  OR 
				vehicule.marque LIKE ? 
		)';
		$search_params = [
			"%$text%","%$text%"
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
			"vehicule.image AS image", 
			"vehicule.immatricule AS immatricule", 
			"vehicule.marque AS marque", 
			"vehicule.nbr_places AS nbr_places", 
			"vehicule.nbr_chevaux AS nbr_chevaux", 
			"vehicule.departement AS departement", 
			"vehicule.chauffeur AS chauffeur", 
			"users.username AS users_username", 
			"vehicule.id AS id" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"vehicule.image AS image", 
			"vehicule.immatricule AS immatricule", 
			"vehicule.marque AS marque", 
			"vehicule.nbr_places AS nbr_places", 
			"vehicule.nbr_chevaux AS nbr_chevaux", 
			"vehicule.departement AS departement", 
			"vehicule.chauffeur AS chauffeur", 
			"users.username AS users_username", 
			"vehicule.id AS id" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"vehicule.image AS image", 
			"vehicule.immatricule AS immatricule", 
			"vehicule.nbr_places AS nbr_places", 
			"vehicule.marque AS marque", 
			"vehicule.departement AS departement", 
			"vehicule.chauffeur AS chauffeur", 
			"users.username AS users_username", 
			"vehicule.nbr_chevaux AS nbr_chevaux", 
			"vehicule.user_id AS user_id", 
			"vehicule.id AS id" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"vehicule.image AS image", 
			"vehicule.immatricule AS immatricule", 
			"vehicule.nbr_places AS nbr_places", 
			"vehicule.marque AS marque", 
			"vehicule.departement AS departement", 
			"vehicule.chauffeur AS chauffeur", 
			"users.username AS users_username", 
			"vehicule.nbr_chevaux AS nbr_chevaux", 
			"vehicule.user_id AS user_id", 
			"vehicule.id AS id" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"image", 
			"immatricule", 
			"marque", 
			"nbr_places", 
			"nbr_chevaux", 
			"departement", 
			"chauffeur", 
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
