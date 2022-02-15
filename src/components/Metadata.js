import React, {useState, useEffect} from 'react'
import {Table} from 'react-bootstrap';

const Metadata = (props) => {
    const [metaData, setMetaData] = useState({});

    useEffect(() => {
             async function getData() {
                 let Data = await window.account.state()
                 console.log(Data);
                 setMetaData(Data);
             }
             getData();
        }, [])
  return (
    <div style={{marginTop:"5%"}}>
        <Table striped bordered hover variant='primary'>
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Amount</th>
                    <th>{metaData.amount}</th>
                </tr>
                <tr>
                    <th>Block hash</th>
                    <th>{metaData.block_hash}</th>
                </tr>
                <tr>
                    <th>Amount</th>
                    <th>{metaData.block_height}</th>
                </tr>
                <tr>
                    <th>Code Hash</th>
                    <th>{metaData.code_hash}</th>
                </tr>
                <tr>
                    <th>Locked</th>
                    <th>{metaData.locked}</th>
                </tr>
                <tr>
                    <th>Storage Paid at</th>
                    <th>{metaData.storage_paid_at}</th>
                </tr>
                <tr>
                    <th>Storage Usage</th>
                    <th>{metaData.storage_usage}</th>
                </tr>
            </tbody>
        </Table>
    </div>
  )
}

export default Metadata