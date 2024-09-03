import { BreadCrumb } from 'primereact/breadcrumb';
import { FilterTags } from 'components/FilterTags';
import { ImageViewer } from 'components/ImageViewer';
import { InputText } from 'primereact/inputtext';
import { PageRequestError } from 'components/PageRequestError';
import { Paginator } from 'primereact/paginator';
import { ProgressSpinner } from 'primereact/progressspinner';
import { SplitButton } from 'primereact/splitbutton';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useListPage from 'hooks/useListPage';
const UsersListPage = (props) => {
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
	const { records, pageReady, loading, apiRequestError, getPageBreadCrumbs, pagination } = pageController;
	const { filters, setFilterValue } = filterController;
	const { totalRecords, totalPages, recordsPosition, firstRow, limit, onPageChange } =  pagination;
	function ActionButton(data){
		const items = [
		{
			label: "View",
			command: (event) => { app.navigate(`/users/view/${data.id}`) },
			icon: "pi pi-eye"
		}
	]
		return (<SplitButton dropdownIcon="pi pi-bars" className="dropdown-only p-button-text p-button-plain" model={items} />);
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
<main id="UsersListPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container-fluid">
            <div className="grid justify-content-between align-items-center">
                <div className="col " >
                    <Title title="Users"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
                <div className="col-fixed " >
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
                        <div className="grid  mb-3">
                            {records.map((data, index) => 
                            <div className="col-12 md:col-3" key={index}>
                                {/*PageComponentStart*/}
                                <div  className="card animated zoomIn nice-shadow-1 text-center">
                                    <div onClick={()=> app.navigate(`/users/view/${data.id}`)} className="cursor-pointer flex justify-content-center">
                                        <ImageViewer className="border-circle cursor-pointer" preview={false} height="50px" width="50px" imageSize="medium" src={data.photo} />
                                    </div>
                                    <div className="ellipsis font-bold text-primary py-2 cursor-pointer" onClick={()=> app.navigate(`/users/view/${data.id}`)}>{data.username}</div>
                                    <div className="ellipsis text-sm text-500">{data.email}</div>
                                    <div className="flex justify-content-end">
                                        {ActionButton(data)}
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
                </div>
            </div>
        </div>
    </section>
</main>
	);
}
UsersListPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'users',
	apiPath: 'users/index',
	routeName: 'userslist',
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
	multiCheckbox: false,
	search: '',
	fieldName: null,
	fieldValue: null,
	sortField: '',
	sortDir: '',
	pageNo: 1,
	limit: 20,
}
export default UsersListPage;
