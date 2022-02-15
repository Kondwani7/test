import React,{useState, useEffect}  from 'react'
import {Container, Row, Col, Card, ListGroup, Button, Table} from 'react-bootstrap';

const SendToken = (props) => {

    const [recipients, setRecipients] = useState([]);
    const [valuesSent, setValuesSent] = useState([]);
    const [balance, setBalance]  = useState(0);
    //React DOM way of interacting with the current state of target values in the "window"
    let ValueInput = React.createRef();
    let Recipient = React.createRef();
    //send token
    const sendGift = async() => {
      let getState = await window.account.state()
      //get amounts in a clean format
      let getAmount = await window.utils.format.formatNearAmount(getState.amount)
      let enteredValue = ValueInput.current.value 

      if(Number(getAmount) > Number(enteredValue)){
        //if the amount requested is less than our balance, send to the target recipient
        await window.account.sendMoney(Recipient.current.value, window.utils.format.parseNearAmount(enteredValue))
        .then(
          await window.contract.addFunds({recipient:Recipient.current.value, amount: Number(enteredValue)})
        ).then(
          setRecipients(
            await window.contract.getNames({User:window.accountId})
          )
        ).then(
          setValuesSent(
            await window.contract.getTotals({User: window.accountId})
          )
        )
      } else{
        alert("User does not have enough funds")
      }
    }

    useEffect(() => {
      async function getData(){
        let Data = await window.account.state()
        setBalance(Data.amount)
      }
      getData()
    }, [balance])

    useEffect(() => {
      async function getTransaction () {
        //recipient
        setRecipients(
          await window.contract.getNames({User:window.accountId})
        )
        //amount
        setValuesSent(
          await window.contract.getTotals({User: window.accountId})
        )
      }
      getTransaction()
    }, [])
    //remove uneccessary decimals
    const formatOutput = (text) => {
      text = String(text);

      if(text.includes('.')){
        let arr = text.split('.')
        //split the text and return one value
        arr[1] = arr[1].split('').splice(0,2).join('')
        console.log(arr)
        return arr.join('.')
      }else{
        return text
      }
    }
    
  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Card>
          <Card.Header>Near Token balance</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>Near Tokens</ListGroup.Item>
          </ListGroup>
        </Card>
      </Row>
      <br></br>
      <Row className="d-flex justify-content-center">
        <Card>
          <Card.Header>Send Tokens</Card.Header>
          <Card.Body>
            <Container>
              <Row>
                <Col>
                  <input type="text" placeholder="recipient" ref={Recipient}/>
                  <input type="text" placeholder='amount' ref={ValueInput}/>
                </Col>
                <Col>
                  <Button onClick={sendGift}>Submit</Button>
                </Col>
              </Row>
              <br></br>
              <Row  styles={{marginTop:"10%"}} className='d-flex justify-content-center'>
                <Table  striped bordered hover variant='dark'>
                  <thead>
                    <tr>
                      <th colSpan="2">Transaction History</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      recipients.map((x, index)=> {
                        return (
                          <tr key={x}>
                            <td>{x}</td>
                            <td>{`${valuesSent[index]} Near`}</td>
                          </tr>
                        )
                      })
                    }  
                  </tbody>
                </Table>
              </Row>  
            </Container>
          </Card.Body>
        </Card>
      </Row>

    </Container>
  )
}

export default SendToken