<?php 
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Requests\VehiculeAddRequest;
use App\Http\Requests\VehiculeEditRequest;
use App\Models\Vehicule;
use Illuminate\Http\Request;
use Exception;
class VehiculeController extends Controller
{
	

	/**
     * List table records
	 * @param  \Illuminate\Http\Request
     * @param string $fieldname //filter records by a table field
     * @param string $fieldvalue //filter value
     * @return \Illuminate\View\View
     */
	function index(Request $request, $fieldname = null , $fieldvalue = null){
		$query = Vehicule::query();
		if($request->search){
			$search = trim($request->search);
			Vehicule::search($query, $search);
		}
		$query->join("users", "vehicule.chauffeur", "=", "users.id");
		$orderby = $request->orderby ?? "vehicule.id";
		$ordertype = $request->ordertype ?? "desc";
		$query->orderBy($orderby, $ordertype);
		if($fieldname){
			$query->where($fieldname , $fieldvalue); //filter by a single field name
		}
		$records = $this->paginate($query, Vehicule::listFields());
		return $this->respond($records);
	}
	

	/**
     * Select table record by ID
	 * @param string $rec_id
     * @return \Illuminate\View\View
     */
	function view($rec_id = null){
		$query = Vehicule::query();
		$query->join("users", "vehicule.chauffeur", "=", "users.id");
		$record = $query->findOrFail($rec_id, Vehicule::viewFields());
		return $this->respond($record);
	}
	

	/**
     * Save form record to the table
     * @return \Illuminate\Http\Response
     */
	function add(VehiculeAddRequest $request){
		$modeldata = $request->validated();
		
		if( array_key_exists("image", $modeldata) ){
			//move uploaded file from temp directory to destination directory
			$fileInfo = $this->moveUploadedFiles($modeldata['image'], "image");
			$modeldata['image'] = $fileInfo['filepath'];
		}
		
		//save Vehicule record
		$record = Vehicule::create($modeldata);
		$rec_id = $record->id;
		return $this->respond($record);
	}
	

	/**
     * Update table record with form data
	 * @param string $rec_id //select record by table primary key
     * @return \Illuminate\View\View;
     */
	function edit(VehiculeEditRequest $request, $rec_id = null){
		$query = Vehicule::query();
		$record = $query->findOrFail($rec_id, Vehicule::editFields());
		if ($request->isMethod('post')) {
			$modeldata = $request->validated();
		
		if( array_key_exists("image", $modeldata) ){
			//move uploaded file from temp directory to destination directory
			$fileInfo = $this->moveUploadedFiles($modeldata['image'], "image");
			$modeldata['image'] = $fileInfo['filepath'];
		}
			$record->update($modeldata);
		}
		return $this->respond($record);
	}
	

	/**
     * Delete record from the database
	 * Support multi delete by separating record id by comma.
	 * @param  \Illuminate\Http\Request
	 * @param string $rec_id //can be separated by comma 
     * @return \Illuminate\Http\Response
     */
	function delete(Request $request, $rec_id = null){
		$arr_id = explode(",", $rec_id);
		$query = Vehicule::query();
		$query->whereIn("id", $arr_id);
		//to raise audit trail delete event, use Eloquent find before delete
		$query->get()->each(function ($record, $key) {
			$record->delete();
		});
		return $this->respond($arr_id);
	}
}
