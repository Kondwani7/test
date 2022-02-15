import React from 'react'
import  {Container, Row} from 'react-bootstrap';
import FullAccess from './ActiveKeySub/FullAccess';
import FunctionCall from './ActiveKeySub/FunctionCall';
const ActiveKeys = () => {
  return (
    <div>
        <Container>
            <Row className='d-flex justify-content-center'>
                <FullAccess/>
            </Row>
            <Row className='d-flex justify-content-center'>
                <FunctionCall/>
            </Row>
        </Container>
    </div>
  )
}

export default ActiveKeys