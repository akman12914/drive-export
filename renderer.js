const { ipcRenderer } = require("electron");

// 클립보드 텍스트를 읽어 Main Process로 요청
async function getClipboardText() {
  try {
    const clipboardText = await ipcRenderer.invoke("get-clipboard-text");
    console.log("Renderer에서 받은 클립보드 내용:", clipboardText);
  } catch (error) {
    console.error("클립보드 텍스트를 읽을 수 없습니다.", error);
  }
}

// 버튼 클릭 시 클립보드 읽기 요청
document.getElementById("readClipboard").addEventListener("click", getClipboardText);
