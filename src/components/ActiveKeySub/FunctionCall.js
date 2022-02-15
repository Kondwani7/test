import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';

const FunctionCall = () => {

  const [functionCallKeys, setFunctionCallKeys] = useState([])

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

  useEffect(() => {
    async function getKeys(){
      let keysArr = await window.account.getAccessKeys()
      let counter=0;
      let OutputArr = keysArr.map((x) => {
          if(x.access_key.permission!=="FullAccess"){
              counter += 1;
              return (
                  <tr key={counter}>
                      <td>{counter}</td>
                      <td>{x.public_key}</td>
                      <td>{x.access_key.nonce}</td>
                      <td>{formatOutput(window.utils.format.formatNearAmount(x.access_key.permission.FunctionCall.allowance))}</td>
                  </tr>
              )
          }
      })
      setFunctionCallKeys(
          OutputArr
      )
  }
  getKeys()
  }, [])

  return (
    <div>
      <Table style={{marginTop:"5%"}} striped bordered hover variant="primary">
        <thead>
          <tr>
            <th colSpan="2">Function Call Key Pairs</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th></th>
            <th>Public Key Pairs</th>
            <th>Nonce</th>
            <th>Allowance</th>
          </tr>
        </thead>
        <tbody>
          {functionCallKeys.map(x=> {return x})}
        </tbody>
      </Table>
    </div>
  )
}

export default FunctionCall