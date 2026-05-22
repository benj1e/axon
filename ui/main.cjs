const {
    app,
    BrowserWindow,
    globalShortcut,
    Tray,
    Menu,
    nativeImage,
    ipcMain,
} = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let mainPanel = null;
let tray = null;

const isDev = true;
const VITE_PORT = 3000;

let backendProcess = null;

function startBackend() {
    const backendPath = app.isPackaged
        ? path.join(process.resourcesPath, "backend", "axon-backend.exe")
        : path.join(__dirname, "..", "dist", "axon-backend.exe");

    backendProcess = spawn(backendPath, [], {
        detached: false,
        stdio: "ignore",
    });

    backendProcess.on("error", (err) => {
        console.error("Backend failed to start:", err);
    });
}

function createMainPanel() {
    mainPanel = new BrowserWindow({
        width: 680,
        height: 80,
        minWidth: 680,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        resizable: false,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    if (isDev) {
        mainPanel.loadURL(`http://localhost:${VITE_PORT}`);
    } else {
        mainPanel.loadFile(path.join(__dirname, "dist/index.html"));
    }

    mainPanel.on("blur", () => mainPanel.hide());
}

function togglePanel() {
    if (!mainPanel) return;
    if (mainPanel.isVisible()) {
        mainPanel.hide();
    } else {
        mainPanel.center();
        mainPanel.show();
        mainPanel.focus();
    }
}

app.whenReady().then(() => {
    startBackend();
    setTimeout(() => {
        createMainPanel();
    }, 1500);

    globalShortcut.register("Ctrl+Space", () => togglePanel());

    // Tray
    let trayIcon;
    try {
        trayIcon = nativeImage.createFromPath(
            path.join(__dirname, "../assets/icon.ico"),
        );
        if (trayIcon.isEmpty()) throw new Error("empty");
    } catch {
        trayIcon = nativeImage.createFromDataURL(
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABOSURBVDiNY/z//z8DJYCJgUIwasCoAaMGjBpAaQMYGBj+M1AaAAAA//8DADd+BQAAAABJRU5ErkJggg==",
        );
    }

    tray = new Tray(trayIcon);
    tray.setToolTip("Axon");
    tray.setContextMenu(
        Menu.buildFromTemplate([
            { label: "Open Axon (Ctrl+Space)", click: () => togglePanel() },
            { type: "separator" },
            { label: "Quit", click: () => app.quit() },
        ]),
    );
    tray.on("click", () => togglePanel());

    ipcMain.on("hide-window", () => mainPanel?.hide());
    ipcMain.on("resize-panel", (_, height) => {
        if (mainPanel) mainPanel.setSize(680, Math.min(height + 24, 620));
    });
});

app.on("will-quit", () => {
    globalShortcut.unregisterAll();
    if (backendProcess) backendProcess.kill();
});
app.on("window-all-closed", (e) => e.preventDefault());
