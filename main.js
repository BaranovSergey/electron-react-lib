const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path');
const XLSX = require('xlsx');

function parseFile(fileName) {
    const excelData = XLSX.readFile('./books.xls');
    const data = Object.keys(excelData.Sheets).map((name) => {
        return {
            name,
            data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
        }
    });
    const mappingObjectKey = data[0].data.map((book, index) => {
        return {
            id:index,
            title:book['Название'],
            authors:book['Авторы'],
            series:book['Серия'],
            categories:book['Категории'],
            publicationDate:book['Дата'],
            numberOfPages:book['Количество страниц'],
            ISBN:book['Издательство'],
            reading:book['Чтение'],
            readingTime:book['Время чтения'],
            comments:book['Комментарии'],
            summary:book['Краткое содержание'],
            cover:book['Обложка'],
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

app.whenReady().then(() => {
    ipcMain.handle('parseFile', parseFile)
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