import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { FilterTags } from 'components/FilterTags';
import { Image } from 'components/ImageViewer';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { PageRequestError } from 'components/PageRequestError';
import { Paginator } from 'primereact/paginator';
import { ProgressSpinner } from 'primereact/progressspinner';
import { SplitButton } from 'primereact/splitbutton';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useListPage from 'hooks/useListPage';
import MasterDetailPages from './MasterDetailPages';
const VehiculeListPage = (props) => {
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
	const { records, pageReady, loading, selectedItems, currentRecord, apiRequestError, getPageBreadCrumbs, deleteItem, setCurrentRecord, pagination } = pageController;
	const { filters, setFilterValue } = filterController;
	const { totalRecords, totalPages, recordsPosition, firstRow, limit, onPageChange } =  pagination;
	function ActionButton(data){
		const items = [
		{
			label: "View",
			command: (event) => { app.navigate(`/vehicule/view/${data.id}`) },
			icon: "pi pi-eye"
		},
		{
			label: "Edit",
			command: (event) => { app.navigate(`/vehicule/edit/${data.id}`) },
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
	function MasterDetailBtnTemplate(data){
		if(data){
			return (
				<><Button className="p-button-text" onClick={()=>setCurrentRecord(data)} icon="pi pi-caret-down" label="" /></>
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
<main id="VehiculeListPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container-fluid">
            <div className="grid justify-content-between align-items-center">
                <div className="col " >
                    <Title title="Vehicule"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
                <div className="col-fixed " >
                    <Link to={`/vehicule/add`}>
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
                        <div className="card ">
                            <FilterTags filterController={filterController} />
                            <div >
                                <PageBreadcrumbs />
                                <div className="grid ">
                                    <div className="col">
                                        <div className="grid  mb-3">
                                            {records.map((data, index) => 
                                            <div className="col-12 md:col-4" key={index}>
                                                {/*PageComponentStart*/}
                                                <div className="card p-3 nice-shadow-1">
                                                    <div className="grid gap-2 justify-content-between ">
                                                        <div className="col flex gap-2">
                                                            <Image className="border-round" style={{maxWidth: '100%'}} preview={false} width="100px" height="60px" imageSize="medium" src={data.image} />
                                                            <div>
                                                                <div className="text-lg font-bold text-primary cursor-pointer" onClick={()=> app.navigate(`/vehicule/view/${data.id}`)}>{data.immatricule}</div>
                                                                <div className="text-500">{data.marque}</div>
                                                            </div>
                                                        </div>
                                                        <div style={{width:'50px'}}>
                                                            <div className="flex justify-content-end">
                                                                {ActionButton(data)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*PageComponentEnd*/}
                                            </div>
                                            )}
                                        </div>
                                        <EmptyRecordMessage />
                                        <PageLoading />
                                        <PageFooter />
                                    </div>
                                    {
                                    (currentRecord && !props.isSubPage) && 
                                    <div className="col-12">
                                        <div className="card p-0">
                                            <MasterDetailPages masterRecord={currentRecord} scrollIntoView={true} />
                                        </div>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
	);
}
VehiculeListPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'vehicule',
	apiPath: 'vehicule/index',
	routeName: 'vehiculelist',
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
export default VehiculeListPage;
