import { Formik, Form, Field } from 'formik';
import { MDBInput, MDBBtn, MDBModalFooter, MDBModal, MDBModalDialog,MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody  } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import api from '../../../../api/api';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { helpers } from '../../../utils/helpers';
import { useParams } from "react-router-dom";



const EntrySubmit = () => {

    // const patientId = "3"
    // const appointmentId = "1"

    const { patientId, appointmentId, code } = useParams();

    console.log("patient, appointment code", patientId, appointmentId, code)


  const [varyingModal, setVaryingModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [editModel ,setEditModel] = useState(false)

  const [centredModal, setCentredModal] = useState(false);


  const [newEntry, setNewEntry] = useState(true)   //false means that this appointment didnt have entry before
  console.log(newEntry)
  const [currentEntry, setCurrentEntry] = useState(null) // this will hold this specific appointment entry data if there's to show for doctor so he can eddit after

  console.log("currentEntry")
  console.log(currentEntry)

  useEffect(()=>{


    const data ={
        "code" : code
      }  
    api.post(`/code/doctor/patient/${patientId}/medical-entries/appointment/${appointmentId}/`,data)
    .then((res)=> {
        const newData = res.data
        console.log("res")
        console.log(res)
        // return res.status

        console.log(res.data.current_appointment)
            
        if(res.data.current_appointment !== null){
            setCurrentEntry(res.data.current_appointment)
            setNewEntry(false)
            console.log("current_appointment is noooot null")
        }else{
            console.log("current_appointment is null")
        }
  
    }).catch((error) => {
        console.log(error)
        if(error.message === 'An error occurred. Please try again later.'){
          alert("Please enter a valid medical code")
        }else{
          alert("Either wrong appointment or patient")
        }        
    })



  },[appointmentId, code, patientId])

    const validationSchema = Yup.object().shape({
        medicalDiagnosis: Yup.string().required('Medical Diagnosis is required'),
        prescription: Yup.string().required('Prescription is required'),
        profileImgUrl: Yup.mixed().required('Analysis Image is required'),
      });

    const handleFileInputChange = (e, setFieldValue) => {
        setSelectedFiles([...e.target.files]);
        setFieldValue('profileImgUrl', e.target.files[0]);
    };




  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const { medicalDiagnosis, prescription, profileImgUrl } = values;

    console.log("prescription")
    console.log(prescription)

    console.log("profileImgUrl")
    console.log(profileImgUrl)

    const formData = new FormData();
    // formData.append('medical_diagnosis', medicalDiagnosis);
    // formData.append('prescription', prescription);
    // formData.append('analysis_image', profileImgUrl);
    // formData.append('code', "JSXOU7KJLA");

    const data = {
        'comment': medicalDiagnosis,
        'prescription': prescription,
        "code" :code,
        "analysis_image":profileImgUrl
    }

    console.log("data")
    console.log(data)

    console.log("formData")
    console.log(formData)


    api.post(`/medical-entry/doctor/create/patient/${patientId}/appointment/${appointmentId}/`,data)
      .then((response) => {

        console.log("response status")
        console.log(response)

        console.log("inside response")
        console.log(response)
        setVaryingModal(!varyingModal);

        setCurrentEntry(response.data)
        if(newEntry){
            setNewEntry(false)
        }
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Diagnosis added succefully.',
        });
        
      })
      .then((data) => {
        setSubmitting(false);
        resetForm();
      })
      .catch((error) => {
        console.error('Error:', error.originalError.response.status);
        setSubmitting(false);
        if(error.originalError.response.status === 406){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'This appointment already has entry, please update only.',
              });
        }else{
            console.log("outside of if")
        }
      });
  };

    const toggleShowPatient = () => {
        setCentredModal(!centredModal);
    };


    console.log("current eentru")
    console.log(currentEntry)

    const  medical_entry_id = currentEntry !== null ? currentEntry.id :  null
    console.log("medical_entry_id")
    console.log(medical_entry_id)



    const handelEntryUpdate = (values, { setSubmitting, resetForm }) => {
        const { medicalDiagnosis, prescription, profileImgUrl } = values;

        console.log("profileImgUrl")
        console.log(profileImgUrl)
    
        const formData = new FormData();
        // formData.append('medical_diagnosis', medicalDiagnosis);
        // formData.append('prescription', prescription);
        // formData.append('analysis_image', profileImgUrl);
        // formData.append('code', "JSXOU7KJLA");
    
        const data = {
            'comment': medicalDiagnosis,
            'prescription': prescription,
            "code" :code,
            "analysis_image":profileImgUrl
        }
    
        console.log("data")
        console.log(data)
    
        console.log("formData")
        console.log(formData)
    
    
        api.put(`/medical-entry/doctor/update/${medical_entry_id}/patient/${patientId}/appointment/${appointmentId}/`,data)
          .then((response) => {
    
            console.log("response status")
            console.log(response)
    
            console.log("inside response")
            console.log(response)
            setEditModel(!editModel)
    
            setCurrentEntry(response.data)
            if(newEntry){
                setNewEntry(false)
            }
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Diagnosis updated succefully.',
            });
            
          })
          .then((data) => {
            setSubmitting(false);
            resetForm();
          })
          .catch((error) => {
            console.error('Error:', error.originalError.response.status);
            setSubmitting(false);
            if(error.originalError.response.status === 406){
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'This appointment already has entry, please update only.',
                  });
            }else{
                console.log("outside of if")
            }
          });
      };
    

  return (
    <>
      <div>EntrySubmit</div>

        {
            newEntry ? 
                <MDBBtn
                type='button'
                onClick={() => {
                setVaryingModal(!varyingModal);
                }}
                >
                    Add
                </MDBBtn>
                : 
                <>
                    <MDBBtn
                        type='button'
                        onClick={() => {
                        setEditModel(!editModel)
                        }}
                    >
                        Edit
                    </MDBBtn>

                    <MDBBtn onClick={toggleShowPatient}>
                        View
                    </MDBBtn>
                
                </>

                

        }


    {/* edit the current history */}
{
    currentEntry !== null &&
<MDBModal show={editModel} setShow={setEditModel} tabIndex='-1'>
    <MDBModalDialog>
        <MDBModalContent>
            <MDBModalHeader>
            <MDBModalTitle>Edit existing Appointment </MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={() => setEditModel(!editModel)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>

                <Formik
                initialValues={{
                medicalDiagnosis: currentEntry.comment,
                prescription: currentEntry.prescription,        
                profileImgUrl: currentEntry.analysis_image,
                
                }}
                onSubmit={handelEntryUpdate}
                validationSchema={validationSchema}
                validateOnChange={true}
                validateOnBlur={true}
            >
                {({ isSubmitting, setFieldValue, errors, touched }) => (
                <Form>
                    <Field name="medicalDiagnosis">
                    {({ field }) => (
                        <MDBInput
                        {...field}
                        wrapperClass="mb-4"
                        textarea
                        id="form4Example1"
                        rows={4}
                        label="Medical Diagnosis"
                        invalid={touched.medicalDiagnosis && !!errors.medicalDiagnosis}
                        />
                    )}
                    </Field>
                    {/* {touched.medicalDiagnosis && errors.medicalDiagnosis && (
                        <div className='text-danger'>{errors.medicalDiagnosis}</div>
                    )} */}

                    <Field name="prescription">
                    {({ field }) => (
                        <MDBInput
                        {...field}
                        wrapperClass="mb-4"
                        textarea
                        id="form4Example2"
                        rows={4}
                        label="Prescription"
                        invalid={touched.prescription && !!errors.prescription}
                        />
                    )}
                    </Field>
                    {/* {touched.prescription && errors.prescription && (
                        <div className='text-danger'>{errors.prescription}</div>
                    )} */}



{/* 
                    <label htmlFor="inputTag" className="file-input-label">
                    <i className="fa fa-camera"></i>
                    <Field
                        id="inputTag"
                        type="file"
                        name="analysis_image"
                        onChange={(e) => handleFileInputChange(e, setFieldValue)}
                        invalid={touched.profileImgUrl && !!errors.profileImgUrl}
                    />
                    </label> */}


                        <label htmlFor="inputTag" className="file-input-label">
                            <i className="fa fa-camera"></i>
                            <input
                                id="inputTag"
                                type="file"
                                name="profileImgUrl"
                                onChange={(e) => handleFileInputChange(e, setFieldValue)}
                                // onBlur={props.form.handleBlur}
                            />
                        </label>

                    {/* {touched.profileImgUrl && errors.profileImgUrl && (
                        <div className='text-danger'>{errors.profileImgUrl}</div>
                    )} */}


                    <MDBModalFooter>
                        <MDBBtn type="button" color='secondary' onClick={() => setEditModel(!editModel)}>
                            Close
                        </MDBBtn>
                        <MDBBtn type="submit"  disabled={isSubmitting}>
                            Edit
                        </MDBBtn>

                    </MDBModalFooter>
                </Form>
                )}
            </Formik>
            </MDBModalBody>

        </MDBModalContent>
    </MDBModalDialog>
</MDBModal>


}


        {/* post new entry */}
        <MDBModal show={varyingModal} setShow={setVaryingModal} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                    <MDBModalTitle>New Appointment </MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={() => setVaryingModal(!varyingModal)}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>

                        <Formik
                        initialValues={{
                        medicalDiagnosis: '',
                        prescription: '',
                        profileImgUrl: '',
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                        validateOnChange={true}
                        validateOnBlur={true}
                    >
                        {({ isSubmitting, setFieldValue, errors, touched }) => (
                        <Form>
                            <Field name="medicalDiagnosis">
                            {({ field }) => (
                                <MDBInput
                                {...field}
                                wrapperClass="mb-4"
                                textarea
                                id="form4Example1"
                                rows={4}
                                label="Medical Diagnosis"
                                invalid={touched.medicalDiagnosis && !!errors.medicalDiagnosis}
                                />
                            )}
                            </Field>
                            {/* {touched.medicalDiagnosis && errors.medicalDiagnosis && (
                                <div className='text-danger'>{errors.medicalDiagnosis}</div>
                            )} */}

                            <Field name="prescription">
                            {({ field }) => (
                                <MDBInput
                                {...field}
                                wrapperClass="mb-4"
                                textarea
                                id="form4Example2"
                                rows={4}
                                label="Prescription"
                                invalid={touched.prescription && !!errors.prescription}
                                />
                            )}
                            </Field>
                            {/* {touched.prescription && errors.prescription && (
                                <div className='text-danger'>{errors.prescription}</div>
                            )} */}




                            <label htmlFor="inputTag" className="file-input-label">
                            <i className="fa fa-camera"></i>
                            <Field
                                id="inputTag"
                                type="file"
                                name="analysis_image"
                                onChange={(e) => handleFileInputChange(e, setFieldValue)}
                                invalid={touched.profileImgUrl && !!errors.profileImgUrl}
                            />
                            </label>

                            {/* {touched.profileImgUrl && errors.profileImgUrl && (
                                <div className='text-danger'>{errors.profileImgUrl}</div>
                            )} */}


                            <MDBModalFooter>
                                <MDBBtn type="button" color='secondary' onClick={() => setVaryingModal(!varyingModal)}>
                                    Close
                                </MDBBtn>
                                <MDBBtn type="submit"  disabled={isSubmitting}>
                                    Submit
                                </MDBBtn>

                            </MDBModalFooter>
                        </Form>
                        )}
                    </Formik>
                    </MDBModalBody>

                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>



        {/* model that views the already there medical entry for this appointment if any */}
        <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
          <MDBModalDialog centered>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Modal title</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={() => toggleShowPatient(null)}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>

                {currentEntry && (
                  <div>
                    <p>
                      <strong>Medical Analysis:</strong>
                    </p>
                    <span>{currentEntry.comment}</span>

                    <p>
                      <strong>Prescription:</strong>
                    </p>
                    <span>{currentEntry.prescription}</span>

                    <p>
                      <strong>Radiology:</strong>
                    </p>
                    <span>{currentEntry.analysis_image}</span>
                  </div>
                )}
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn
                  color="secondary"
                  onClick={() => toggleShowPatient(null)}
                >
                  Close
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>

    </>
  );
};

export default EntrySubmit;