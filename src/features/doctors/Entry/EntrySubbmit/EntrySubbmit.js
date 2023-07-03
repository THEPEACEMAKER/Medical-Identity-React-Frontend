import { Formik, Form, Field } from 'formik';
import { MDBInput, MDBBtn, MDBModalFooter, MDBModal, MDBModalDialog,MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody  } from 'mdb-react-ui-kit';
import { useState } from 'react';
import api from '../../../../api/api';
import Swal from 'sweetalert2';

const EntrySubmit = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [newEntry, setNewEntry] = useState(false)   //false means that this appointment didnt have entry before
  const [currentEntry, setCurrentEntry] = useState({
        id: 7,
        comment: " ",
        prescription: " ",
        analysis_image: " ",
    }) // this will hold this specific appointment entry data if there's to show for doctor so he can eddit after

  const handleFileInputChange = (e, setFieldValue) => {
    setSelectedFiles([...e.target.files]);
    setFieldValue('profileImgUrl', e.target.files[0]);
  };


  const patientId = "4"
  const appointmentId = "8"

  const handleSubmit = (values, { setSubmitting }) => {
    const { medicalDiagnosis, prescription, profileImgUrl } = values;
    // const { patientId, appointmentId } = values;

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

    console.log("formData")
    console.log(formData)


    api.post(`/medical-entry/doctor/create/patient/${patientId}/appointment/${appointmentId}/`,data)
      .then((response) => {

        console.log("response status")
        console.log(response.status)

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
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Diagnosis added succefully.',
          });
        // return response.json();
      })
      .then((data) => {
        // console.log(data);
        setSubmitting(false);
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





  const [varyingModal, setVaryingModal] = useState(false);








  return (
    <>
      <div>EntrySubmit</div>

         <MDBBtn
            onClick={() => {
            setVaryingModal(!varyingModal);
            }}
        >
            Add
        </MDBBtn>

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
                        // patientId: 0,
                        // appointmentId: 0,
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, setFieldValue }) => (
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
                                />
                            )}
                            </Field>
                            <Field name="prescription">
                            {({ field }) => (
                                <MDBInput
                                {...field}
                                wrapperClass="mb-4"
                                textarea
                                id="form4Example2"
                                rows={4}
                                label="Prescription"
                                />
                            )}
                            </Field>
                            <label htmlFor="inputTag" className="file-input-label">
                            <i className="fa fa-camera"></i>
                            <Field
                                id="inputTag"
                                type="file"
                                name="analysis_image"
                                onChange={(e) => handleFileInputChange(e, setFieldValue)}
                                
                            />
                            </label>
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
    </>
  );
};

export default EntrySubmit;