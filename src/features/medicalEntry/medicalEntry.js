import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBCardTitle, } from 'mdb-react-ui-kit';
import Card from '../../UI/card/Card'; 
export default function PersonalProfile() {
  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100 text-center">
          <MDBCol lg="12" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem', height: '40rem'}}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '200px' }} />
                  <MDBTypography tag="h5">Marie Horwitz</MDBTypography>
                  <MDBCardText>Web Designer</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">info@example.com</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">123 456 789</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">History</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      
                    </MDBRow>
                    <Card>
                        <div style={{ maxWidth: '40rem' }}>
                            <MDBRow className='g-0'>
                                <MDBCol md='3'>
                                    <MDBCardImage src='https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg' alt='...' fluid />
                                </MDBCol>
                                <MDBCol md='8'>
                                    <div>
                                        <div >Doctor Name</div>
                                        <div>
                                            This is a wider card with supporting text below as a natural lead-in to additional content. This
                                            content is a little bit longer.
                                        </div>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </div>
                    </Card>
                    <br></br>
                    <Card>
                        <div style={{ maxWidth: '40rem' }}>
                            <MDBRow className='g-0'>
                                <MDBCol md='3'>
                                    <MDBCardImage src='https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg' alt='...' fluid />
                                </MDBCol>
                                <MDBCol md='9'>
                                    <div>
                                        <div >Doctor Name</div>
                                        <div>
                                            This is a wider card with supporting text below as a natural lead-in to additional content. This
                                            content is a little bit longer.
                                        </div>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </div>
                    </Card>
                    <br></br>
                    <Card>
                        <div style={{ maxWidth: '40rem' }}>
                            <MDBRow className='g-0'>
                                <MDBCol md='3'>
                                    <MDBCardImage src='https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg' alt='...' fluid />
                                </MDBCol>
                                <MDBCol md='9'>
                                    <div>
                                        <div >Doctor Name</div>
                                        <div>
                                            This is a wider card with supporting text below as a natural lead-in to additional content. This
                                            content is a little bit longer.
                                        </div>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </div>
                    </Card>

                        
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}