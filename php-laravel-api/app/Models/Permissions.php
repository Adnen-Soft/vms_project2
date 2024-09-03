<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Permissions extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'permissions';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'permission_id';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["permission","role_id"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				permissions.permission_id LIKE ?  OR 
				permissions.permission LIKE ? 
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
			"permissions.permission_id AS permission_id", 
			"permissions.permission AS permission", 
			"permissions.role_id AS role_id", 
			"roles.role_name AS roles_role_name" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"permissions.permission_id AS permission_id", 
			"permissions.permission AS permission", 
			"permissions.role_id AS role_id", 
			"roles.role_name AS roles_role_name" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"permission_id", 
			"permission", 
			"role_id" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"permission_id", 
			"permission", 
			"role_id" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"permission", 
			"role_id", 
			"permission_id" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
