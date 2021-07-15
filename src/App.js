import React, { useEffect, useState } from 'react';
import { Cards, CountryPicker, Chart } from './components';
import styles from './App.module.css';
import {fetchData} from './api' //it will directly look into index file
import {Typography} from '@material-ui/core'
function App() {
  const[data,setData] = useState({})
  const [country, setcountry] = useState('')
  useEffect(() => {
    async function fetchMyData() {
      const fetchedData = await fetchData();
       setData(fetchedData)   
    }
    fetchMyData();
  }, [])
  
  const handleCountryChange = async (country) =>{
    const fetchedData = await fetchData(country)
    //console.log(fetchedData);
    // setcountry(country)
    setData(fetchedData)
    setcountry(country)
   
  }
  // console.log(mydata);
   //console.log('country123',  country);
  return (
    <div className={styles.container}>
      <Typography variant='h3'>Covid 19</Typography>
      <Cards data={data}/>
      <CountryPicker handleCountryChange={handleCountryChange}/>
      <Chart data={data} country={country}/>
    </div>
  );
}

export default App;
