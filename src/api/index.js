import axios from 'axios';

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {
  let changeableUrl = url;
  if (country) {
    changeableUrl = `${url}/countries/${country}`
  }
  try {
    const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate
    }

  }
  catch (error) {
    console.log(error);
  }
}
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`)
    const modifiedData = data.map((DailyData) => (
      {
        deaths: DailyData.deaths.total,
        confirmed: DailyData.confirmed.total,
        reportDate: DailyData.reportDate
      }
    ))
    return modifiedData;
  }
  catch (error) {
    console.log(error);
  }
}
export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`${url}/countries`);
    //return data.countries
    return data.countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};