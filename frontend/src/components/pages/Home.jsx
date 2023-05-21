import React from 'react'
import Navbar from '../layout/Navbar'
import { useState } from 'react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver';
import {button} from '@headlessui/react'
function Home() {
    const [Datafromfile , setDatafromfile] = useState([]);
    const [newData, setNewData] = useState([]);


    const readExcel = async (file) => {

        return new Promise(async (resolve, reject) => {
          const filereader = new FileReader();
          filereader.readAsArrayBuffer(file);
      
          filereader.onload = (e) => {
            const bufferArray = e.target.result;
            const wb = XLSX.read(bufferArray, { type: 'buffer' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);
            resolve(data);
          };
      
          filereader.onerror = (error) => {
            reject(error);
          };
        })
        .then((data) => {
          setDatafromfile(data);
          {
            const newArray = [];
for (let i = 0; i < data.length; i++) {
  let variantExists = false;
  for (let j = 0; j < newArray.length; j++) {
    if (newArray[j].variant === data[i].variant) {
      newArray[j].stock += `|${data[i].stock}`;
      variantExists = true;
      break;
    }
  }
  if (!variantExists) {
    newArray.push({
      variant: data[i].variant,
      stock: `${data[i].stock}`
    });
  }
}

  

        setNewData(newArray)
      console.log(newData)
        }
          // Process the data further or perform any other operations
        });
      };
      const downloadExcel = () => {
        if (newData != null) {
          const newDataWithRenamedColumns = newData.map((item) => {
            return { SKU: item.variant, stock_ids: item.stock };
          });
      
          const wb = XLSX.utils.book_new();
          const ws = XLSX.utils.json_to_sheet(newDataWithRenamedColumns);
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
          const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
          const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(blob, 'Sample 2.xlsx');
        }
      };
      //API call
      const apiCallForStocks = async (newData) => {
        try {
          // Remove the first row from the newData array
          const dataToSend = newData.slice(1);
          
          // Create a deep copy of dataToSend without circular references
          const cleanedData = JSON.parse(JSON.stringify(dataToSend));
          
          console.log(cleanedData);
          
          const response = await fetch("http://localhost:8000/data", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cleanedData),
          });
          
          const json = await response.json();
          alert("Data save to database Successfully");
          console.log(json);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      
      // Call the function passing the newData array
    //   apiCallForStocks(newData);
      
      
  return (
    <><div><Navbar/>
    
    </div>
    <div className='center'>
    <input type='file' onChange={(e)=>{
        const file = e.target.files[0]
        readExcel(file)
    }}></input>
    {Array.isArray(Datafromfile) ? (
  <table className='table'>
    <thead>
      <tr>
        <td>variant</td>
        <td>stocks</td>
      </tr>
    </thead>
    <tbody>
      {Datafromfile.map((item, index) => (
        <tr key={index}>
          <td>{item.variant}</td>
          <td>{item.stock}</td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p>No data available</p>

  
)}

<div className='btcenter'><button onClick={downloadExcel} className='button'>
      Download Excel
    </button>

    <button  className='button' onClick={() => apiCallForStocks(newData)}>Send Data</button></div>
    </div>
    
    </> 
    
  )
}

export default Home