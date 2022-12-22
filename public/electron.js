const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs');

let pathWay = '';

async function handleFileOpen() {
    const {canceled, filePaths} = await dialog.showOpenDialog()
    if (canceled) {
        return
    } else {
        pathWay = filePaths[0];
        console.log('pathWay',pathWay);
        return parseFile(filePaths[0]);
    }
}


function parseFile(fileName) {
    const excelData = XLSX.readFile(fileName);
    const data = Object.keys(excelData.Sheets).map((name) => {
        return {
            name,
            data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
        }
    });
    const mappingObjectKey = data[0].data.map((book, index) => {
        return {
            id: index,
            title: book['Название'],
            authors: book['Авторы'],
            series: book['Серия'],
            categories: book['Категории'],
            publicationDate: book['Дата публикации'],
            numberOfPages: book['Количество страниц'],
            ISBN: book['Издательство'],
            reading: book['Чтение'],
            readingTime: book['Время чтения'],
            comments: book['Комментарии'],
            summary: book['Краткое содержание'],
            cover: book['Обложка'],
        }
    });

    return mappingObjectKey;
}

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: true,
        }
    })
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();

}

const handleOnLoadCover = async (_, src) => {
    console.log('pathWay - handleOnLoadCover', pathWay);
    const rootDir = pathWay.split('/').slice(0,pathWay.split('/').length - 1).join('/');
    const base64 = fs.readFileSync(`${path.join(rootDir,`${src.replace('.','')}.jpg`)}`).toString('base64');
    return base64;
}
app.whenReady().then(() => {
    ipcMain.handle('parseFile', parseFile);
    ipcMain.handle('openFile', handleFileOpen);
    ipcMain.handle('loadCover', handleOnLoadCover);
    createWindow();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
