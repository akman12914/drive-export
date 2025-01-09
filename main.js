const { app, BrowserWindow, clipboard, Tray, Menu } = require("electron");
const path = require("path");

let mainWindow;
let tray;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 200,
    webPreferences: {
      nodeIntegration: true, // Node.js API를 렌더러 프로세스에서 사용할 수 있게 설정
    },
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  // 바탕화면 아이콘 클릭 시 앱 열기
  tray = new Tray(path.join(__dirname, "icon.png")); // 아이콘 파일 경로

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Change Clipboard Text",
      click: () => {
        clipboard.writeText("새로운 클립보드 텍스트!"); // 클립보드 내용 바꾸기
      },
    },
    {
      label: "Exit",
      click: () => {
        app.quit(); // 앱 종료
      },
    },
  ]);
  tray.setToolTip("클립보드 텍스트 바꾸기");
  tray.setContextMenu(contextMenu);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
