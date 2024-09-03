import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import { Uploader } from 'components/Uploader';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const FournisseursAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		nom: yup.string().nullable().label("Nom"),
		type: yup.string().nullable().label("Type"),
		telephone: yup.number().nullable().label("Telephone"),
		adresse: yup.string().nullable().label("Adresse"),
		note: yup.string().nullable().label("Note"),
		photo: yup.string().nullable().label("Photo")
	});
	
	//form default values
	const formDefaultValues = {
		nom: "NULL", 
		type: "NULL", 
		telephone: "NULL", 
		adresse: "NULL", 
		note: '', 
		photo: '', 
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
			app.navigate(`/fournisseurs`);
		}
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
<main id="FournisseursAddPage" className="main-page">
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
                                                Nom 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="nom"  onChange={formik.handleChange}  value={formik.values.nom}   label="Nom" type="text" placeholder="Entrer Nom"        className={inputClassName(formik?.errors?.nom)} />
                                                <ErrorMessage name="nom" component="span" className="p-error" />
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
                                                Telephone 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <span className="p-input-icon-right w-full">
                                                <InputText name="telephone"  onChange={formik.handleChange}  value={formik.values.telephone}   label="Telephone" type="number" placeholder="Entrer Telephone"  min={0}  step="any"    className={inputClassName(formik?.errors?.telephone)} />
                                                <i className="pi pi-phone"></i>
                                                </span>
                                                <ErrorMessage name="telephone" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Adresse 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <span className="p-input-icon-right w-full">
                                                <InputText name="adresse"  onChange={formik.handleChange}  value={formik.values.adresse}   label="Adresse" type="text" placeholder="Entrer Adresse"        className={inputClassName(formik?.errors?.adresse)} />
                                                <i className="pi pi-home"></i>
                                                </span>
                                                <ErrorMessage name="adresse" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Note 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="note"  className={inputClassName(formik?.errors?.note)}   value={formik.values.note} placeholder="Entrer Note" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="note" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Photo 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <div className={inputClassName(formik?.errors?.photo)}>
                                                    <Uploader name="photo" showUploadedFiles value={formik.values.photo} uploadPath="fileuploader/upload/photo" onChange={(paths) => formik.setFieldValue('photo', paths)} fileLimit={1} maxFileSize={3} accept=".jpg,.png,.gif,.jpeg" multiple={false} label="Choisissez des fichiers ou déposez des fichiers ici" onUploadError={(errMsg) => app.flashMsg('Upload error', errMsg, 'error')} />
                                                </div>
                                                <ErrorMessage name="photo" component="span" className="p-error" />
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
FournisseursAddPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'fournisseurs',
	apiPath: 'fournisseurs/add',
	routeName: 'fournisseursadd',
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
export default FournisseursAddPage;
