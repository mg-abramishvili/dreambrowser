const path = require('path')
const url = require('url')
const { app, BrowserWindow } = require('electron')
const { dialog } = require('electron')

let mainWindow

function createWindow () {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 576,
        frame: true,
        fullscreen: false,
        webPreferences: {
            webviewTag: true,
        }
    })

    mainWindow.loadFile('index.html')

    mainWindow.webContents.openDevTools()

    const session = mainWindow.webContents.session
    session.on('will-download', (event, item, webContents) => {
        event.preventDefault()
        // console.log(item)
        // console.log(`${url} will-download ...`)
        // const saveFileName = item.getFilename()
        // item.setSavePath(`/Users/yang/Desktop/electron_practice/electron-react/src/${saveFileName}`)
    })

    // mainWindow.webContents.on('before-input-event', (event, input) => {
    //     if(
    //         input.control && input.key.toLocaleLowerCase() === 'q' ||
    //         input.control && input.key.toLocaleLowerCase() === 'w' ||
    //         input.key.toLocaleLowerCase() === 'f4' ||
    //         input.key.toLocaleLowerCase() === 'f11' ||
    //         input.Alt
    //         )
    //     {
    //         event.preventDefault()
    //     }
    // })

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('web-contents-created', function (webContentsCreatedEvent, contents) {
    if (contents.getType() === 'webview') {
        contents.on('new-window', function (newWindowEvent, url) {
            newWindowEvent.preventDefault()
        })
    }
})

app.on('window-all-closed', function () {
    app.quit()
})