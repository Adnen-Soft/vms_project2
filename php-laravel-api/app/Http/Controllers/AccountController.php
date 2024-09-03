<?php 
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Users;
use App\Http\Requests\UsersAccountEditRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Exception;
/**
 * Account Page Controller
 * @category  Controller
 */
class AccountController extends Controller{
	

	/**
     * Select user account data
     * @return \Illuminate\View\View
     */
	function index(){
		$rec_id = Auth::id();
		$query = Users::query();
		$record = $query->findOrFail($rec_id,  Users::accountviewFields());
		return $this->respond($record);
	}
	function currentuserdata(){
		$user = auth()->user();
		return $this->respond($user);
	}
}
