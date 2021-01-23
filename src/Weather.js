function Weather(props) {
    return (
        <div>
            <div className="place-name">{props.data.name}</div>
            <div className="info-div">
                <div className="desc">{props.data.weather[0].description}</div>
                <div className="divide">
                    <div className="sep">
                        <h2>Weather</h2>
                        <div>
                            <b>Current Temperature:</b> {props.data.main.temp}
                            {props.units === 'metric' ? '°C' : ' F'}
                        </div>
                        <div>
                            <b>Maximum Temperature:</b>
                            {props.data.main.temp_max}
                            {props.units === 'metric' ? '°C' : ' F'}
                        </div>
                        <div>
                            <b>Min Temperature:</b> {props.data.main.temp_min}
                            {props.units === 'metric' ? '°C' : ' F'}
                        </div>
                        <div>
                            <b>feels like:</b> {props.data.main.feels_like}
                            {props.units === 'metric' ? '°C' : ' F'}
                        </div>
                    </div>
                    <div className="sep right">
                        <div>
                            <b>Pressure:</b> {props.data.main.pressure} hPa
                        </div>
                        <div>
                            <b>Humidity:</b> {props.data.main.humidity}%
                        </div>
                        <div>
                            <b>Visibility:</b>{' '}
                            {props.units === 'metric'
                                ? `${props.data.visibility} meters`
                                : `${(
                                      props.data.visibility * 0.00062137
                                  ).toFixed(2)} miles`}
                        </div>
                    </div>
                </div>
                <div className="sep">
                    <h2>Winds</h2>
                    <div>
                        <b>Direction: </b>
                        {props.data.wind.deg} degrees
                    </div>
                    <div>
                        <b>Speed:</b> {props.data.wind.speed}
                        {props.units === 'metric' ? ' meters/sec' : ' miles/hr'}
                    </div>
                </div>
                <div className="sep">
                    <h2>Sunrise and Sunset</h2>
                    <div>
                        <b>Sunrise:</b> {props.data.sys.sunrise}
                    </div>
                    <div>
                        <b>Sunset:</b> {props.data.sys.sunset}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Weather;
