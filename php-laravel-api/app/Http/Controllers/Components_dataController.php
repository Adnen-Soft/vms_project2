<?php 
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
/**
 * Components Data Contoller
 * Use for getting values from the database for page components
 * Support raw query builder
 * @category Controller
 */
class Components_dataController extends Controller{
	public function __construct()
    {
        $this->middleware('auth:api', ['except' => []]);
    }
	/**
     * vehicle_option_list Model Action
     * @return array
     */
	function vehicle_option_list(Request $request){
		$sqltext = "SELECT  DISTINCT id AS value,immatricule AS label,marque AS caption,image AS image FROM vehicule ORDER BY id ASC";
		$query_params = [];
		$arr = DB::select($sqltext, $query_params);
		return $arr;
	}
	/**
     * role_id_option_list Model Action
     * @return array
     */
	function role_id_option_list(Request $request){
		$sqltext = "SELECT role_id as value, role_name as label FROM roles";
		$query_params = [];
		$arr = DB::select($sqltext, $query_params);
		return $arr;
	}
	/**
     * vehicule_id_option_list Model Action
     * @return array
     */
	function vehicule_id_option_list(Request $request){
		$sqltext = "SELECT  DISTINCT id AS value,immatricule AS label FROM vehicule ORDER BY id ASC";
		$query_params = [];
		$arr = DB::select($sqltext, $query_params);
		return $arr;
	}
	/**
     * panne_id_option_list Model Action
     * @return array
     */
	function panne_id_option_list(Request $request){
		$sqltext = "SELECT  DISTINCT id AS value,date AS label,note AS caption,photo AS image FROM panne ORDER BY id ASC";
		$query_params = [];
		$arr = DB::select($sqltext, $query_params);
		return $arr;
	}
	/**
     * departement_option_list Model Action
     * @return array
     */
	function departement_option_list(Request $request){
		$sqltext = "SELECT  DISTINCT nom AS value,nom AS label FROM departement ORDER BY id ASC";
		$query_params = [];
		$arr = DB::select($sqltext, $query_params);
		return $arr;
	}
	/**
     * chauffeur_option_list Model Action
     * @return array
     */
	function chauffeur_option_list(Request $request){
		$sqltext = "SELECT  DISTINCT id AS value,username AS label,email AS caption,photo AS image FROM users ORDER BY id ASC";
		$query_params = [];
		$arr = DB::select($sqltext, $query_params);
		return $arr;
	}
	/**
	* barchart_kilometrage Model Action
	* @return array
	*/
	function barchart_kilometrage(Request $request){
		$chart_data  = [];
		$sqltext = "SELECT  kilometrage.compteur, vehicule.immatricule FROM kilometrage JOIN vehicule ON kilometrage.vehicule_id=vehicule.id";
		$query_params = [];
		$records = DB::select($sqltext, $query_params);
		$chart_labels = array_column($records, 'immatricule');
		$datasets = [];
		$dataset1 = [
			'data' =>  array_column($records, 'compteur'),
			'label' => "",
			'backgroundColor' =>  random_color(), 
			'borderColor' =>  random_color(), 
			'borderWidth' => '2',
		];
		$datasets[] = $dataset1;
		$chart_data['datasets'] = $datasets;
		$chart_data['labels'] = $chart_labels;
		return $chart_data;
	}
	/**
	* barchart_comsommationdecarburant Model Action
	* @return array
	*/
	function barchart_comsommationdecarburant(Request $request){
		$chart_data  = [];
		$sqltext = "SELECT  MONTHNAME(carburant.date) AS monthname_of_date, SUM(carburant.montant) AS sum_of_montant FROM carburant GROUP BY monthname_of_date";
		$query_params = [];
		$records = DB::select($sqltext, $query_params);
		$chart_labels = array_column($records, 'monthname_of_date');
		$datasets = [];
		$dataset1 = [
			'data' =>  array_column($records, 'sum_of_montant'),
			'label' => "",
			'backgroundColor' =>  random_color(), 
			'borderColor' =>  random_color(), 
			'borderWidth' => '2',
		];
		$datasets[] = $dataset1;
		$chart_data['datasets'] = $datasets;
		$chart_data['labels'] = $chart_labels;
		return $chart_data;
	}
}
