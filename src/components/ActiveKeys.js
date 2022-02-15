import React from 'react'
import  {Container, Row} from 'react-bootstrap';
import FullAccess from './ActiveKeySub/FullAccess';
const ActiveKeys = () => {
  return (
    <div>
        <Container>
            <Row className='d-flex justify-content-center'>
                <FullAccess/>
            </Row>
            <Row className='d-flex justify-content-center'>
                Function call access
            </Row>
        </Container>
    </div>
  )
}

export default ActiveKeys