<?php 
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Requests\ReparationAddRequest;
use App\Http\Requests\ReparationEditRequest;
use App\Models\Reparation;
use Illuminate\Http\Request;
use Exception;
class ReparationController extends Controller
{
	

	/**
     * List table records
	 * @param  \Illuminate\Http\Request
     * @param string $fieldname //filter records by a table field
     * @param string $fieldvalue //filter value
     * @return \Illuminate\View\View
     */
	function index(Request $request, $fieldname = null , $fieldvalue = null){
		$query = Reparation::query();
		if($request->search){
			$search = trim($request->search);
			Reparation::search($query, $search);
		}
		$query->join("vehicule", "reparation.vehicule_id", "=", "vehicule.id");
		$orderby = $request->orderby ?? "reparation.id";
		$ordertype = $request->ordertype ?? "desc";
		$query->orderBy($orderby, $ordertype);
		if($fieldname){
			$query->where($fieldname , $fieldvalue); //filter by a single field name
		}
		$records = $this->paginate($query, Reparation::listFields());
		return $this->respond($records);
	}
	

	/**
     * Select table record by ID
	 * @param string $rec_id
     * @return \Illuminate\View\View
     */
	function view($rec_id = null){
		$query = Reparation::query();
		$record = $query->findOrFail($rec_id, Reparation::viewFields());
		return $this->respond($record);
	}
	

	/**
     * Save form record to the table
     * @return \Illuminate\Http\Response
     */
	function add(ReparationAddRequest $request){
		$modeldata = $request->validated();
		
		if( array_key_exists("photo", $modeldata) ){
			//move uploaded file from temp directory to destination directory
			$fileInfo = $this->moveUploadedFiles($modeldata['photo'], "photo");
			$modeldata['photo'] = $fileInfo['filepath'];
		}
		
		if( array_key_exists("document", $modeldata) ){
			//move uploaded file from temp directory to destination directory
			$fileInfo = $this->moveUploadedFiles($modeldata['document'], "document");
			$modeldata['document'] = $fileInfo['filepath'];
		}
		
		//save Reparation record
		$record = Reparation::create($modeldata);
		$rec_id = $record->id;
		return $this->respond($record);
	}
	

	/**
     * Update table record with form data
	 * @param string $rec_id //select record by table primary key
     * @return \Illuminate\View\View;
     */
	function edit(ReparationEditRequest $request, $rec_id = null){
		$query = Reparation::query();
		$record = $query->findOrFail($rec_id, Reparation::editFields());
		if ($request->isMethod('post')) {
			$modeldata = $request->validated();
		
		if( array_key_exists("photo", $modeldata) ){
			//move uploaded file from temp directory to destination directory
			$fileInfo = $this->moveUploadedFiles($modeldata['photo'], "photo");
			$modeldata['photo'] = $fileInfo['filepath'];
		}
		
		if( array_key_exists("document", $modeldata) ){
			//move uploaded file from temp directory to destination directory
			$fileInfo = $this->moveUploadedFiles($modeldata['document'], "document");
			$modeldata['document'] = $fileInfo['filepath'];
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
		$query = Reparation::query();
		$query->whereIn("id", $arr_id);
		//to raise audit trail delete event, use Eloquent find before delete
		$query->get()->each(function ($record, $key) {
			$record->delete();
		});
		return $this->respond($arr_id);
	}
}
