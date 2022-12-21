import './App.css';
import React from 'react';
import {AppBar, Backdrop, Box, Button, CircularProgress, Toolbar} from "@mui/material";
import Books from "./entites/Books";
import styled from "@emotion/styled";
import Book from "./entites/Book";
import Typography from "@mui/material/Typography";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  flex-direction: row;
`;
const getXlsxParsedData = async () => {
    const response = await window.electronAPI.parseFile();
    return response;
}



function App() {
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [activeBook, setActiveBook] = React.useState(undefined);

    const handleOnClick = async () => {
        setLoading(true);
        const response = await window.electronAPI.openFile();
        setData(response);
        setLoading(false);
    }

    const handleOnRowClick = (book) => {
        if (book) {
            setActiveBook(book);
        }
    };

    React.useEffect(() => {
        if (activeBook) {
            console.log('active', activeBook);
        }
    }, [activeBook])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 0}}>
                        Информация о книге
                    </Typography>
                </Toolbar>
            </AppBar>

            {data.length === 0 && loading === false ? <Button onClick={handleOnClick}>Load xlsx</Button> : null}

            {loading ? (<Box sx={{display: 'flex'}}>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={true}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>)
                : <>
                    <Container>
                        {data.length !== 0 ? <Books data={data} onRowClick={handleOnRowClick}/> : null}
                        {activeBook ? <Book book={activeBook}/> : null}
                    </Container>
                </>}
        </div>
    );
}

export default App;
