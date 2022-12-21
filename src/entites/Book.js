import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styled from "@emotion/styled";
import {Skeleton} from "@mui/material";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  gap: 16px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const CoverImg = styled.div`
  min-width: 40%;
  height: 300px;
`

const bookMetaInfo = {
    title: {
        titleName: 'Авторы',
    },
    authors: {
        titleName: 'Серия',
    },
    series: {
        titleName: 'Категории',
    },
    categories: {
        titleName: 'Дата публикации',
    },
    publicationDate: {
        titleName: 'Издательство',
    },
    numberOfPages: {
        titleName: 'Количество страниц',
    },
    ISBN: {
        titleName: 'ISBN',
    },
    reading: {
        titleName: 'Чтение',
    },
    readingTime: {
        titleName: 'Время чтения',
    },
    comments: {
        titleName: 'Комментарии',
    },
    summary: {
        titleName: 'Краткое содержание',
    },
}
export default function Book({book}) {
    const [img, setImg] = useState('');
    useEffect(() => {
        const loadImg = async (src) => {
            return await window.electronAPI.loadCover(src);
        }
        if (book) {
            const img = loadImg(book.cover).then((res) => {
                console.log('res', res)
                setImg(`data:image/jpg;base64,${res}`);
            }).catch(e => {
                setImg('');
            })
        }
    }, [book])


    return (
        <Box sx={{minWidth: 275, width: '100%'}}>
            <Card variant="outlined">
                <CardContent>
                    <Container>
                        <CoverImg>
                            {img ? (<img src={img} style={{width: '90%', height: '100%'}}/>)
                                : (<Skeleton variant="rectangular" width={"90%"} height={'100%'}/>)}
                        </CoverImg>
                        <Description>
                            {Object.keys(book).filter((key) => (key !== 'cover' && key !== 'id')).map((propKey, _, array) => {
                                return (
                                    <Typography key={propKey} sx={{fontSize: 14, textAlign: 'start'}}
                                                color="text.secondary"
                                                gutterBottom>
                                        {bookMetaInfo[propKey].titleName}: {book[propKey]}
                                    </Typography>
                                )
                            })}
                        </Description>
                    </Container>
                </CardContent>
            </Card>
        </Box>
    );
}
