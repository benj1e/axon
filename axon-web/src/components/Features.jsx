const FEATURES = [
    {
        color: "#60a5fa",
        title: "Instant File Search",
        desc: "Powered by Everything — the fastest file indexer on Windows. Results appear as you type, ranked by how often you use them.",
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
            </svg>
        ),
    },
    {
        color: "#f59e0b",
        title: "Web in One Keystroke",
        desc: "Type your search, hit Enter. Opens directly in your active browser — no new windows, no switching apps.",
        icon: (
            <svg
                width="20"
                height="20"
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
        ),
    },
    {
        color: "#fb923c",
        title: "Settings Without Clicking",
        desc: '60+ Windows settings pages mapped and fuzzy-searchable. Type "dark mode" or "wifi" and you\'re there.',
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fb923c"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
        ),
    },
    {
        color: "#7c3aed",
        title: "Runs Locally",
        desc: "No cloud. No account. No subscription. Axon lives on your machine — your data never leaves your computer.",
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
    },
    {
        color: "#34d399",
        title: "Open Source",
        desc: "Fully open. Fork it, extend it, build your own skills. A marketplace for community-built plugins is coming.",
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#34d399"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
    },
    {
        color: "#34d399",
        title: "Do Task — Coming Soon",
        desc: "Tell Axon to do something in your browser. Send an email, fill a form, look something up — it handles it.",
        soon: true,
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#34d399"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
];

export default function Features() {
    return (
        <section
            style={{ padding: "120px 0 80px", position: "relative", zIndex: 1 }}
        >
            <div
                style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}
            >
                <p
                    className="reveal"
                    style={{
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--violet-2)",
                        marginBottom: 16,
                    }}
                >
                    Why Axon
                </p>
                <h2
                    className="reveal"
                    style={{
                        fontFamily: "Syne,sans-serif",
                        fontSize: "clamp(32px,4vw,48px)",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.15,
                        color: "var(--text)",
                        maxWidth: 560,
                        marginBottom: 64,
                    }}
                >
                    Built for speed.
                    <br />
                    Designed to disappear.
                </h2>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(300px,1fr))",
                        gap: 20,
                    }}
                >
                    {FEATURES.map((f) => (
                        <div
                            key={f.title}
                            className="reveal"
                            style={{
                                padding: 28,
                                borderRadius: 16,
                                background: f.soon
                                    ? "rgba(52,211,153,0.03)"
                                    : "var(--surface)",
                                border: f.soon
                                    ? "1px solid rgba(52,211,153,0.15)"
                                    : "1px solid var(--border)",
                                position: "relative",
                                overflow: "hidden",
                                transition: "border-color 0.2s, transform 0.2s",
                                cursor: "default",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor =
                                    "rgba(255,255,255,0.12)";
                                e.currentTarget.style.transform =
                                    "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = f.soon
                                    ? "rgba(52,211,153,0.15)"
                                    : "var(--border)";
                                e.currentTarget.style.transform = "none";
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: 1,
                                    background:
                                        "linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)",
                                }}
                            />
                            <div
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 10,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: `${f.color}1a`,
                                    marginBottom: 20,
                                }}
                            >
                                {f.icon}
                            </div>
                            <div
                                style={{
                                    fontFamily: "Syne,sans-serif",
                                    fontSize: 17,
                                    fontWeight: 600,
                                    color: "var(--text)",
                                    marginBottom: 10,
                                }}
                            >
                                {f.title}
                            </div>
                            <div
                                style={{
                                    fontSize: 14,
                                    color: "var(--muted)",
                                    lineHeight: 1.65,
                                    fontWeight: 300,
                                }}
                            >
                                {f.desc}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
