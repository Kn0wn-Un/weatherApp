import { Container, Button, IconButton, Box } from '@material-ui/core';
import { Alarm } from '@material-ui/icons';
import { useEffect, useState } from 'react';
function App() {
    const [data, setData] = useState({});
    const [gotData, setGotData] = useState(false);
    async function fetchResults() {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=a60446147f601604724971a987162ebb`
        );
        if (!response.ok) {
            setData(false);
            return;
        }
        const res = await response.json();
        setData(res);
        setGotData(true);
    }
    useEffect(() => {
        fetchResults();
        console.log(data);
    }, []);
    return (
        <Container maxWidth={false}>
            <h1>
                <code>{gotData ? data.name : 'Loading...'}</code>
            </h1>
            <IconButton color="secondary" aria-label="add an alarm">
                <Alarm />
            </IconButton>
            <Button
                variant="contained"
                color="primary"
                href="https://reactjs.org"
                startIcon={<Alarm />}
            >
                Learn React
            </Button>
            <Box bgcolor="primary">Learn React</Box>
        </Container>
    );
}

export default App;
