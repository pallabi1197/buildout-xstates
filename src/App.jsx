import { useEffect, useState } from "react";
import "./App.css";


function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectCountry, setSelectCountry] = useState("");
  const [selectState, setSelectState] = useState("");
  const [selectCity, setSelectCity] = useState("");

  const countryAPI = "https://location-selector.labs.crio.do/countries";
 

  useEffect(() => {
    const getCountryData = async () => {
      const response = await fetch(countryAPI);
      const countryData = await response.json();
      setCountries(countryData);
      setSelectState("");
      setSelectCity("");
    };

    getCountryData();
  }, []);

  useEffect(() => {
    if (!selectCountry) return;
    const getStateData = async () => {
      const response = await fetch(`https://location-selector.labs.crio.do/country=${selectCountry}/states`);
      const stateData = await response.json();
      setStates(stateData);
      setSelectCity("");
    };

    getStateData();
  }, [selectCountry]);

  useEffect(() => {
    if (!selectCountry || !selectState) return;
    const getCityData = async () => {
      const response = await fetch(`https://location-selector.labs.crio.do/country=${selectCountry}/state=${selectState}/cities`);
      const cityData = await response.json();
      setCities(cityData);
    };

    getCityData();
  }, [selectCountry, selectState]);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Selection Location</h1>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <select
          name="selectCountry"
          value={selectCountry}
          onChange={(e) => {
            setSelectCountry(e.target.value);
          }}
        >
          <option>Select Country</option>
          {countries.map((country) => {
            return (
              <option key={country} value={country}>
                {country}
              </option>
            );
          })}
        </select>

        <select
          disabled={!selectCountry}
          name="selectState"
          value={selectState}
          onChange={(e) => {
            setSelectState(e.target.value);
          }}
        >
          <option>Select State</option>
          {states && states.map((state) => {
            return (
              <option key={state} value={state}>
                {state}
              </option>
            );
          })}
        </select>
        <select
          disabled={!selectState}
          name="selectCity"
          value={selectCity}
          onChange={(e) => {
            setSelectCity(e.target.value);
          }}
        >
          <option>Select City</option>
          {cities && cities.map((city) => {
            return (
              <option key={city} value={city}>
                {city}
              </option>
            );
          })}
        </select>
      </div>
      <div style={{ textAlign: "center" }}>
        {selectCity && (
          <h3>
            You selected <span style={{ fontSize: "30px" }}>{selectCity}</span>,{" "}
            <span style={{ color: "gray" }}>
              {selectState}, {selectCountry}
            </span>
          </h3>
        )}
      </div>
    </>
  );
}

export default App;
