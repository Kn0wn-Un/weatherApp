import { useEffect, useState } from 'react';
import UserInput from './UserInput';
import Weather from './Weather';
import MYAPIKEY from './myapi';
import './styles.css';
function App() {
    const [data, setData] = useState({});
    const [gotData, setGotData] = useState(false);
    const [units, setUnits] = useState('imperial');
    const [city, setCity] = useState('bengaluru');
    async function fetchResults(c, lon) {
        let response;
        if (!lon) {
            response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${c}&appid=${MYAPIKEY}&units=${units}`
            );
        } else {
            let lat = c;
            response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${MYAPIKEY}&units=${units}`
            );
        }
        if (!response.ok) {
            setGotData(false);
            fetchResults('bengaluru');
            alert('city not found :(');
            setCity('bengaluru');
            return;
        }
        const res = await response.json();
        res.sys.sunrise = setTime(res.sys.sunrise * 1000);
        res.sys.sunset = setTime(res.sys.sunset * 1000);
        setData(res);
        setGotData(true);
    }
    function handleSearch(ci) {
        if (!ci) return;
        setCity(ci);
        fetchResults(ci);
    }
    function useLocation(c) {
        setCity(c);
        fetchResults(c.latitude, c.longitude);
    }
    function setTime(t) {
        let d = new Date(t);
        return d.toLocaleTimeString();
    }
    useEffect(() => {
        fetchResults('bengaluru');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (typeof city === 'object')
            fetchResults(city.latitude, city.longitude);
        else fetchResults(city);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [units]);
    return (
        <div>
            <span>
                <UserInput
                    handleSearch={handleSearch}
                    useLocation={useLocation}
                    setUnits={setUnits}
                    units={units}
                />
            </span>
            <div className="f">
                <div className="main-div">
                    {gotData ? (
                        <Weather units={units} data={data} />
                    ) : (
                        <h1>'Loading...'</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
