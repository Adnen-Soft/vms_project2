import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

import IndexLayout from 'layouts/IndexLayout';
import MainLayout from 'layouts/MainLayout';
import AuthRoutes from 'components/AuthRoutes';
import IndexPage from 'pages/index/IndexPage';
import AuditsList from 'pages/audits/List';
import AuditsView from 'pages/audits/View';
import CarburantList from 'pages/carburant/List';
import CarburantView from 'pages/carburant/View';
import CarburantAdd from 'pages/carburant/Add';
import CarburantEdit from 'pages/carburant/Edit';
import DepartementList from 'pages/departement/List';
import DepartementView from 'pages/departement/View';
import DepartementAdd from 'pages/departement/Add';
import DepartementEdit from 'pages/departement/Edit';
import FournisseursList from 'pages/fournisseurs/List';
import FournisseursView from 'pages/fournisseurs/View';
import FournisseursAdd from 'pages/fournisseurs/Add';
import FournisseursEdit from 'pages/fournisseurs/Edit';
import KilometrageList from 'pages/kilometrage/List';
import KilometrageView from 'pages/kilometrage/View';
import KilometrageAdd from 'pages/kilometrage/Add';
import KilometrageEdit from 'pages/kilometrage/Edit';
import PanneList from 'pages/panne/List';
import PanneView from 'pages/panne/View';
import PanneAdd from 'pages/panne/Add';
import PanneEdit from 'pages/panne/Edit';
import PermissionsList from 'pages/permissions/List';
import PermissionsView from 'pages/permissions/View';
import PermissionsAdd from 'pages/permissions/Add';
import PermissionsEdit from 'pages/permissions/Edit';
import ReparationList from 'pages/reparation/List';
import ReparationView from 'pages/reparation/View';
import ReparationAdd from 'pages/reparation/Add';
import ReparationEdit from 'pages/reparation/Edit';
import RolesList from 'pages/roles/List';
import RolesView from 'pages/roles/View';
import RolesAdd from 'pages/roles/Add';
import RolesEdit from 'pages/roles/Edit';
import ServicesList from 'pages/services/List';
import ServicesView from 'pages/services/View';
import ServicesAdd from 'pages/services/Add';
import ServicesEdit from 'pages/services/Edit';
import SocieteList from 'pages/societe/List';
import SocieteView from 'pages/societe/View';
import SocieteAdd from 'pages/societe/Add';
import SocieteEdit from 'pages/societe/Edit';
import UsersList from 'pages/users/List';
import UsersView from 'pages/users/View';
import VehiculeList from 'pages/vehicule/List';
import VehiculeView from 'pages/vehicule/View';
import VehiculeAdd from 'pages/vehicule/Add';
import VehiculeEdit from 'pages/vehicule/Edit';
import AccountPages from 'pages/account';
import HomePage from './pages/home/HomePage';
import IndexPages from './pages/index';
import ErrorPages from './pages/errors';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'assets/styles/layout.scss';
const App = () => {
	const auth = useAuth();
	function DefaultPage(){
		if(!auth.isLoggedIn){
			return <IndexPage />
		}
		return <Navigate to="/home" replace />;
	}
	return (
		<Routes>
			<Route exact element={<AuthRoutes />}>
			<Route element={<MainLayout />}>
				<Route path="/home" element={<HomePage />} />
				

				{/* audits pages routes */}
				<Route path="/audits" element={<AuditsList />} />
				<Route path="/audits/:fieldName/:fieldValue" element={<AuditsList />} />
				<Route path="/audits/index/:fieldName/:fieldValue" element={<AuditsList />} />
				<Route path="/audits/view/:pageid" element={<AuditsView />} />

				{/* carburant pages routes */}
				<Route path="/carburant" element={<CarburantList />} />
				<Route path="/carburant/:fieldName/:fieldValue" element={<CarburantList />} />
				<Route path="/carburant/index/:fieldName/:fieldValue" element={<CarburantList />} />
				<Route path="/carburant/view/:pageid" element={<CarburantView />} />
				<Route path="/carburant/add" element={<CarburantAdd />} />
				<Route path="/carburant/edit/:pageid" element={<CarburantEdit />} />

				{/* departement pages routes */}
				<Route path="/departement" element={<DepartementList />} />
				<Route path="/departement/:fieldName/:fieldValue" element={<DepartementList />} />
				<Route path="/departement/index/:fieldName/:fieldValue" element={<DepartementList />} />
				<Route path="/departement/view/:pageid" element={<DepartementView />} />
				<Route path="/departement/add" element={<DepartementAdd />} />
				<Route path="/departement/edit/:pageid" element={<DepartementEdit />} />

				{/* fournisseurs pages routes */}
				<Route path="/fournisseurs" element={<FournisseursList />} />
				<Route path="/fournisseurs/:fieldName/:fieldValue" element={<FournisseursList />} />
				<Route path="/fournisseurs/index/:fieldName/:fieldValue" element={<FournisseursList />} />
				<Route path="/fournisseurs/view/:pageid" element={<FournisseursView />} />
				<Route path="/fournisseurs/add" element={<FournisseursAdd />} />
				<Route path="/fournisseurs/edit/:pageid" element={<FournisseursEdit />} />

				{/* kilometrage pages routes */}
				<Route path="/kilometrage" element={<KilometrageList />} />
				<Route path="/kilometrage/:fieldName/:fieldValue" element={<KilometrageList />} />
				<Route path="/kilometrage/index/:fieldName/:fieldValue" element={<KilometrageList />} />
				<Route path="/kilometrage/view/:pageid" element={<KilometrageView />} />
				<Route path="/kilometrage/add" element={<KilometrageAdd />} />
				<Route path="/kilometrage/edit/:pageid" element={<KilometrageEdit />} />

				{/* panne pages routes */}
				<Route path="/panne" element={<PanneList />} />
				<Route path="/panne/:fieldName/:fieldValue" element={<PanneList />} />
				<Route path="/panne/index/:fieldName/:fieldValue" element={<PanneList />} />
				<Route path="/panne/view/:pageid" element={<PanneView />} />
				<Route path="/panne/add" element={<PanneAdd />} />
				<Route path="/panne/edit/:pageid" element={<PanneEdit />} />

				{/* permissions pages routes */}
				<Route path="/permissions" element={<PermissionsList />} />
				<Route path="/permissions/:fieldName/:fieldValue" element={<PermissionsList />} />
				<Route path="/permissions/index/:fieldName/:fieldValue" element={<PermissionsList />} />
				<Route path="/permissions/view/:pageid" element={<PermissionsView />} />
				<Route path="/permissions/add" element={<PermissionsAdd />} />
				<Route path="/permissions/edit/:pageid" element={<PermissionsEdit />} />

				{/* reparation pages routes */}
				<Route path="/reparation" element={<ReparationList />} />
				<Route path="/reparation/:fieldName/:fieldValue" element={<ReparationList />} />
				<Route path="/reparation/index/:fieldName/:fieldValue" element={<ReparationList />} />
				<Route path="/reparation/view/:pageid" element={<ReparationView />} />
				<Route path="/reparation/add" element={<ReparationAdd />} />
				<Route path="/reparation/edit/:pageid" element={<ReparationEdit />} />

				{/* roles pages routes */}
				<Route path="/roles" element={<RolesList />} />
				<Route path="/roles/:fieldName/:fieldValue" element={<RolesList />} />
				<Route path="/roles/index/:fieldName/:fieldValue" element={<RolesList />} />
				<Route path="/roles/view/:pageid" element={<RolesView />} />
				<Route path="/roles/add" element={<RolesAdd />} />
				<Route path="/roles/edit/:pageid" element={<RolesEdit />} />

				{/* services pages routes */}
				<Route path="/services" element={<ServicesList />} />
				<Route path="/services/:fieldName/:fieldValue" element={<ServicesList />} />
				<Route path="/services/index/:fieldName/:fieldValue" element={<ServicesList />} />
				<Route path="/services/view/:pageid" element={<ServicesView />} />
				<Route path="/services/add" element={<ServicesAdd />} />
				<Route path="/services/edit/:pageid" element={<ServicesEdit />} />

				{/* societe pages routes */}
				<Route path="/societe" element={<SocieteList />} />
				<Route path="/societe/:fieldName/:fieldValue" element={<SocieteList />} />
				<Route path="/societe/index/:fieldName/:fieldValue" element={<SocieteList />} />
				<Route path="/societe/view/:pageid" element={<SocieteView />} />
				<Route path="/societe/add" element={<SocieteAdd />} />
				<Route path="/societe/edit/:pageid" element={<SocieteEdit />} />

				{/* users pages routes */}
				<Route path="/users" element={<UsersList />} />
				<Route path="/users/:fieldName/:fieldValue" element={<UsersList />} />
				<Route path="/users/index/:fieldName/:fieldValue" element={<UsersList />} />
				<Route path="/users/view/:pageid" element={<UsersView />} />

				{/* vehicule pages routes */}
				<Route path="/vehicule" element={<VehiculeList />} />
				<Route path="/vehicule/:fieldName/:fieldValue" element={<VehiculeList />} />
				<Route path="/vehicule/index/:fieldName/:fieldValue" element={<VehiculeList />} />
				<Route path="/vehicule/view/:pageid" element={<VehiculeView />} />
				<Route path="/vehicule/add" element={<VehiculeAdd />} />
				<Route path="/vehicule/edit/:pageid" element={<VehiculeEdit />} />
				<Route path="/account/*" element={<AccountPages />} />
			</Route>
			</Route>
			<Route exact element={<IndexLayout />}>
				<Route path="/" element={<DefaultPage />} />
				<Route path="/*" element={<IndexPages />} />
				<Route path="/error/*" element={<ErrorPages />} />
			</Route>
		</Routes>
	);
}
export default App;
