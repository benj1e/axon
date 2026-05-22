import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    webp: { color: "#ec4899", icon: "IMG" },
    mp4: { color: "#f59e0b", icon: "VID" },
    mov: { color: "#f59e0b", icon: "VID" },
    avi: { color: "#f59e0b", icon: "VID" },
    js: { color: "#7c3aed", icon: "JS" },
    ts: { color: "#7c3aed", icon: "TS" },
    py: { color: "#7c3aed", icon: "PY" },
    jsx: { color: "#7c3aed", icon: "JSX" },
    tsx: { color: "#7c3aed", icon: "TSX" },
    html: { color: "#7c3aed", icon: "HTML" },
    css: { color: "#7c3aed", icon: "CSS" },
    json: { color: "#7c3aed", icon: "JSON" },
    default: { color: "#9ca3af", icon: "FILE" },
};

const getFileType = (path, isDir) => {
    if (isDir) return { color: "#fbbf24", icon: "DIR" };
    const ext = path.split(".").pop()?.toLowerCase();
    return FILE_TYPES[ext] || FILE_TYPES.default;
};

const FileRow = ({ file, isSelected, onSelect, onClick }) => {
    const type = getFileType(file.path, file.is_dir);
    const dirPath =
        file.path.substring(0, file.path.lastIndexOf("\\") + 1) || "./";

    return (
        <motion.div
            layout
            onMouseEnter={onSelect}
            onClick={onClick}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 16px",
                borderRadius: "10px",
                cursor: "default",
                background: isSelected
                    ? "rgba(124, 58, 237, 0.12)"
                    : "transparent",
                transition: "background 0.2s ease",
                position: "relative",
                borderLeft: `2px solid ${isSelected ? "#7c3aed" : "transparent"}`,
            }}
        >
            {/* Icon */}
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
                {file.is_dir ? (
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={type.color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                    </svg>
                ) : (
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
                )}
            </div>

            {/* Info */}
            <div
                style={{
                    flex: 1,
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                }}
            >
                <span
                    style={{
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.92)",
                        fontWeight: 400,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {file.name}
                </span>
                <span
                    style={{
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.25)",
                        fontFamily:
                            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textDirection: "rtl",
                        textAlign: "left",
                    }}
                >
                    <span
                        style={{
                            direction: "ltr",
                            unicodeBidi: "bidi-override",
                        }}
                    >
                        {dirPath}
                    </span>
                </span>
            </div>

            {/* Extension Badge */}
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

export default function FileSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const searchTimeout = useRef(null);

    useEffect(() => {
        // Load Inter font
        const link = document.createElement("link");
        link.href =
            "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
        inputRef.current?.focus();

        const handleKey = (e) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((i) =>
                    results.length > 0 ? (i + 1) % results.length : 0,
                );
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((i) =>
                    results.length > 0
                        ? (i - 1 + results.length) % results.length
                        : 0,
                );
            } else if (e.key === "Enter") {
                if (results[selectedIndex]) openFile(results[selectedIndex]);
            } else if (e.key === "Escape") {
                if (query) {
                    setQuery("");
                    setResults([]);
                } else {
                    window.axon?.hideWindow();
                }
            }
        };

        window.addEventListener("keydown", handleKey);

        // Auto-resize window
        const resizeObserver = new ResizeObserver((entries) => {
            const height = entries[0]?.contentRect?.height;
            if (height) window.axon?.resizeWindow(Math.ceil(height));
        });
        resizeObserver.observe(document.body);

        return () => {
            window.removeEventListener("keydown", handleKey);
            resizeObserver.disconnect();
        };
    }, [results, selectedIndex, query]);

    const handleSearch = async (q) => {
        if (!q.trim()) {
            setResults([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(
                `http://localhost:5000/files/search?q=${encodeURIComponent(q)}`,
            );
            const data = await res.json();
            setResults(data.results || []);
            setSelectedIndex(0);
        } catch (err) {
            console.error("Search failed", err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        if (val.trim()) {
            searchTimeout.current = setTimeout(() => handleSearch(val), 120);
        } else {
            setResults([]);
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
            window.axon?.hideWindow();
        } catch (err) {
            console.error("Failed to open file", err);
        }
    };

    return (
        <>
            <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: transparent; overflow: hidden; font-family: 'Inter', system-ui, sans-serif; }
        input::placeholder { color: rgba(255,255,255,0.18); }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }
      `}</style>

            <motion.div
                initial={{ opacity: 0, scale: 0.97, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    width: "640px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    padding: "12px",
                    WebkitFontSmoothing: "antialiased",
                }}
            >
                <div
                    style={{
                        borderRadius: "14px",
                        background: "rgba(16, 16, 20, 0.92)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* Search Header */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "0 16px",
                            height: "56px",
                        }}
                    >
                        <svg
                            style={{
                                color: "rgba(255,255,255,0.15)",
                                flexShrink: 0,
                            }}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            placeholder="search files..."
                            style={{
                                flex: 1,
                                background: "transparent",
                                border: "none",
                                outline: "none",
                                color: "rgba(255,255,255,0.88)",
                                fontSize: "15px",
                                fontWeight: 400,
                                letterSpacing: "-0.01em",
                            }}
                        />
                        <div
                            style={{
                                fontSize: "10px",
                                color: "rgba(255,255,255,0.15)",
                                fontWeight: 500,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                flexShrink: 0,
                            }}
                        >
                            {query && results.length > 0
                                ? `${results.length} found`
                                : "esc to close"}
                        </div>
                    </div>

                    {/* Results Area */}
                    <AnimatePresence mode="popLayout">
                        {(query || results.length > 0) && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                style={{
                                    overflow: "hidden",
                                    borderTop:
                                        "1px solid rgba(255,255,255,0.06)",
                                }}
                            >
                                <div
                                    style={{
                                        maxHeight: "360px",
                                        overflowY: "auto",
                                        padding: "8px",
                                    }}
                                >
                                    {results.length > 0 ? (
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "2px",
                                            }}
                                        >
                                            {results.map((file, i) => (
                                                <FileRow
                                                    key={file.path}
                                                    file={file}
                                                    isSelected={
                                                        i === selectedIndex
                                                    }
                                                    onSelect={() =>
                                                        setSelectedIndex(i)
                                                    }
                                                    onClick={() =>
                                                        openFile(file)
                                                    }
                                                />
                                            ))}
                                        </div>
                                    ) : loading ? (
                                        <div
                                            style={{
                                                padding: "16px",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "12px",
                                            }}
                                        >
                                            {[1, 2, 3].map((i) => (
                                                <div
                                                    key={i}
                                                    style={{
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
                                                            background:
                                                                "rgba(255,255,255,0.03)",
                                                        }}
                                                        className="animate-pulse"
                                                    />
                                                    <div
                                                        style={{
                                                            flex: 1,
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                            gap: "6px",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: "10px",
                                                                width: "40%",
                                                                background:
                                                                    "rgba(255,255,255,0.04)",
                                                                borderRadius:
                                                                    "4px",
                                                            }}
                                                            className="animate-pulse"
                                                        />
                                                        <div
                                                            style={{
                                                                height: "8px",
                                                                width: "70%",
                                                                background:
                                                                    "rgba(255,255,255,0.02)",
                                                                borderRadius:
                                                                    "4px",
                                                            }}
                                                            className="animate-pulse"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                padding: "40px 20px",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                gap: "12px",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: "13px",
                                                    color: "rgba(255,255,255,0.3)",
                                                    fontWeight: 400,
                                                }}
                                            >
                                                no files found for "{query}"
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Initial State */}
                    {!query && results.length === 0 && (
                        <div
                            style={{
                                height: "180px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "16px",
                                borderTop: "1px solid rgba(255,255,255,0.06)",
                            }}
                        >
                            <svg
                                style={{ color: "rgba(255,255,255,0.03)" }}
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                            <span
                                style={{
                                    fontSize: "13px",
                                    color: "rgba(255,255,255,0.12)",
                                    fontWeight: 500,
                                    letterSpacing: "0.02em",
                                }}
                            >
                                start typing to search your files
                            </span>
                        </div>
                    )}
                </div>
            </motion.div>
        </>
    );
}
