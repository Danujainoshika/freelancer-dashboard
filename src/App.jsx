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
      <div className="container py-5">
    
    {/* FORM SECTION */}
    <div className="card shadow-lg border-0 mb-5">
      <div className="card-body p-4">
        <h3 className="mb-4 fw-bold text-primary">Income Tracker</h3>

        <Form onSubmit={submit}>
          
          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Label>Month</Form.Label>
              <Form.Select 
                className="form-control-modern"
                onChange={(e)=>{setRecord({...record, month: e.target.value})}}
              >
                {months.map((month, index) => (
                  <option key={index} value={month}>{month}</option>
                ))}
              </Form.Select>
            </div>

            <div className="col-md-6">
              <Form.Label>Platform</Form.Label>
              <Form.Select 
                className="form-control-modern"
                onChange={(e)=>{setRecord({...record, platform: e.target.value})}}
              >
                {platforms.map((platform, index) => (
                  <option key={index} value={platform}>{platform}</option>
                ))}
              </Form.Select>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-4">
              <Form.Label>Income</Form.Label>
              <Form.Control
                type="number"
                className="form-control-modern"
                placeholder="Enter Income"
                value={record.income}
                onChange={(e)=>setRecord({...record, income: Number(e.target.value)})}
              />
            </div>

            <div className="col-md-4">
              <Form.Label>Deduction</Form.Label>
              <Form.Control
                type="number"
                className="form-control-modern"
                placeholder="Enter Deduction"
                value={record.deduction}
                onChange={(e)=>setRecord({...record, deduction: Number(e.target.value)})}
              />
            </div>

            <div className="col-md-4">
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="number"
                disabled
                className="form-control-modern bg-light fw-bold"
                value={getDeductions(record.income, record.deduction)}
              />
            </div>
          </div>

          <Button variant="primary" className="px-4 py-2 fw-semibold" type="submit" >
            Save Record
          </Button>

        </Form>
      </div>
    </div>

    {/* TABLE SECTION */}
    <div className="card shadow-lg border-0">
      <div className="card-body p-4">
        <h4 className="mb-4 fw-bold text-dark">Income History</h4>

        <Table hover responsive className="modern-table align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Month</th>
              <th>Platform</th>
              <th>Income</th>
              <th>Deduction</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {history?.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td className="text-capitalize">{r.month}</td>
                <td>{r.platform}</td>
                <td className="text-success fw-semibold">Rs {r.income}</td>
                <td className="text-danger">Rs {r.deductions}</td>
                <td className="fw-bold text-primary">Rs {r.record_total}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>

  </div>
    </>
  )
}

export default App
