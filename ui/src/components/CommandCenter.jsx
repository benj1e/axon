import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Mode config ────────────────────────────────────────────────────────────
const MODES = {
    default: {
        symbol: null,
        label: "Axon",
        color: "#8b5cf6",
        placeholder: "type > for files, / for web, ! for settings",
    },
    files: {
        symbol: ">",
        label: "Files",
        color: "#60a5fa",
        placeholder: "search files...",
    },
    web: {
        symbol: "/",
        label: "Web",
        color: "#f59e0b",
        placeholder: "search the web...",
    },
    settings: {
        symbol: "!",
        label: "Settings",
        color: "#fb923c",
        placeholder: "search settings...",
    },
    task: {
        symbol: "@",
        label: "Do Task",
        color: "#34d399",
        placeholder: "coming soon...",
    },
};

const COMMANDS = [
    {
        symbol: ">",
        label: "File Search",
        description: "Find and open files",
        color: "#60a5fa",
        enabled: true,
    },
    {
        symbol: "/",
        label: "Web Search",
        description: "Search in your browser",
        color: "#f59e0b",
        enabled: true,
    },
    {
        symbol: "!",
        label: "Settings",
        description: "Open Windows settings",
        color: "#fb923c",
        enabled: true,
    },
    {
        symbol: "@",
        label: "Do Task",
        description: "Automate browser tasks",
        color: "#34d399",
        enabled: false,
    },
];

// ── File type map ──────────────────────────────────────────────────────────
const FILE_TYPES = {
    pdf: { color: "#ef4444", icon: "PDF" },
    doc: { color: "#3b82f6", icon: "DOC" },
    docx: { color: "#3b82f6", icon: "DOC" },
    xls: { color: "#10b981", icon: "XLS" },
    xlsx: { color: "#10b981", icon: "XLS" },
    jpg: { color: "#ec4899", icon: "IMG" },
    png: { color: "#ec4899", icon: "IMG" },
    gif: { color: "#ec4899", icon: "IMG" },
    svg: { color: "#ec4899", icon: "IMG" },
    mp4: { color: "#f59e0b", icon: "VID" },
    mov: { color: "#f59e0b", icon: "VID" },
    js: { color: "#8b5cf6", icon: "JS" },
    ts: { color: "#8b5cf6", icon: "TS" },
    py: { color: "#8b5cf6", icon: "PY" },
    jsx: { color: "#8b5cf6", icon: "JSX" },
    tsx: { color: "#8b5cf6", icon: "TSX" },
    json: { color: "#8b5cf6", icon: "JSON" },
    html: { color: "#8b5cf6", icon: "HTML" },
    css: { color: "#8b5cf6", icon: "CSS" },
    default: { color: "#9ca3af", icon: "FILE" },
};

const getFileType = (path) => {
    const ext = path?.split(".").pop()?.toLowerCase();
    return FILE_TYPES[ext] || FILE_TYPES.default;
};

// ── Sub-components ─────────────────────────────────────────────────────────
const ModeBadge = ({ mode }) => (
    <motion.div
        key={mode}
        initial={{ opacity: 0, scale: 0.8, y: -4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 4 }}
        transition={{ duration: 0.12 }}
        style={{
            padding: "3px 8px",
            borderRadius: "6px",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: MODES[mode].color,
            background: `${MODES[mode].color}15`,
            border: `1px solid ${MODES[mode].color}30`,
            flexShrink: 0,
            userSelect: "none",
        }}
    >
        {MODES[mode].label}
    </motion.div>
);

const CommandRow = ({ cmd, isSelected, onHover, onClick }) => (
    <motion.div
        onMouseEnter={onHover}
        onClick={cmd.enabled ? onClick : undefined}
        style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 12px",
            borderRadius: "10px",
            cursor: cmd.enabled ? "default" : "not-allowed",
            opacity: cmd.enabled ? 1 : 0.35,
            background:
                isSelected && cmd.enabled
                    ? "rgba(139,92,246,0.1)"
                    : "transparent",
            borderLeft: `2px solid ${isSelected && cmd.enabled ? "#8b5cf6" : "transparent"}`,
            transition: "background 0.15s",
        }}
    >
        <div
            style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `${cmd.color}15`,
                flexShrink: 0,
                fontSize: "13px",
                fontWeight: 600,
                color: cmd.color,
            }}
        >
            {cmd.symbol}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
            <div
                style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.88)",
                    fontWeight: 400,
                }}
            >
                {cmd.label}
            </div>
            <div
                style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.28)",
                    marginTop: "1px",
                }}
            >
                {cmd.description}
            </div>
        </div>
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexShrink: 0,
            }}
        >
            {!cmd.enabled && (
                <span
                    style={{
                        fontSize: "9px",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        background: "rgba(255,255,255,0.05)",
                        color: "rgba(255,255,255,0.2)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                    }}
                >
                    soon
                </span>
            )}
            <span
                style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.15)",
                    fontFamily: "monospace",
                }}
            >
                {cmd.symbol}
            </span>
        </div>
    </motion.div>
);

