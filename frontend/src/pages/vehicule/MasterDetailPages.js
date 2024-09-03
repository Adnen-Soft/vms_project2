import { useEffect } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Title } from 'components/Title';
import CarburantListPage from 'pages/carburant/List';
import KilometrageListPage from 'pages/kilometrage/List';
import PanneListPage from 'pages/panne/List';
import ReparationListPage from 'pages/reparation/List';
import ServicesListPage from 'pages/services/List';
import useApp from 'hooks/useApp';

const MasterDetailPages = (props) => {
		const app = useApp();
	const { masterRecord, scrollIntoView = true } = props;
	const activeTab = 0;
	function scrollToDetailPage() {
		if (scrollIntoView) {
			const pageElement = document.getElementById('master-detailpage');
			if(pageElement){
				pageElement.scrollIntoView({behavior:'smooth', block:'start'});
			}
		}
	}
	// pass form data from master to detail
	function setDetailPageFormData(){
		const record = masterRecord;
		// set  form data
		const kilometrageFormData = {  }
		app.setPageFormData('kilometrage', kilometrageFormData);
		// set  form data
		const carburantFormData = {  }
		app.setPageFormData('carburant', carburantFormData);
		// set  form data
		const panneFormData = {  }
		app.setPageFormData('panne', panneFormData);
		// set  form data
		const reparationFormData = {  }
		app.setPageFormData('reparation', reparationFormData);
		// set  form data
		const servicesFormData = {  }
		app.setPageFormData('services', servicesFormData);
	}
	// pass form data from master to detail
	useEffect(() => {
		scrollToDetailPage();
		setDetailPageFormData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [masterRecord]);
	if(masterRecord){
		return (
<div id="master-detailpage">
    <TabView value={activeTab}>
        <TabPanel header={<Title title="Vehicule Kilometrage"  headerClass="p-0" titleClass="text-lg font-bold"  iconClass="pi pi-directions" avatarSize="small"    separator={false} />}>
            <div className="reset-grid">
                <KilometrageListPage isSubPage  fieldName="kilometrage.vehicule_id" fieldValue={masterRecord.id} showBreadcrumbs={false} showHeader={false} showFooter={true}>
                </KilometrageListPage>
            </div>
        </TabPanel>
        <TabPanel header={<Title title="Vehicule Carburant"  headerClass="p-0" titleClass="text-lg font-bold"  iconClass="pi pi-dollar" avatarSize="small"    separator={false} />}>
            <div className="reset-grid">
                <CarburantListPage isSubPage  fieldName="carburant.vehicle" fieldValue={masterRecord.id} showBreadcrumbs={false} showHeader={false} showFooter={true}>
                </CarburantListPage>
            </div>
        </TabPanel>
        <TabPanel header={<Title title="Vehicule Panne"  headerClass="p-0" titleClass="text-lg font-bold"  iconClass="pi pi-exclamation-triangle" avatarSize="small"    separator={false} />}>
            <div className="reset-grid">
                <PanneListPage isSubPage  fieldName="panne.vehicule_id" fieldValue={masterRecord.id} showBreadcrumbs={false} showHeader={false} showFooter={true}>
                </PanneListPage>
            </div>
        </TabPanel>
        <TabPanel header={<Title title="Vehicule Reparation"  headerClass="p-0" titleClass="text-lg font-bold"  iconClass="pi pi-wrench" avatarSize="small"    separator={false} />}>
            <div className="reset-grid">
                <ReparationListPage isSubPage  fieldName="reparation.vehicule_id" fieldValue={masterRecord.id} showBreadcrumbs={false} showHeader={false} showFooter={true}>
                </ReparationListPage>
            </div>
        </TabPanel>
        <TabPanel header={<Title title="Vehicule Services"  headerClass="p-0" titleClass="text-lg font-bold"  iconClass="pi pi-history" avatarSize="small"    separator={false} />}>
            <div className="reset-grid">
                <ServicesListPage isSubPage  fieldName="services.vehicule_id" fieldValue={masterRecord.id} showBreadcrumbs={false} showHeader={false} showFooter={true}>
                </ServicesListPage>
            </div>
        </TabPanel>
    </TabView>
</div>
		);
	}
}
export default MasterDetailPages;
