import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { ImageViewer } from 'components/ImageViewer';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import { Uploader } from 'components/Uploader';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const VehiculeAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		image: yup.string().nullable().label("Image"),
		immatricule: yup.string().nullable().label("Immatricule"),
		marque: yup.string().nullable().label("Marque"),
		nbr_places: yup.number().nullable().label("Nbr Places"),
		nbr_chevaux: yup.number().nullable().label("Nbr Chevaux"),
		departement: yup.string().nullable().label("Departement"),
		chauffeur: yup.string().nullable().label("Chauffeur")
	});
	
	//form default values
	const formDefaultValues = {
		image: '', 
		immatricule: '', 
		marque: '', 
		nbr_places: '', 
		nbr_chevaux: "NULL", 
		departement: '', 
		chauffeur: '', 
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
			app.navigate(`/vehicule`);
		}
	}
	function ChauffeurItemTemplate(data){
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
	function ChauffeurValueTemplate(data, props){
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
<main id="VehiculeAddPage" className="main-page">
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
                                                Image 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <div className={inputClassName(formik?.errors?.image)}>
                                                    <Uploader name="image" showUploadedFiles value={formik.values.image} uploadPath="fileuploader/upload/image" onChange={(paths) => formik.setFieldValue('image', paths)} fileLimit={1} maxFileSize={10} accept=".jpg,.png,.gif,.jpeg" multiple={false} label="Choisissez des fichiers ou déposez des fichiers ici" onUploadError={(errMsg) => app.flashMsg('Upload error', errMsg, 'error')} />
                                                </div>
                                                <ErrorMessage name="image" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:col-6 col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Immatricule 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="immatricule"  onChange={formik.handleChange}  value={formik.values.immatricule}   label="Immatricule" type="text" placeholder="Entrer Immatricule"        className={inputClassName(formik?.errors?.immatricule)} />
                                                <ErrorMessage name="immatricule" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:col-6 col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Marque 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="marque"  onChange={formik.handleChange}  value={formik.values.marque}   label="Marque" type="text" placeholder="Entrer Marque"        className={inputClassName(formik?.errors?.marque)} />
                                                <ErrorMessage name="marque" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:col-6 col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Nbr Places 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="nbr_places"  onChange={formik.handleChange}  value={formik.values.nbr_places}   label="Nbr Places" type="number" placeholder="Entrer Nbr Places"  min={0}  step="any"    className={inputClassName(formik?.errors?.nbr_places)} />
                                                <ErrorMessage name="nbr_places" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:col-6 col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Nbr Chevaux 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="nbr_chevaux"  onChange={formik.handleChange}  value={formik.values.nbr_chevaux}   label="Nbr Chevaux" type="number" placeholder="Entrer Nbr Chevaux"  min={0}  step="any"    className={inputClassName(formik?.errors?.nbr_chevaux)} />
                                                <ErrorMessage name="nbr_chevaux" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:col-6 col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Departement 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/departement_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="departement"     optionLabel="label" optionValue="value" value={formik.values.departement} onChange={formik.handleChange} options={response} label="Departement"  placeholder="Sélectionnez une valeur"  className={inputClassName(formik?.errors?.departement)}   />
                                                    <ErrorMessage name="departement" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:col-6 col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Chauffeur 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/chauffeur_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="chauffeur"     optionLabel="label" optionValue="value" value={formik.values.chauffeur} onChange={formik.handleChange} options={response} label="Chauffeur"  placeholder="Sélectionnez une valeur"  className={inputClassName(formik?.errors?.chauffeur)} valueTemplate={ChauffeurValueTemplate} itemTemplate={ChauffeurItemTemplate} />
                                                    <ErrorMessage name="chauffeur" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
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
VehiculeAddPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'vehicule',
	apiPath: 'vehicule/add',
	routeName: 'vehiculeadd',
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
export default VehiculeAddPage;
