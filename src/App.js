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
        fetchResults(city);
    }
    function useLocation(c) {
        fetchResults(c.latitude, c.longitude);
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
                        <div className="desc">
                            {data.weather[0].description}
                        </div>
                        <div className="sep">
                            <h2>Temperature</h2>
                            <div>Current: {data.main.temp}</div>
                            <div>Max: {data.main.temp_max}</div>
                            <div>Min: {data.main.temp_min}</div>
                            <div>feels like: {data.main.feels_like}</div>
                        </div>
                        <div className="sep">
                            <h2>Other</h2>
                            <div>Pressure: {data.main.pressure}</div>
                            <div>Humidity: {data.main.humidity}</div>
                            <div>Visibility: {data.visibility}</div>
                        </div>
                        <div className="sep">
                            <h2>Winds</h2>
                            <div>{data.wind.deg} degrees</div>
                            <div>Speed: {data.wind.speed}</div>
                        </div>
                        <div className="sep">
                            <h2>Sunrise and Sunset</h2>
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
