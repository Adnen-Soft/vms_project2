<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// api routes that need auth

Route::middleware(['auth:api'])->group(function () {


/* routes for Audits Controller  */	
	Route::get('audits/', 'AuditsController@index');
	Route::get('audits/index', 'AuditsController@index');
	Route::get('audits/index/{filter?}/{filtervalue?}', 'AuditsController@index');	
	Route::get('audits/view/{rec_id}', 'AuditsController@view');

/* routes for Carburant Controller  */	
	Route::get('carburant/', 'CarburantController@index');
	Route::get('carburant/index', 'CarburantController@index');
	Route::get('carburant/index/{filter?}/{filtervalue?}', 'CarburantController@index');	
	Route::get('carburant/view/{rec_id}', 'CarburantController@view');	
	Route::post('carburant/add', 'CarburantController@add');	
	Route::any('carburant/edit/{rec_id}', 'CarburantController@edit');	
	Route::any('carburant/delete/{rec_id}', 'CarburantController@delete');

/* routes for Departement Controller  */	
	Route::get('departement/', 'DepartementController@index');
	Route::get('departement/index', 'DepartementController@index');
	Route::get('departement/index/{filter?}/{filtervalue?}', 'DepartementController@index');	
	Route::get('departement/view/{rec_id}', 'DepartementController@view');	
	Route::post('departement/add', 'DepartementController@add');	
	Route::any('departement/edit/{rec_id}', 'DepartementController@edit');	
	Route::any('departement/delete/{rec_id}', 'DepartementController@delete');

/* routes for Kilometrage Controller  */	
	Route::get('kilometrage/', 'KilometrageController@index');
	Route::get('kilometrage/index', 'KilometrageController@index');
	Route::get('kilometrage/index/{filter?}/{filtervalue?}', 'KilometrageController@index');	
	Route::get('kilometrage/view/{rec_id}', 'KilometrageController@view');	
	Route::post('kilometrage/add', 'KilometrageController@add');	
	Route::any('kilometrage/edit/{rec_id}', 'KilometrageController@edit');	
	Route::any('kilometrage/delete/{rec_id}', 'KilometrageController@delete');

/* routes for Panne Controller  */	
	Route::get('panne/', 'PanneController@index');
	Route::get('panne/index', 'PanneController@index');
	Route::get('panne/index/{filter?}/{filtervalue?}', 'PanneController@index');	
	Route::get('panne/view/{rec_id}', 'PanneController@view');	
	Route::post('panne/add', 'PanneController@add');	
	Route::any('panne/edit/{rec_id}', 'PanneController@edit');	
	Route::any('panne/delete/{rec_id}', 'PanneController@delete');

/* routes for Permissions Controller  */	
	Route::get('permissions/', 'PermissionsController@index');
	Route::get('permissions/index', 'PermissionsController@index');
	Route::get('permissions/index/{filter?}/{filtervalue?}', 'PermissionsController@index');	
	Route::get('permissions/view/{rec_id}', 'PermissionsController@view');	
	Route::post('permissions/add', 'PermissionsController@add');	
	Route::any('permissions/edit/{rec_id}', 'PermissionsController@edit');	
	Route::any('permissions/delete/{rec_id}', 'PermissionsController@delete');

/* routes for Reparation Controller  */	
	Route::get('reparation/', 'ReparationController@index');
	Route::get('reparation/index', 'ReparationController@index');
	Route::get('reparation/index/{filter?}/{filtervalue?}', 'ReparationController@index');	
	Route::get('reparation/view/{rec_id}', 'ReparationController@view');	
	Route::post('reparation/add', 'ReparationController@add');	
	Route::any('reparation/edit/{rec_id}', 'ReparationController@edit');	
	Route::any('reparation/delete/{rec_id}', 'ReparationController@delete');

/* routes for Roles Controller  */	
	Route::get('roles/', 'RolesController@index');
	Route::get('roles/index', 'RolesController@index');
	Route::get('roles/index/{filter?}/{filtervalue?}', 'RolesController@index');	
	Route::get('roles/view/{rec_id}', 'RolesController@view');	
	Route::post('roles/add', 'RolesController@add');	
	Route::any('roles/edit/{rec_id}', 'RolesController@edit');	
	Route::any('roles/delete/{rec_id}', 'RolesController@delete');

/* routes for Services Controller  */	
	Route::get('services/', 'ServicesController@index');
	Route::get('services/index', 'ServicesController@index');
	Route::get('services/index/{filter?}/{filtervalue?}', 'ServicesController@index');	
	Route::get('services/view/{rec_id}', 'ServicesController@view');	
	Route::post('services/add', 'ServicesController@add');	
	Route::any('services/edit/{rec_id}', 'ServicesController@edit');	
	Route::any('services/delete/{rec_id}', 'ServicesController@delete');

/* routes for Societe Controller  */	
	Route::get('societe/', 'SocieteController@index');
	Route::get('societe/index', 'SocieteController@index');
	Route::get('societe/index/{filter?}/{filtervalue?}', 'SocieteController@index');	
	Route::get('societe/view/{rec_id}', 'SocieteController@view');	
	Route::post('societe/add', 'SocieteController@add');	
	Route::any('societe/edit/{rec_id}', 'SocieteController@edit');	
	Route::any('societe/delete/{rec_id}', 'SocieteController@delete');

/* routes for Users Controller  */	
	Route::get('users/', 'UsersController@index');
	Route::get('users/index', 'UsersController@index');
	Route::get('users/index/{filter?}/{filtervalue?}', 'UsersController@index');	
	Route::get('users/view/{rec_id}', 'UsersController@view');	
	Route::get('account', 'AccountController@index');	
	Route::get('account/currentuserdata', 'AccountController@currentuserdata');

/* routes for Vehicule Controller  */	
	Route::get('vehicule/', 'VehiculeController@index');
	Route::get('vehicule/index', 'VehiculeController@index');
	Route::get('vehicule/index/{filter?}/{filtervalue?}', 'VehiculeController@index');	
	Route::get('vehicule/view/{rec_id}', 'VehiculeController@view');	
	Route::post('vehicule/add', 'VehiculeController@add');	
	Route::any('vehicule/edit/{rec_id}', 'VehiculeController@edit');	
	Route::any('vehicule/delete/{rec_id}', 'VehiculeController@delete');

});