const FileRow = ({ file, isSelected, onHover, onClick }) => {
    const type = getFileType(file.path);
    const dir = file.path.substring(0, file.path.lastIndexOf("\\") + 1) || "./";
    return (
        <motion.div
            layout
            onMouseEnter={onHover}
            onClick={onClick}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 12px",
                borderRadius: "10px",
                cursor: "default",
                background: isSelected ? "rgba(96,165,250,0.1)" : "transparent",
                borderLeft: `2px solid ${isSelected ? "#60a5fa" : "transparent"}`,
                transition: "background 0.15s",
            }}
        >
            <div
                style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `${type.color}15`,
                    flexShrink: 0,
                }}
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={type.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div
                    style={{
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.88)",
                        fontWeight: 400,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {file.name}
                </div>
                <div
                    style={{
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.25)",
                        fontFamily: "monospace",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {dir}
                </div>
            </div>
            <div
                style={{
                    padding: "2px 6px",
                    borderRadius: "5px",
                    fontSize: "9px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: type.color,
                    background: `${type.color}10`,
                    border: `1px solid ${type.color}20`,
                    flexShrink: 0,
                }}
            >
                {type.icon}
            </div>
        </motion.div>
    );
};

const SettingsRow = ({ item, isSelected, onHover, onClick }) => (
    <motion.div
        onMouseEnter={onHover}
        onClick={onClick}
        style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 12px",
            borderRadius: "10px",
            cursor: "default",
            background: isSelected ? "rgba(251,146,60,0.1)" : "transparent",
            borderLeft: `2px solid ${isSelected ? "#fb923c" : "transparent"}`,
            transition: "background 0.15s",
        }}
    >
        <div
            style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(251,146,60,0.1)",
                flexShrink: 0,
            }}
        >
            <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fb923c"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0 1.51 1h.09a1.65 1.65 0 0 0 1.51 1z" />
            </svg>
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.88)" }}>
                {item.name}
            </div>
        </div>
        <div
            style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.15)",
                fontFamily: "monospace",
            }}
        >
            ↵ open
        </div>
    </motion.div>
);

const Shimmer = () => (
    <div
        style={{
            padding: "12px 8px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
        }}
    >
        {[0.4, 0.7, 0.55].map((w, i) => (
            <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
                <div
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: "rgba(255,255,255,0.03)",
                    }}
                />
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                    }}
                >
                    <div
                        style={{
                            height: 10,
                            width: `${w * 100}%`,
                            background: "rgba(255,255,255,0.04)",
                            borderRadius: 4,
                        }}
                    />
                    <div
                        style={{
                            height: 8,
                            width: "60%",
                            background: "rgba(255,255,255,0.02)",
                            borderRadius: 4,
                        }}
                    />
                </div>
            </div>
        ))}
    </div>
);

