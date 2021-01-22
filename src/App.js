import { useEffect, useState } from 'react';
import UserInput from './UserInput';
import './styles.css';
function App() {
    const [data, setData] = useState({});
    const [gotData, setGotData] = useState(false);
    async function fetchResults(city, lon) {
        let response;
        if (!lon) {
            response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a60446147f601604724971a987162ebb&units=metric`
            );
        } else {
            let lat = city;
            response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a60446147f601604724971a987162ebb&units=metric`
            );
        }
        if (!response.ok) {
            setGotData(false);
            fetchResults('bengaluru');
            alert('city not found :(');
            return;
        }
        const res = await response.json();
        console.log(res);
        setData(res);
        setGotData(true);
    }
    function handleSearch(city) {
        alert('searching ' + city);
        fetchResults(city);
    }
    function useLocation(c) {
        console.log(c.latitude);
        console.log(c.longitude);
    }
    useEffect(() => {
        fetchResults('bengaluru');
    }, []);
    return (
        <div>
            <UserInput handleSearch={handleSearch} useLocation={useLocation} />
            {gotData ? (
                <div className="main-div">
                    <div className="place-name">{data.name}</div>
                    <div className="info-div">
                        <div>Description: {data.weather[0].description}</div>
                        <div>date: {data.dt}</div>
                        <div>
                            <div>Temperature: {data.main.temp}</div>
                            <div>Max: {data.main.temp_max}</div>
                            <div>Min: {data.main.temp_min}</div>
                        </div>
                        <div>
                            <div>Pressure: {data.main.pressure}</div>
                            <div>Humidity: {data.main.humidity}</div>
                            <div>Visibility: {data.visibility}</div>
                            <div>feels like: {data.main.feels_like}</div>
                        </div>
                        <div>
                            <div>Winds</div>
                            <div>deg: {data.wind.deg}</div>
                            <div>Speed: {data.wind.speed}</div>
                        </div>
                        <div>
                            <div>Sunrise: {data.sys.sunrise}</div>
                            <div>Sunset: {data.sys.sunset}</div>
                        </div>
                    </div>
                </div>
            ) : (
                'Loading...'
            )}
        </div>
    );
}

export default App;
