export default function Footer() {
    return (
        <footer
            style={{
                borderTop: "1px solid var(--border)",
                padding: "32px 0",
                position: "relative",
                zIndex: 1,
            }}
        >
            <div
                style={{
                    maxWidth: 1100,
                    margin: "0 auto",
                    padding: "0 32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 16,
                }}
            >
                <a
                    href="#"
                    style={{
                        fontFamily: "Syne,sans-serif",
                        fontWeight: 800,
                        fontSize: 16,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--text)",
                        textDecoration: "none",
                    }}
                >
                    AX<span style={{ color: "var(--violet-2)" }}>◉</span>N
                </a>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>
                    Built by abeeno · v0.1
                </p>
                <div style={{ display: "flex", gap: 24 }}>
                    {[
                        ["GitHub", "https://github.com/benj1e/axon"],
                        ["LinkedIn", "https://linkedin.com/in/omoroje"],
                    ].map(([label, href]) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                color: "rgba(255,255,255,0.3)",
                                textDecoration: "none",
                                fontSize: 13,
                                transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) =>
                                (e.target.style.color = "rgba(255,255,255,0.6)")
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.color = "rgba(255,255,255,0.3)")
                            }
                        >
                            {label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
