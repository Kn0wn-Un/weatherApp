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
            <h1>Units</h1>
            {props.units === 'metric' ? (
                <div>
                    <b>°C</b>/F
                </div>
            ) : (
                <div>
                    °C/<b>F</b>
                </div>
            )}
        </div>
    );
}
export default Toggle;
