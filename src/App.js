import './App.css';
import React from 'react';
import {accordionClasses, AppBar, Box, Button, CircularProgress, IconButton, Toolbar} from "@mui/material";
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
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [activeBook, setActiveBook] = React.useState(undefined);
    const handleOnClick = async () => {
        const response = await window.electronAPI.parseFile();
        setData(response);
        setLoading(false);
        console.log('response', response);
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
                        <Typography  variant="h6" component="div" sx={{ flexGrow: 0 }}>
                            Информация о книге
                        </Typography>
                    </Toolbar>
                </AppBar>

            {data.length === 0 ? <Button onClick={handleOnClick}>Load xlsx</Button> : null}

            {loading ? (<Box sx={{display: 'flex'}}>
                    <CircularProgress/>
                </Box>)
                : <>
                    <Container>
                        <Books data={data} onRowClick={handleOnRowClick}/>
                        {activeBook ? <Book book={activeBook} /> : null}
                    </Container>
                </>}
        </div>
    );
}

export default App;