// ── Main component ─────────────────────────────────────────────────────────
export default function CommandCenter() {
    const [input, setInput] = useState("");
    const [mode, setMode] = useState("default");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const searchTimeout = useRef(null);
    const currentQuery = useRef("");

    // Load font
    useEffect(() => {
        const link = document.createElement("link");
        link.href =
            "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
        inputRef.current?.focus();

        const ro = new ResizeObserver((entries) => {
            const h = entries[0]?.contentRect?.height;
            if (h) window.axon?.resize(Math.ceil(h));
        });
        ro.observe(document.body);
        return () => ro.disconnect();
    }, []);

    // Keyboard nav
    useEffect(() => {
        const handle = (e) => {
            const listLen = results.length || COMMANDS.length;
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((i) => (i + 1) % listLen);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((i) => (i - 1 + listLen) % listLen);
            } else if (e.key === "Enter") {
                handleEnter();
            } else if (e.key === "Escape") {
                if (mode !== "default" || input) {
                    resetToDefault();
                } else {
                    window.axon?.hide();
                }
            }
        };
        window.addEventListener("keydown", handle);
        return () => window.removeEventListener("keydown", handle);
    }, [mode, input, results, selectedIndex]);

    const openInBrowser = (url) => {
        fetch("http://localhost:5000/open/url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
        });
    };

    const resetToDefault = () => {
        setInput("");
        setMode("default");
        setResults([]);
        setLoading(false);
        setSelectedIndex(0);
        inputRef.current?.focus();
    };

    const isUrl = (str) => {
        try {
            const url = str.trim();
            if (url.includes(" ") || !url.includes(".")) return false;
            return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
                url,
            );
        } catch {
            return false;
        }
    };

    const handleEnter = () => {
        if (mode === "default" && !input) {
            const cmd = COMMANDS[selectedIndex];
            if (cmd && cmd.enabled) switchMode(cmd.symbol);
            return;
        }
        if (mode === "files" && results[selectedIndex]) {
            openFile(results[selectedIndex]);
            return;
        }
        if (mode === "web" && input.trim()) {
            const query = input.trim();
            if (isUrl(query)) {
                const url = query.startsWith("http")
                    ? query
                    : `https://${query}`;
                openInBrowser(url);
            } else {
                openInBrowser(
                    `https://www.google.com/search?q=${encodeURIComponent(query)}`,
                );
            }
            window.axon?.hide();
            return;
        }
        if (mode === "settings") {
            if (results[selectedIndex]) {
                fetch("http://localhost:5000/open/url", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url: results[selectedIndex].uri }),
                });
                window.axon?.hide();
            } else if (input.trim()) {
                runSettings(input.trim());
                window.axon?.hide();
            }
            return;
        }
    };

    const switchMode = (symbol) => {
        const entry = Object.entries(MODES).find(
            ([, v]) => v.symbol === symbol,
        );
        if (!entry) return;
        const cmd = COMMANDS.find((c) => c.symbol === symbol);
        if (cmd && !cmd.enabled) return; // block disabled modes
        const [m] = entry;
        setMode(m);
        setInput("");
        setResults([]);
        setSelectedIndex(0);
        setTimeout(() => inputRef.current?.focus(), 50);
    };

    const handleInputChange = (e) => {
        const val = e.target.value;

        // Mode switch on first char
        if (mode === "default" && val.length === 1) {
            const match = Object.entries(MODES).find(
                ([, v]) => v.symbol === val,
            );
            if (match) {
                switchMode(val);
                return;
            }
        }

        setInput(val);
        currentQuery.current = val;

        clearTimeout(searchTimeout.current);

        if (!val.trim()) {
            setResults([]);
            setLoading(false);
            return;
        }

        if (mode === "files") {
            setLoading(true);
            searchTimeout.current = setTimeout(() => runFileSearch(val), 120);
        } else if (mode === "settings") {
            setLoading(true);
            searchTimeout.current = setTimeout(
                () => runSettingsSearch(val),
                150,
            );
        }
    };

    const runFileSearch = async (q) => {
        try {
            const res = await fetch(
                `http://localhost:5000/files/search?q=${encodeURIComponent(q)}`,
            );
            const data = await res.json();
            if (currentQuery.current === q) {
                setResults(data.results || []);
                setSelectedIndex(0);
            }
        } catch {
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const runSettingsSearch = async (q) => {
        try {
            const res = await fetch(
                `http://localhost:5000/settings/search?q=${encodeURIComponent(q)}`,
            );
            const data = await res.json();
            if (currentQuery.current === q) {
                setResults(data.results || []);
                setSelectedIndex(0);
            }
        } catch {
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const openFile = async (file) => {
        try {
            await fetch("http://localhost:5000/files/open", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ path: file.path }),
            });
            window.axon?.hide();
        } catch (err) {
            console.error(err);
        }
    };

    const runSettings = async (q) => {
        setLoading(true);
        try {
            await fetch("http://localhost:5000/command", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ command: `settings ${q}` }),
            });
            window.axon?.hide();
        } catch {
        } finally {
            setLoading(false);
        }
    };

    // ── Render helpers ────────────────────────────────────────────────────────
    const modeConfig = MODES[mode];
    const showCommandList = mode === "default" && !input;
    const showResults = results.length > 0;
    const showEmpty =
        !loading &&
        !showCommandList &&
        !showResults &&
        input.trim() &&
        mode !== "web";

    return (
        <>
            <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: transparent; overflow: hidden; font-family: 'Inter', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
        input::placeholder { color: rgba(255,255,255,0.18); }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }
      `}</style>

            <motion.div
                initial={{ opacity: 0, scale: 0.97, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    width: "100%",
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0px",
                }}
            >
                <div
                    style={{
                        borderRadius: "16px",
                        background: "rgba(13, 13, 17, 0.94)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        overflow: "hidden",
                    }}
                >
                    {/* ── Input row ── */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "0 18px",
                            height: "58px",
                        }}
                    >
                        {/* Mode orb */}
                        <motion.div
                            animate={{
                                backgroundColor: `${modeConfig.color}20`,
                            }}
                            style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                fontSize: "13px",
                                fontWeight: 600,
                                color: modeConfig.color,
                                border: `1px solid ${modeConfig.color}30`,
                            }}
                        >
                            {loading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 0.85,
                                        ease: "linear",
                                    }}
                                    style={{
                                        width: "12px",
                                        height: "12px",
                                        borderRadius: "50%",
                                        border: `1.5px solid ${modeConfig.color}30`,
                                        borderTopColor: modeConfig.color,
                                    }}
                                />
                            ) : (
                                modeConfig.symbol || "⌘"
                            )}
                        </motion.div>

                        {/* Input */}
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder={modeConfig.placeholder}
                            style={{
                                flex: 1,
                                background: "transparent",
                                border: "none",
                                outline: "none",
                                color: "rgba(255,255,255,0.88)",
                                fontSize: "15px",
                                fontWeight: 400,
                                letterSpacing: "-0.01em",
                                fontFamily: "'Inter', system-ui, sans-serif",
                            }}
                        />

                        {/* Mode badge + hint */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                flexShrink: 0,
                            }}
                        >
                            <AnimatePresence mode="wait">
                                <ModeBadge key={mode} mode={mode} />
                            </AnimatePresence>
                            {mode !== "default" && (
                                <span
                                    style={{
                                        fontSize: "10px",
                                        color: "rgba(255,255,255,0.12)",
                                        letterSpacing: "0.06em",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    esc
                                </span>
                            )}
                        </div>
                    </div>

                    {/* ── Divider ── */}
                    <AnimatePresence>
                        {(showCommandList ||
                            showResults ||
                            loading ||
                            showEmpty ||
                            (mode === "web" && input)) && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    height: "1px",
                                    background: "rgba(255,255,255,0.05)",
                                    margin: "0 12px",
                                }}
                            />
                        )}
                    </AnimatePresence>

                    {/* ── Body ── */}
                    <AnimatePresence mode="popLayout">
                        {/* Command palette */}
                        {showCommandList && (
                            <motion.div
                                key="commands"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{ padding: "8px" }}
                            >
                                <div
                                    style={{
                                        padding: "6px 12px 4px",
                                        fontSize: "10px",
                                        color: "rgba(255,255,255,0.2)",
                                        letterSpacing: "0.08em",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Commands
                                </div>
                                {COMMANDS.map((cmd, i) => (
                                    <CommandRow
                                        key={cmd.symbol}
                                        cmd={cmd}
                                        isSelected={i === selectedIndex}
                                        onHover={() => setSelectedIndex(i)}
                                        onClick={() => switchMode(cmd.symbol)}
                                    />
                                ))}
                            </motion.div>
                        )}

                        {/* Loading shimmer */}
                        {loading && !showResults && (
                            <motion.div
                                key="shimmer"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Shimmer />
                            </motion.div>
                        )}

                        {/* File results */}
                        {mode === "files" && showResults && (
                            <motion.div
                                key="files"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    maxHeight: "360px",
                                    overflowY: "auto",
                                    padding: "8px",
                                }}
                            >
                                {results.map((file, i) => (
                                    <FileRow
                                        key={file.path}
                                        file={file}
                                        isSelected={i === selectedIndex}
                                        onHover={() => setSelectedIndex(i)}
                                        onClick={() => openFile(file)}
                                    />
                                ))}
                            </motion.div>
                        )}

                        {/* Web hint */}
                        {mode === "web" && input && (
                            <motion.div
                                key="web-hint"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    padding: "16px 20px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                }}
                            >
                                <div
                                    style={{
                                        width: "32px",
                                        height: "32px",
                                        borderRadius: "8px",
                                        background: "rgba(251,191,36,0.1)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#f59e0b"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="2" y1="12" x2="22" y2="12" />
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                    </svg>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            fontSize: "13px",
                                            color: "rgba(255,255,255,0.7)",
                                        }}
                                    >
                                        {input}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "11px",
                                            color: "rgba(255,255,255,0.25)",
                                            marginTop: "2px",
                                        }}
                                    >
                                        press ↵ to{" "}
                                        {isUrl(input)
                                            ? "open link"
                                            : "search Google"}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Settings results */}
                        {mode === "settings" && showResults && (
                            <motion.div
                                key="settings"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ padding: "8px" }}
                            >
                                {results.map((item, i) => (
                                    <SettingsRow
                                        key={item.uri}
                                        item={item}
                                        isSelected={i === selectedIndex}
                                        onHover={() => setSelectedIndex(i)}
                                        onClick={() => {
                                            fetch(
                                                "http://localhost:5000/open/url",
                                                {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type":
                                                            "application/json",
                                                    },
                                                    body: JSON.stringify({
                                                        url: item.uri,
                                                    }),
                                                },
                                            );
                                            window.axon?.hide();
                                        }}
                                    />
                                ))}
                            </motion.div>
                        )}

                        {/* Empty state */}
                        {showEmpty && (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    padding: "32px 20px",
                                    textAlign: "center",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "13px",
                                        color: "rgba(255,255,255,0.2)",
                                    }}
                                >
                                    no results for "{input}"
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </>
    );
}
