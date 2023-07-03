import { Formik, Form, Field } from 'formik';
import { MDBInput, MDBBtn, MDBModalFooter, MDBModal, MDBModalDialog,MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody  } from 'mdb-react-ui-kit';
import { useState } from 'react';
import api from '../../../../api/api';
import Swal from 'sweetalert2';
import * as Yup from 'yup';


// {
//     comment: " ",
//     prescription: " ",
//     analysis_image: " ",
// }

const EntrySubmit = () => {
  const [varyingModal, setVaryingModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [centredModal, setCentredModal] = useState(false);


  const [newEntry, setNewEntry] = useState(true)   //false means that this appointment didnt have entry before
  console.log(newEntry)
  const [currentEntry, setCurrentEntry] = useState(null) // this will hold this specific appointment entry data if there's to show for doctor so he can eddit after

  console.log("currentEntry")
  console.log(currentEntry)

    const validationSchema = Yup.object().shape({
        medicalDiagnosis: Yup.string().required('Medical Diagnosis is required'),
        prescription: Yup.string().required('Prescription is required'),
        profileImgUrl: Yup.mixed().required('Analysis Image is required'),
      });

    const handleFileInputChange = (e, setFieldValue) => {
        setSelectedFiles([...e.target.files]);
        setFieldValue('profileImgUrl', e.target.files[0]);
    };


  const patientId = "4"
  const appointmentId = "8"

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
        "code" :"JSXOU7KJLA",
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

        if (response.status === 400) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: '400',
              });
              setVaryingModal(!varyingModal);
        }
        console.log("inside response")
        console.log(response)
        setVaryingModal(!varyingModal);

        // console.log("Current entry before")
        // console.log(currentEntry)

        // console.log("the response")
        setCurrentEntry(response.data)
        if(newEntry){
            setNewEntry(false)
        }

        // console.log("Current entry after")
        // console.log(currentEntry)

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


//   {
//     newEntry ? (
//     <MDBBtn type="submit"  disabled={isSubmitting}>
//     Submit
//     </MDBBtn>) : 
//     <>
//     (
//         <MDBBtn type="submit"  disabled={isSubmitting}>
//             Submit
//         </MDBBtn>
//         <MDBBtn type="submit"  disabled={isSubmitting}>
//             Submit
//         </MDBBtn> )
//     </>

// }


    const toggleShowPatient = () => {
        // if (appoint !== null) {
        // setSelectedAppointment(appoint);
        // }
        setCentredModal(!centredModal);
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
                        setVaryingModal(!varyingModal);
                        }}
                    >
                        Edit
                    </MDBBtn>
                    {/* <MDBBtn
                    type='button'
                        onClick={() => {
                        setVaryingModal(!varyingModal);
                        }}
                    >
                        View
                    </MDBBtn> */}

                    <MDBBtn onClick={toggleShowPatient}>
                        View
                    </MDBBtn>
                
                </>

                

        }





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
                {/* <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                        </p> */}

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