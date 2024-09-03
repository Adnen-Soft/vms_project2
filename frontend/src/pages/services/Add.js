import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { ImageViewer } from 'components/ImageViewer';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import { Uploader } from 'components/Uploader';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const ServicesAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		vehicule_id: yup.string().nullable().label("Vehicule Id"),
		date: yup.string().nullable().label("Date"),
		type: yup.string().nullable().label("Type"),
		montant: yup.number().nullable().label("Montant"),
		fournisseur: yup.string().nullable().label("Fournisseur"),
		note: yup.string().nullable().label("Note"),
		image: yup.string().nullable().label("Image"),
		document: yup.string().nullable().label("Document")
	});
	
	//form default values
	const formDefaultValues = {
		vehicule_id: '', 
		date: new Date(), 
		type: '', 
		montant: "NULL", 
		fournisseur: "NULL", 
		note: "NULL", 
		image: '', 
		document: "NULL", 
	}
	
	//page hook where logics resides
	const pageController =  useAddPage({ props, formDefaultValues, afterSubmit });
	
	// destructure and grab what the page needs
	const { formData, resetForm, handleSubmit, submitForm, pageReady, loading, saving, inputClassName } = pageController;
	
	//event raised after form submit
	function afterSubmit(response){
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		resetForm();
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigate(`/services`);
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
	
	// page loading form data from api
	if(loading){
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{width:'50px', height:'50px'}} />
			</div>
		);
	}
	
	//page has loaded any required data and ready to render
	if(pageReady){
		return (
<main id="ServicesAddPage" className="main-page">
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
                    <Title title="Ajouter un nouveau"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                        <Formik initialValues={formData} validationSchema={validationSchema} onSubmit={(values, actions) =>submitForm(values)}>
                            {(formik) => 
                            <>
                            <Form className={`${!props.isSubPage ? 'card nice-shadow-1 ' : ''}`}>
                                <div className="grid">
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Vehicule Id 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/vehicle_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="vehicule_id"     optionLabel="label" optionValue="value" value={formik.values.vehicule_id} onChange={formik.handleChange} options={response} label="Vehicule Id"  placeholder="Sélectionnez une valeur"  className={inputClassName(formik?.errors?.vehicule_id)} valueTemplate={VehiculeIdValueTemplate} itemTemplate={VehiculeIdItemTemplate} />
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
                                                Date 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="date" value={formik.values.date} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.date)}        />
                                                <ErrorMessage name="date" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Type 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="type"  onChange={formik.handleChange}  value={formik.values.type}   label="Type" type="text" placeholder="Entrer Type"        className={inputClassName(formik?.errors?.type)} />
                                                <ErrorMessage name="type" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Montant 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="montant"  onChange={formik.handleChange}  value={formik.values.montant}   label="Montant" type="number" placeholder="Entrer Montant"  min={0}  step={0.1}    className={inputClassName(formik?.errors?.montant)} />
                                                <ErrorMessage name="montant" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Fournisseur 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="fournisseur"  onChange={formik.handleChange}  value={formik.values.fournisseur}   label="Fournisseur" type="text" placeholder="Entrer Fournisseur"        className={inputClassName(formik?.errors?.fournisseur)} />
                                                <ErrorMessage name="fournisseur" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Note 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="note"  onChange={formik.handleChange}  value={formik.values.note}   label="Note" type="text" placeholder="Entrer Note"        className={inputClassName(formik?.errors?.note)} />
                                                <ErrorMessage name="note" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Image 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <div className={inputClassName(formik?.errors?.image)}>
                                                    <Uploader name="image" showUploadedFiles value={formik.values.image} uploadPath="fileuploader/upload/image" onChange={(paths) => formik.setFieldValue('image', paths)} fileLimit={1} maxFileSize={3} accept=".jpg,.png,.gif,.jpeg" multiple={false} label="Choisissez des fichiers ou déposez des fichiers ici" onUploadError={(errMsg) => app.flashMsg('Upload error', errMsg, 'error')} />
                                                </div>
                                                <ErrorMessage name="image" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Document 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="document"  onChange={formik.handleChange}  value={formik.values.document}   label="Document" type="text" placeholder="Entrer Document"        className={inputClassName(formik?.errors?.document)} />
                                                <ErrorMessage name="document" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                { props.showFooter && 
                                <div className="text-center my-3">
                                    <Button onClick={(e) => handleSubmit(e, formik)} className="p-button-primary" type="submit" label="Soumettre" icon="pi pi-send" loading={saving} />
                                </div>
                                }
                            </Form>
                            </>
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

//page props and default values
ServicesAddPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'services',
	apiPath: 'services/add',
	routeName: 'servicesadd',
	submitButtonLabel: "Soumettre",
	formValidationError: "Le formulaire est invalide",
	formValidationMsg: "Veuillez remplir le formulaire",
	msgTitle: "Créer un enregistrement",
	msgAfterSave: "Enregistrement ajouté avec succès",
	msgBeforeSave: "",
	showHeader: true,
	showFooter: true,
	redirect: true,
	isSubPage: false
}
export default ServicesAddPage;
