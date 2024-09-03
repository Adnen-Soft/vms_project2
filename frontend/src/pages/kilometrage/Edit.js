import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { ImageViewer } from 'components/ImageViewer';
import { InputText } from 'primereact/inputtext';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
const KilometrageEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		vehicule_id: yup.string().required().label("Vehicule"),
		compteur: yup.number().required().label("Compteur"),
		date: yup.string().required().label("Date")
	});
	// form default values
	const formDefaultValues = {
		vehicule_id: '', 
		compteur: "NULL", 
		date: new Date(), 
	}
	//where page logics resides
	const pageController = useEditPage({ props, formDefaultValues, afterSubmit });
	//destructure and grab what we need
	const { formData, handleSubmit, submitForm, pageReady, loading, saving, apiRequestError, inputClassName } = pageController
	//Event raised on form submit success
	function afterSubmit(response){
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigate(`/kilometrage`);
		}
	}
	function VehiculeIdItemTemplate(data){
		if(data){
			return (
					<div className="flex align-items-center">
		<ImageViewer size="small"  height="30px" width="30px" src={data.image} />
		<div>
			<div className="font-bold">{data.label}</div>
			<div className="text-sm text-500">{data.caption}</div>
		</div>
	</div>
			);
		}
	}
	function VehiculeIdValueTemplate(data, props){
			if(data){
		return (
			<div className="flex align-items-center">
				<ImageViewer size="small"  height="30px" width="30px" src={data.image} />
				<div>
					<div className="font-bold">{data.label}</div>
					<div className="text-sm text-500">{data.caption}</div>
				</div>
			</div>
		);
	}
	return (<span>{props.placeholder}</span>);
	}
	// loading form data from api
	if(loading){
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{width:'50px', height:'50px'}} />
			</div>
		);
	}
	//display error page 
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	//page is ready when formdata loaded successfully
	if(pageReady){
		return (
<main id="KilometrageEditPage" className="main-page">
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
                    <Title title="modifier"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
            </div>
        </div>
    </section>
    }
    <section className="page-section " >
        <div className="container">
            <div className="grid ">
                <div className="md:col-9 sm:col-12 comp-grid" >
                    <div >
                        <Formik
                            initialValues={formData}
                            validationSchema={validationSchema} 
                            onSubmit={(values, actions) => {
                            submitForm(values);
                            }
                            }
                            >
                            { (formik) => {
                            return (
                            <Form className={`${!props.isSubPage ? 'card nice-shadow-1 ' : ''}`}>
                                <div className="grid">
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Vehicule *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/vehicle_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="vehicule_id"     optionLabel="label" optionValue="value" value={formik.values.vehicule_id} onChange={formik.handleChange} options={response} label="Vehicule"  placeholder="Sélectionnez une valeur"  className={inputClassName(formik?.errors?.vehicule_id)} valueTemplate={VehiculeIdValueTemplate} itemTemplate={VehiculeIdItemTemplate} />
                                                    <ErrorMessage name="vehicule_id" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Compteur *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="compteur"  onChange={formik.handleChange}  value={formik.values.compteur}   label="Compteur" type="number" placeholder="Entrer Compteur"  min={0}  step="any"    className={inputClassName(formik?.errors?.compteur)} />
                                                <ErrorMessage name="compteur" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Date *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="date" value={formik.values.date} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.date)}        />
                                                <ErrorMessage name="date" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                { props.showFooter && 
                                <div className="text-center my-3">
                                    <Button onClick={(e) => handleSubmit(e, formik)}  type="submit" label="Réviser" icon="pi pi-send" loading={saving} />
                                </div>
                                }
                            </Form>
                            );
                            }
                            }
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
		);
	}
}
KilometrageEditPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'kilometrage',
	apiPath: 'kilometrage/edit',
	routeName: 'kilometrageedit',
	submitButtonLabel: "Réviser",
	formValidationError: "Le formulaire est invalide",
	formValidationMsg: "Veuillez remplir le formulaire",
	msgTitle: "Mettre à jour l'enregistrement",
	msgAfterSave: "Enregistrement mis à jour avec succès",
	msgBeforeSave: "",
	showHeader: true,
	showFooter: true,
	redirect: true,
	isSubPage: false
}
export default KilometrageEditPage;
