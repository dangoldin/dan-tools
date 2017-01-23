const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

electron.crashReporter.start({
  productName: "Dan's Tools",
  companyName: "Dan Goldin",
  submitURL: 'http://dangoldin.com',
  uploadToServer: true});

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1360, height: 800});
  mainWindow.loadURL('file://' + __dirname + '/public/index.html');
  // mainWindow.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
