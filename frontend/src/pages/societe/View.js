import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import SocieteEditPage from 'pages/societe/Edit';
import useApp from 'hooks/useApp';

import useViewPage from 'hooks/useViewPage';
const SocieteViewPage = (props) => {
		const app = useApp();
	const pageController = useViewPage(props);
	const { item, pageReady, loading, apiRequestError, deleteItem } = pageController;
	function ActionButton(data){
		const items = [
		{
			label: "Edit",
			command: (event) => { app.openPageDialog(<SocieteEditPage isSubPage apiPath={`/societe/edit/${data.id}`} />, {closeBtn: true }) },
			icon: "pi pi-pencil"
		},
		{
			label: "Delete",
			command: (event) => { deleteItem(data.id) },
			icon: "pi pi-trash"
		}
	]
		return (<Menubar className="p-0 " model={items} />);
	}
	function PageFooter() {
		if (props.showFooter) {
			return (
				<div className="flex justify-content-between">
	<div className="flex justify-content-start">
	{ActionButton(item)}
	</div>
				</div>
			);
		}
	}
	if(loading){
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{width:'50px', height:'50px'}} />
			</div>
		);
	}
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	if(pageReady){
		return (
			<div>
<main id="SocieteViewPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container">
            <div className="grid justify-content-between align-items-center">
                { !props.isSubPage && 
                <div className="col-fixed " >
                    <Button onClick={() => app.navigate(-1)} label=""  className="p-button p-button-text " icon="pi pi-arrow-left"  />
                </div>
                }
                <div className="col " >
                    <Title title="Vue Societe"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
            </div>
        </div>
    </section>
    }
    <section className="page-section " >
        <div className="container">
            <div className="grid ">
                <div className="col comp-grid" >
                    <div >
                        {/*PageComponentStart*/}
                        <div className="mb-3 grid ">
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">Id</div>
                                        <div className="font-bold">{ item.id }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">Nom</div>
                                        <div className="font-bold">{ item.nom }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">Date Created</div>
                                        <div className="font-bold">{ item.date_created }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">Date Updated</div>
                                        <div className="font-bold">{ item.date_updated }</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*PageComponentEnd*/}
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
				<PageFooter />
			</div>
		);
	}
}
SocieteViewPage.defaultProps = {
	id: null,
	primaryKey: 'id',
	pageName: 'societe',
	apiPath: 'societe/view',
	routeName: 'societeview',
	msgBeforeDelete: "Êtes-vous sûr de vouloir supprimer cet enregistrement?",
	msgTitle: "Supprimer l'enregistrement",
	msgAfterDelete: "Enregistrement supprimé avec succès",
	showHeader: true,
	showFooter: true,
	exportButton: true,
	isSubPage: false,
}
export default SocieteViewPage;
