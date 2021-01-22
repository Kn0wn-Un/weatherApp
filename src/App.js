import { IconButton, OutlinedInput, InputAdornment } from '@material-ui/core';
import { Search, LocationOn } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import './styles.css';
function App() {
    const [data, setData] = useState({});
    const [gotData, setGotData] = useState(false);
    const [search, setSearch] = useState('Bengaluru');
    async function fetchResults() {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a60446147f601604724971a987162ebb`
        );
        if (!response.ok) {
            setData(false);
            return;
        }
        const res = await response.json();
        console.log(res);
        setData(res);
        setGotData(true);
    }
    function handleClick() {}
    function handleSearch() {}
    useEffect(() => {
        fetchResults();
    }, []);
    return (
        <div>
            {gotData ? (
                <div>
                    <div>
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            value={search}
                            onChange={handleClick}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleSearch}
                                        edge="end"
                                    >
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            }
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                            labelWidth={0}
                        />
                    </div>
                    <div className="main-div">
                        <div className="place-name">
                            <span>{data.name}</span>
                            <LocationOn color="primary" fontSize="large" />
                        </div>
                        <div className="info-div">
                            <div>Temperature: {data.main.temp}</div>
                            <div>Max: {data.main.temp_max}</div>
                            <div>Min: {data.main.temp.min}</div>
                            <div>Pressure: {data.main.pressure}</div>
                            <div>Humidity: {data.main.humidity}</div>
                            <div>feels like: {data.main.feels_like}</div>
                            <div>Sunrise: {data.sys.sunrise}</div>
                            <div>Sunset: {data.sys.sunset}</div>
                            <div>Visibility: {data.visibility}</div>
                            <div>
                                Description: {data.weather[0].description}
                            </div>
                            <div>date: {data.dt}</div>
                            <div>Winds</div>
                            <div>deg: {data.wind.deg}</div>
                            <div>Speed: {data.wind.speed}</div>
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
