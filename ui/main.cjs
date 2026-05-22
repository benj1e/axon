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
const fs = require("fs");
const { spawn } = require("child_process");

app.setName("Axon");

let mainPanel = null;
let tray = null;
let backendProcess = null;

const isDev = !app.isPackaged;
const VITE_PORT = 3000;

function startBackend() {
    const backendPath = app.isPackaged
        ? path.join(process.resourcesPath, "backend", "axon-backend.exe")
        : path.join(__dirname, "..", "dist", "axon-backend.exe");

    if (fs.existsSync(backendPath)) {
        console.log("[Axon] Starting backend from:", backendPath);
        backendProcess = spawn(backendPath, [], {
            detached: false,
            stdio: ["ignore", "pipe", "pipe"],
        });

        backendProcess.stdout.on("data", (data) =>
            console.log("[Backend]", data.toString().trim()),
        );
        backendProcess.stderr.on("data", (data) =>
            console.error("[Backend Error]", data.toString().trim()),
        );

        backendProcess.on("error", (err) =>
            console.error("[Axon] Backend failed to start:", err),
        );
        backendProcess.on("exit", (code) =>
            console.log("[Axon] Backend exited with code:", code),
        );
    } else {
        console.warn("[Axon] Backend executable not found at:", backendPath);
    }
}

function createMainPanel(icon) {
    mainPanel = new BrowserWindow({
        width: 680,
        height: 80,
        minWidth: 680,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: false,
        resizable: false,
        show: false,
        icon: icon || path.join(__dirname, "icon.ico"),
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

    // Load Official SVG Icon
    const iconPath = path.join(__dirname, "icon.ico");
    const appIcon = nativeImage.createFromPath(iconPath);

    createMainPanel(appIcon);

    const ret = globalShortcut.register("Ctrl+Space", () => togglePanel());
    if (!ret) console.error("[Axon] Shortcut registration failed");

    tray = new Tray(appIcon);
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
        if (mainPanel) {
            const [width] = mainPanel.getSize();
            mainPanel.setSize(width, Math.min(height + 24, 700));
        }
    });
});

app.on("will-quit", () => {
    globalShortcut.unregisterAll();
    if (backendProcess) backendProcess.kill();
});

app.on("window-all-closed", (e) => {
    e.preventDefault();
});
