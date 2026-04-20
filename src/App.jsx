import { Button, Form, Table } from 'react-bootstrap'
import './App.css'
import { useEffect, useMemo, useState } from 'react'
import api from './api/axios';

function App() {
  const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  const platforms = ["SL Hub YouTube", "SL Gaming YouTube","linkedIn","Facebook"];
  const [record, setRecord] = useState({
    platform: "SL Hub YouTube",
    income: 0,
    deduction: 0,
    month: "january",
  });

  const getDeductions = (a,b) => a-b;
  


  const [history, setHistory] = useState([]);

  const getTableData = async () => {
    return  await api.get("/income-records").then((res)=>{
      console.log("response",res);
      setHistory(res.data.data);
    }).catch((err)=>{
      console.log("error", err);
    })
  }

  useEffect(()=>{
    getTableData();
  },[])
  

  const submit = (event) => {
    event.preventDefault();
    const payload = {
                      ...record,
                      total: getDeductions(record.income, record.deduction)
    };

    api.post('/income-records', payload).then((res)=>{
      getTableData();
      console.log("response", res);
      setRecord(
      {
        platform: "SL Hub YouTube",
        income: 0,
        deduction: 0,
        month: "january",
      }
    )
    }).catch((err)=>{
      console.log("error", err);
    })
    

  }

  return (
    <>
      <section id="center">
        <div className='w-100 p-3'>
          <h2>All Income Inputs</h2>
          <Form onSubmit={submit}>
            <Form.Group className="mb-3 d-flex ">
              <Form.Label className='me-2'>Select Month</Form.Label>
              <Form.Select className='w-25 mb-3' aria-label="Default select example" onChange={(e)=>{setRecord({...record, month: e.target.value})}}>
                {
                  months.map((month, index) => {
                    return <option key={index} value={month}>{month}</option>
                  })
                }
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 d-flex " controlId="formBasicEmail ">
              <Form.Label className='me-2'>Select Platform</Form.Label>
              <Form.Select className='w-25 mb-3' aria-label="Default select example" onChange={(e)=>{setRecord({...record, platform: e.target.value})}}>
                {
                  platforms.map((platform, index) => {
                    return <option key={index} value={platform}>{platform}</option>
                  })
                }
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 d-flex " controlId="formBasicEmail ">
              <Form.Label className='me-2'>Record Data</Form.Label>
              <Form.Control className='me-2' type="number" placeholder="Enter Income" value={record.income} onChange={(e)=>setRecord({...record, income: Number(e.target.value)})} />
              <Form.Control className='me-2' type="number" placeholder="Enter Deduction" value={record.deduction} onChange={(e)=>setRecord({...record, deduction: Number(e.target.value)})} />
              <Form.Control type="number" disabled value={getDeductions(record.income, record.deduction)} />
            </Form.Group>
            
            
            

            
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps" id="center">
        <div className='w-100 p-3'>
                <h1>Past Income History</h1>
        <Table>
          <thead>
            <tr>
               <th>Record Id</th>
                <th>Month</th>
                <th>Platform</th>
                <th>Income</th>
                <th>Deduction</th>
                <th>Total</th>
            </tr>
               
          </thead>
          <tbody>
                {
                  history?.map((r,i)=>{
                    return <tr key={r.id}>
                      <td>{r.id}</td>
                      <td>{r.month}</td>
                      <td>{r.platform}</td>
                      <td>{r.income}</td>
                      <td>{r.deductions}</td>
                      <td>{r.record_total}</td>
                    </tr>
                  })
                }
          </tbody>
        </Table>
        </div>
        
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
