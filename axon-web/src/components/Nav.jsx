export default function Nav() {
    return (
        <nav
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: "20px 0",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                background: "rgba(8,8,16,0.7)",
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
                }}
            >
                <a
                    href="#"
                    style={{
                        fontFamily: "Syne,sans-serif",
                        fontWeight: 800,
                        fontSize: 20,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--text)",
                        textDecoration: "none",
                    }}
                >
                    AX<span style={{ color: "var(--violet-2)" }}>◉</span>N
                </a>
                <a
                    href="https://github.com/benj1e/axon"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--muted)",
                        textDecoration: "none",
                        padding: "8px 18px",
                        borderRadius: 8,
                        border: "1px solid var(--border)",
                        transition: "color 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.color = "var(--text)";
                        e.target.style.borderColor = "rgba(255,255,255,0.15)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.color = "var(--muted)";
                        e.target.style.borderColor = "var(--border)";
                    }}
                >
                    GitHub ↗
                </a>
            </div>
        </nav>
    );
}
