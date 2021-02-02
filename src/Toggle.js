import './styles.css';
function Toggle(props) {
    return (
        <div
            onClick={() => {
                props.units === 'metric'
                    ? props.change('imperial')
                    : props.change('metric');
            }}
            className="toggle"
        >
            <h1>Units:</h1>
            {props.units === 'metric' ? (
                <div>
                    <b style={{ color: 'rgb(63, 55, 201)' }}>°C</b>/F
                </div>
            ) : (
                <div>
                    °C/<b style={{ color: 'rgb(214, 40, 40)' }}>F</b>
                </div>
            )}
        </div>
    );
}
export default Toggle;
