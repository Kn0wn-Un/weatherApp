import {
    IconButton,
    OutlinedInput,
    InputAdornment,
    Button,
} from '@material-ui/core';
import { Search, LocationOn } from '@material-ui/icons';
import { useState } from 'react';
import './styles.css';
function UserInput(props) {
    const [search, setSearch] = useState('');
    function getLocation() {
        navigator.geolocation.getCurrentPosition(
            (c) => {
                props.useLocation(c.coords);
            },
            () => {
                alert('Unable to retrieve your location');
            }
        );
    }
    return (
        <div className="user-input">
            <OutlinedInput
                id="outlined-adornment-weight"
                value={search}
                placeholder="Bengaluru"
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') props.handleSearch(search);
                }}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => {
                                props.handleSearch(search);
                            }}
                            edge="end"
                        >
                            <Search />
                        </IconButton>
                    </InputAdornment>
                }
                inputProps={{
                    'aria-label': 'weight',
                }}
            />
            {' OR '}
            <span>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<LocationOn />}
                    onClick={getLocation}
                >
                    USE LOCATION
                </Button>
            </span>
        </div>
    );
}
export default UserInput;
