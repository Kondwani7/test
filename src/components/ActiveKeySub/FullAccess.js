import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';

const FullAccess = () => {
    
    const [fullAccessKeys, setFullAccessKeys] = useState([])

    useEffect(()=>{
        async function getKeys(){
            let keysArr = await window.account.getAccessKeys()
            let counter=0;
            let OutputArr = keysArr.map((x,index) => {
                if(x.access_key.permission==="FullAccess"){
                    counter += 1;
                    return (
                        <tr key={counter}>
                            <td>{counter}</td>
                            <td>{x.public_key}</td>
                        </tr>
                    )
                }
            })
            setFullAccessKeys(
                OutputArr
            )
        }
        getKeys()
    }, [])
  return (
    <Table  striped bordered hover variant='dark'>
        <thead>
            <tr>
                <th colSpan="2">Full Access Key Pairs</th>
            </tr>
        </thead>
        <tbody>
            {fullAccessKeys.map(x=>{return x})}
        </tbody>
    </Table>
  )
}

export default FullAccess