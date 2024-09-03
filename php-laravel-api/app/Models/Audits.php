<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Audits extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'audits';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'log_id';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = [];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				log_id LIKE ?  OR 
				action LIKE ?  OR 
				page LIKE ?  OR 
				record_id LIKE ?  OR 
				user_id LIKE ?  OR 
				user_ip LIKE ?  OR 
				user_agent LIKE ?  OR 
				request_url LIKE ?  OR 
				old_values LIKE ?  OR 
				new_values LIKE ? 
		)';
		$search_params = [
			"%$text%","%$text%","%$text%","%$text%","%$text%","%$text%","%$text%","%$text%","%$text%","%$text%"
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
			"log_id", 
			"action", 
			"page", 
			"record_id", 
			"user_id", 
			"user_ip", 
			"user_agent", 
			"request_url", 
			"old_values", 
			"new_values", 
			"timestamp" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"log_id", 
			"action", 
			"page", 
			"record_id", 
			"user_id", 
			"user_ip", 
			"user_agent", 
			"request_url", 
			"old_values", 
			"new_values", 
			"timestamp" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"log_id", 
			"action", 
			"page", 
			"record_id", 
			"user_id", 
			"user_ip", 
			"user_agent", 
			"request_url", 
			"old_values", 
			"new_values", 
			"timestamp" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"log_id", 
			"action", 
			"page", 
			"record_id", 
			"user_id", 
			"user_ip", 
			"user_agent", 
			"request_url", 
			"old_values", 
			"new_values", 
			"timestamp" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
