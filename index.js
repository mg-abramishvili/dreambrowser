const express = require('express')

const ex = express()
const server = ex.listen(3000)

const fs = require('fs')
const path = require('path')
const url = require('url')

const configFile = JSON.parse(fs.readFileSync('config.json'))

let newConfigFile = configFile

newConfigFile.whitelist.push('guna.ru')

fs.writeFileSync('student-2.json', JSON.stringify(newConfigFile))

ex.get('/', function(req, res) {
    res.send('ok')
})

const { app, BrowserWindow } = require('electron')

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

    // mainWindow.webContents.openDevTools()

    const session = mainWindow.webContents.session
    session.on('will-download', (event, item, webContents) => {
        event.preventDefault()
    })

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

// new window blocker
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