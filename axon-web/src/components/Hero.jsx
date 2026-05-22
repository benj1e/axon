import { useEffect, useRef, useState } from "react";

const FILE_ICON = (color) => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
    </svg>
);

const PREVIEW_FILES = [
    {
        name: "Resume_2026.pdf",
        path: "C:\\Users\\Ben\\Documents\\",
        color: "#ef4444",
        ext: "PDF",
    },
    {
        name: "Resume_Draft.docx",
        path: "C:\\Users\\Ben\\Downloads\\",
        color: "#3b82f6",
        ext: "DOC",
    },
    {
        name: "resume_template.tex",
        path: "C:\\Users\\Ben\\Desktop\\",
        color: "#8b5cf6",
        ext: "TEX",
    },
];

const MODES = [
    { sym: ">", label: "Files", color: "#60a5fa" },
    { sym: "/", label: "Web", color: "#f59e0b" },
    { sym: "!", label: "Settings", color: "#fb923c" },
    { sym: "@", label: "Do Task", color: "#34d399", soon: true },
];

export default function Hero() {
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        const t = setInterval(
            () => setSelected((s) => (s + 1) % PREVIEW_FILES.length),
            1800,
        );
        return () => clearInterval(t);
    }, []);

    return (
        <section
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "120px 32px 80px",
                position: "relative",
                zIndex: 1,
            }}
        >
            {/* Badge */}
            <div
                className="fade-up"
                style={{
                    animationDelay: "0.1s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 14px",
                    borderRadius: 99,
                    border: "1px solid rgba(124,58,237,0.3)",
                    background: "rgba(124,58,237,0.08)",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--violet-2)",
                    letterSpacing: "0.04em",
                    marginBottom: 36,
                }}
            >
                <span
                    style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--violet-2)",
                        boxShadow: "0 0 8px var(--violet-2)",
                        animation: "pulse 2s infinite",
                        display: "inline-block",
                    }}
                />
                v0.1 — Windows · Free & Open Source
            </div>

            {/* H1 */}
            <h1
                className="fade-up"
                style={{
                    animationDelay: "0.2s",
                    fontFamily: "Syne,sans-serif",
                    fontSize: "clamp(52px,8vw,96px)",
                    fontWeight: 800,
                    lineHeight: 1.0,
                    letterSpacing: "-0.03em",
                    color: "var(--text)",
                    maxWidth: 900,
                }}
            >
                Your desktop,
                <br />
                <span
                    style={{
                        background:
                            "linear-gradient(135deg,var(--violet-2) 0%,var(--blue) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    commanded.
                </span>
            </h1>

            {/* Sub */}
            <p
                className="fade-up"
                style={{
                    animationDelay: "0.35s",
                    marginTop: 28,
                    fontSize: 18,
                    fontWeight: 300,
                    color: "var(--muted)",
                    maxWidth: 520,
                    lineHeight: 1.7,
                }}
            >
                One hotkey. Find files instantly, search the web, navigate
                settings — all without touching your mouse.
            </p>

            {/* Actions */}
            <div
                className="fade-up"
                style={{
                    animationDelay: "0.5s",
                    marginTop: 48,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <a
                    href="#download"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "14px 28px",
                        borderRadius: 12,
                        background: "var(--violet)",
                        color: "#fff",
                        fontSize: 15,
                        fontWeight: 500,
                        textDecoration: "none",
                        boxShadow: "0 0 32px rgba(124,58,237,0.35)",
                        transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#6d28d9";
                        e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--violet)";
                        e.currentTarget.style.transform = "none";
                    }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download for Windows
                </a>
                <a
                    href="https://github.com/benj1e/axon"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "14px 24px",
                        borderRadius: 12,
                        background: "transparent",
                        color: "var(--muted)",
                        fontSize: 15,
                        fontWeight: 400,
                        textDecoration: "none",
                        border: "1px solid var(--border)",
                        transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--text)";
                        e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.15)";
                        e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--muted)";
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.transform = "none";
                    }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    View Source
                </a>
            </div>

            {/* Hotkey hint */}
            <p
                className="fade-up"
                style={{
                    animationDelay: "0.65s",
                    marginTop: 24,
                    fontSize: 12,
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: "0.04em",
                }}
            >
                Press <Kbd>Ctrl</Kbd> + <Kbd>Space</Kbd> anywhere to open Axon
            </p>

            {/* Preview */}
            <div
                className="fade-up"
                style={{
                    animationDelay: "0.75s",
                    marginTop: 72,
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                <div
                    style={{
                        borderRadius: 16,
                        background: "rgba(13,13,20,0.95)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        overflow: "hidden",
                        boxShadow:
                            "0 0 0 1px rgba(255,255,255,0.04) inset, 0 32px 80px rgba(0,0,0,0.6), 0 0 120px rgba(124,58,237,0.12)",
                    }}
                >
                    {/* Bar */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            padding: "0 20px",
                            height: 60,
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                        }}
                    >
                        <div
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: 8,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 13,
                                fontWeight: 700,
                                fontFamily: "monospace",
                                background: "rgba(96,165,250,0.12)",
                                color: "#60a5fa",
                                border: "1px solid rgba(96,165,250,0.25)",
                            }}
                        >
                            {">"}
                        </div>
                        <div
                            style={{
                                flex: 1,
                                fontFamily: "DM Sans,sans-serif",
                                fontSize: 15,
                                color: "rgba(255,255,255,0.88)",
                            }}
                        >
                            resume
                        </div>
                        <div
                            style={{
                                padding: "3px 8px",
                                borderRadius: 6,
                                fontSize: 10,
                                fontWeight: 600,
                                letterSpacing: "0.07em",
                                textTransform: "uppercase",
                                background: "rgba(96,165,250,0.1)",
                                color: "#60a5fa",
                                border: "1px solid rgba(96,165,250,0.2)",
                            }}
                        >
                            FILES
                        </div>
                    </div>
                    {/* Results */}
                    <div style={{ padding: 8 }}>
                        {PREVIEW_FILES.map((f, i) => (
                            <div
                                key={f.name}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    padding: "10px 12px",
                                    borderRadius: 10,
                                    transition: "all 0.3s",
                                    background:
                                        i === selected
                                            ? `rgba(96,165,250,0.1)`
                                            : "transparent",
                                    borderLeft: `2px solid ${i === selected ? "#60a5fa" : "transparent"}`,
                                    opacity:
                                        i === selected
                                            ? 1
                                            : i === (selected + 1) % 3
                                              ? 0.5
                                              : 0.3,
                                }}
                            >
                                <div
                                    style={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: 8,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: `${f.color}1a`,
                                        flexShrink: 0,
                                    }}
                                >
                                    {FILE_ICON(f.color)}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div
                                        style={{
                                            fontSize: 13,
                                            color: "rgba(255,255,255,0.88)",
                                        }}
                                    >
                                        {f.name}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 11,
                                            color: "rgba(255,255,255,0.25)",
                                            fontFamily: "monospace",
                                        }}
                                    >
                                        {f.path}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        padding: "2px 6px",
                                        borderRadius: 5,
                                        fontSize: 9,
                                        fontWeight: 700,
                                        letterSpacing: "0.05em",
                                        textTransform: "uppercase",
                                        color: f.color,
                                        background: `${f.color}1a`,
                                        border: `1px solid ${f.color}33`,
                                        marginLeft: "auto",
                                    }}
                                >
                                    {f.ext}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mode chips */}
                <div
                    className="fade-up"
                    style={{
                        animationDelay: "0.9s",
                        display: "flex",
                        gap: 6,
                        justifyContent: "center",
                        marginTop: 16,
                        flexWrap: "wrap",
                    }}
                >
                    {MODES.map((m) => (
                        <div
                            key={m.sym}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                padding: "6px 14px",
                                borderRadius: 99,
                                border: "1px solid var(--border)",
                                fontSize: 12,
                                color: "var(--muted)",
                                background: "rgba(255,255,255,0.02)",
                                opacity: m.soon ? 0.4 : 1,
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    fontSize: 13,
                                    color: m.color,
                                }}
                            >
                                {m.sym}
                            </span>
                            {m.label}
                            {m.soon && (
                                <span
                                    style={{
                                        fontSize: 10,
                                        background: "rgba(255,255,255,0.05)",
                                        padding: "1px 5px",
                                        borderRadius: 4,
                                        marginLeft: 2,
                                    }}
                                >
                                    soon
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Kbd({ children }) {
    return (
        <span
            style={{
                display: "inline-block",
                padding: "2px 7px",
                borderRadius: 5,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontSize: 11,
                fontFamily: "monospace",
                color: "rgba(255,255,255,0.35)",
            }}
        >
            {children}
        </span>
    );
}