Route::get('home', 'HomeController@index');
	
	Route::post('auth/login', 'AuthController@login');
	Route::get('login', 'AuthController@login')->name('login');
	
	
	Route::get('components_data/vehicle_option_list/{arg1?}', 'Components_dataController@vehicle_option_list');	
	Route::get('components_data/role_id_option_list/{arg1?}', 'Components_dataController@role_id_option_list');	
	Route::get('components_data/vehicule_id_option_list/{arg1?}', 'Components_dataController@vehicule_id_option_list');	
	Route::get('components_data/panne_id_option_list/{arg1?}', 'Components_dataController@panne_id_option_list');	
	Route::get('components_data/departement_option_list/{arg1?}', 'Components_dataController@departement_option_list');	
	Route::get('components_data/chauffeur_option_list/{arg1?}', 'Components_dataController@chauffeur_option_list');	
	Route::get('components_data/barchart_kilometrage/{arg1?}', 'Components_dataController@barchart_kilometrage');	
	Route::get('components_data/barchart_comsommationdecarburant/{arg1?}', 'Components_dataController@barchart_comsommationdecarburant');


/* routes for FileUpload Controller  */	
Route::post('fileuploader/upload/{fieldname}', 'FileUploaderController@upload');
Route::post('fileuploader/s3upload/{fieldname}', 'FileUploaderController@s3upload');
Route::post('fileuploader/remove_temp_file', 'FileUploaderController@remove_temp_file');