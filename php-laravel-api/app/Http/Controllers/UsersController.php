<?php 
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Requests\UsersAccountEditRequest;
use App\Http\Requests\UsersAddRequest;
use App\Http\Requests\UsersEditRequest;
use App\Models\Users;
use Illuminate\Http\Request;
use Exception;
class UsersController extends Controller
{
	

	/**
     * List table records
	 * @param  \Illuminate\Http\Request
     * @param string $fieldname //filter records by a table field
     * @param string $fieldvalue //filter value
     * @return \Illuminate\View\View
     */
	function index(Request $request, $fieldname = null , $fieldvalue = null){
		$query = Users::query();
		if($request->search){
			$search = trim($request->search);
			Users::search($query, $search);
		}
		$orderby = $request->orderby ?? "users.id";
		$ordertype = $request->ordertype ?? "desc";
		$query->orderBy($orderby, $ordertype);
		if($fieldname){
			$query->where($fieldname , $fieldvalue); //filter by a single field name
		}
		$records = $this->paginate($query, Users::listFields());
		return $this->respond($records);
	}
	

	/**
     * Select table record by ID
	 * @param string $rec_id
     * @return \Illuminate\View\View
     */
	function view($rec_id = null){
		$query = Users::query();
		$record = $query->findOrFail($rec_id, Users::viewFields());
		return $this->respond($record);
	}
}
