const { app, BrowserWindow, ipcMain, clipboard, Tray, Menu } = require("electron");
const path = require("path");

let mainWindow;
let tray;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 200,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false, // nodeIntegration을 비활성화 (보안 문제 방지)
      contextIsolation: true, // contextIsolation을 활성화 (보안 문제 방지)
    },
    icon: path.join(__dirname, "favicon.png"), // 파비콘 경로 설정
  });

  mainWindow.loadFile("index.html");
}

ipcMain.handle("get-clipboard-text", () => {
  console.log("gg");
  const clipboardText = clipboard.readText();
  console.log(clipboardText);
  console.log(clipboard);
  console.log("클립보드 내용:", clipboardText);

  const modifiedText = convertGoogleDriveUrl(clipboardText);
  clipboard.writeText(modifiedText); // 클립보드에 텍스트 쓰기
  console.log("클립보드에 텍스트를 썼습니다:", modifiedText); // 텍스트가 잘 들어갔는지 확인
  return modifiedText;
});

function convertGoogleDriveUrl(originalUrl) {
  // 정규식으로 파일 ID 추출 ("/d/"와 "/view" 사이의 문자열)
  const regex = /\/d\/([a-zA-Z0-9_-]+)/;
  const match = originalUrl.match(regex);

  if (match && match[1]) {
    const fileId = match[1];
    // 새로운 형식의 URL로 반환
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  } else {
    // ID를 추출할 수 없는 경우
    return "error";
  }
}

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
