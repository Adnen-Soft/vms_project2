import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { FilterTags } from 'components/FilterTags';
import { ImageViewer } from 'components/ImageViewer';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { PageRequestError } from 'components/PageRequestError';
import { Paginator } from 'primereact/paginator';
import { ProgressSpinner } from 'primereact/progressspinner';
import { SplitButton } from 'primereact/splitbutton';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';
import VehiculeViewPage from 'pages/vehicule/View';

import useListPage from 'hooks/useListPage';
const ReparationListPage = (props) => {
		const app = useApp();
	const filterSchema = {
		search: {
			tagTitle: "Search",
			value: '',
			valueType: 'single',
			options: [],
		}
	}
	const pageController = useListPage(props, filterSchema);
	const filterController = pageController.filterController;
	const { records, pageReady, loading, selectedItems, sortBy, sortOrder, apiRequestError, setSelectedItems, getPageBreadCrumbs, onSort, deleteItem, pagination } = pageController;
	const { filters, setFilterValue } = filterController;
	const { totalRecords, totalPages, recordsPosition, firstRow, limit, onPageChange } =  pagination;
	function ActionButton(data){
		const items = [
		{
			label: "View",
			command: (event) => { app.navigate(`/reparation/view/${data.id}`) },
			icon: "pi pi-eye"
		},
		{
			label: "Edit",
			command: (event) => { app.navigate(`/reparation/edit/${data.id}`) },
			icon: "pi pi-pencil"
		},
		{
			label: "Delete",
			command: (event) => { deleteItem(data.id) },
			icon: "pi pi-trash"
		}
	]
		return (<SplitButton dropdownIcon="pi pi-bars" className="dropdown-only p-button-text p-button-plain" model={items} />);
	}
	function IdTemplate(data){
		if(data){
			return (
				<Link to={`/reparation/view/${data.id}`}> { data.id }</Link>
			);
		}
	}
	function VehiculeIdTemplate(data){
		if(data){
			return (
				<>{data.vehicule_id && <Button className="p-button-text" icon="pi pi-eye" label={data.vehicule_immatricule} onClick={() => app.openPageDialog(<VehiculeViewPage isSubPage apiPath={`/vehicule/view/${data.vehicule_id}`} />, {closeBtn: true })} /> }</>
			);
		}
	}
	function PanneIdTemplate(data){
		if(data){
			return (
				<>{data.panne_id && <Button className="p-button-text" icon="pi pi-eye" label="Panne" to={`/panne/view/${data.panne_id}`} /> }</>
			);
		}
	}
	function PhotoTemplate(data){
		if(data){
			return (
				<><ImageViewer imageSize="small" previewSize="" src={data.photo} width="50px" height="50px" numDisplay={1} style={{maxWidth:'100%'}} /></>
			);
		}
	}
	function PageLoading(){
		if(loading){
			return (
				<>
					<div className="flex align-items-center justify-content-center text-gray-500 p-3">
						<div><ProgressSpinner style={{width:'30px', height:'30px'}} /> </div>
						<div  className="font-bold text-lg">Chargement...</div>
					</div>
				</>
			);
		}
	}
	function EmptyRecordMessage(){
		if(pageReady && !records.length){
			return (
				<div className="text-lg mt-3 p-3 text-center text-400 font-bold">
					Aucun Enregistrement Trouvé
				</div>
			);
		}
	}
	function MultiDelete() {
		if (selectedItems.length) {
			return (
				<div className="m-2 flex-grow-0">
					<Button onClick={() => deleteItem(selectedItems)} icon="pi pi-trash" className="p-button-danger" title="Supprimer sélectionnée"/>
				</div>
			)
		}
	}
	function PagerControl() {
		if (props.paginate && totalPages > 1) {
		const pagerReportTemplate = {
			layout: pagination.layout,
			CurrentPageReport: (options) => {
				return (
					<>
						<span className="text-sm text-gray-500 px-2">Records <b>{ recordsPosition } sur { options.totalRecords }</b></span>
					</>
				);
			}
		}
		return (
			<div className="flex-grow-1">
				<Paginator first={firstRow} rows={limit} totalRecords={totalRecords}  onPageChange={onPageChange} template={pagerReportTemplate} />
			</div>
		)
		}
	}
	function PageActionButtons() {
		return (
			<div className="flex flex-wrap">
				<MultiDelete />
			</div>
		);
	}
	function PageFooter() {
		if (pageReady && props.showFooter) {
			return (
				<div className="flex flex-wrap">
					<PageActionButtons />
					<PagerControl />
				</div>
			);
		}
	}
	function PageBreadcrumbs(){
		if(props.showBreadcrumbs) {
			const items = getPageBreadCrumbs();
			return (items.length > 0 && <BreadCrumb className="mb-3" model={items} />);
		}
	}
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	return (
<main id="ReparationListPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container-fluid">
            <div className="grid justify-content-between align-items-center">
                <div className="col " >
                    <Title title="Reparation"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
                <div className="col-fixed " >
                    <Link to={`/reparation/add`}>
                        <Button label="Ajouter un nouveau" icon="pi pi-plus" type="button" className="p-button w-full bg-primary "  />
                        </Link>
                    </div>
                    <div className="col-12 md:col-3 " >
                        <span className="p-input-icon-left w-full">
                        <i className="pi pi-search" />
                        <InputText placeholder="Chercher" className="w-full" value={filters.search.value}  onChange={(e) => setFilterValue('search', e.target.value)} />
                        </span>
                    </div>
                </div>
            </div>
        </section>
        }
        <section className="page-section " >
            <div className="container-fluid">
                <div className="grid ">
                    <div className="col comp-grid" >
                        <FilterTags filterController={filterController} />
                        <div >
                            <PageBreadcrumbs />
                            <div className="page-records">
                                <DataTable 
                                    lazy={true} 
                                    loading={loading} 
                                    selectionMode="checkbox" selection={selectedItems} onSelectionChange={e => setSelectedItems(e.value)}
                                    value={records} 
                                    dataKey="id" 
                                    sortField={sortBy} 
                                    sortOrder={sortOrder} 
                                    onSort={onSort}
                                    className=" p-datatable-sm" 
                                    stripedRows={true}
                                    showGridlines={false} 
                                    rowHover={true} 
                                    responsiveLayout="stack" 
                                    emptyMessage={<EmptyRecordMessage />} 
                                    >
                                    {/*PageComponentStart*/}
                                    <Column selectionMode="multiple" headerStyle={{width: '2rem'}}></Column>
                                    <Column  field="id" header="Id" body={IdTemplate}  ></Column>
                                    <Column  field="vehicule_id" header="Vehicule Id" body={VehiculeIdTemplate}  ></Column>
                                    <Column  field="panne_id" header="Panne Id" body={PanneIdTemplate}  ></Column>
                                    <Column  field="date" header="Date"   ></Column>
                                    <Column  field="type" header="Type"   ></Column>
                                    <Column  field="note" header="Note"   ></Column>
                                    <Column  field="montant" header="Montant"   ></Column>
                                    <Column  field="fournisseur" header="Fournisseur"   ></Column>
                                    <Column  field="photo" header="Photo" body={PhotoTemplate}  ></Column>
                                    <Column  field="document" header="Document"   ></Column>
                                    <Column  field="date_created" header="Date Created"   ></Column>
                                    <Column  field="date_updated" header="Date Updated"   ></Column>
                                    <Column  field="user_id" header="User Id"   ></Column>
                                    <Column headerStyle={{width: '2rem'}} headerClass="text-center" body={ActionButton}></Column>
                                    {/*PageComponentEnd*/}
                                </DataTable>
                            </div>
                            <PageFooter />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
	);
}
ReparationListPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'reparation',
	apiPath: 'reparation/index',
	routeName: 'reparationlist',
	msgBeforeDelete: "Êtes-vous sûr de vouloir supprimer cet enregistrement?",
	msgTitle: "Supprimer l'enregistrement",
	msgAfterDelete: "Enregistrement supprimé avec succès",
	showHeader: true,
	showFooter: true,
	paginate: true,
	isSubPage: false,
	showBreadcrumbs: true,
	exportData: false,
	importData: false,
	keepRecords: false,
	multiCheckbox: true,
	search: '',
	fieldName: null,
	fieldValue: null,
	sortField: '',
	sortDir: '',
	pageNo: 1,
	limit: 10,
}
export default ReparationListPage;
