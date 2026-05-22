export default function CTA() {
    return (
        <section
            id="download"
            style={{
                padding: "80px 0 120px",
                textAlign: "center",
                position: "relative",
                zIndex: 1,
            }}
        >
            <div
                style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}
            >
                <div
                    className="reveal"
                    style={{
                        borderRadius: 24,
                        border: "1px solid rgba(124,58,237,0.2)",
                        background: "rgba(124,58,237,0.05)",
                        padding: "72px 48px",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: -1,
                            left: "10%",
                            right: "10%",
                            height: 1,
                            background:
                                "linear-gradient(90deg,transparent,rgba(124,58,237,0.5),transparent)",
                        }}
                    />
                    <h2
                        style={{
                            fontFamily: "Syne,sans-serif",
                            fontSize: "clamp(28px,4vw,44px)",
                            fontWeight: 700,
                            letterSpacing: "-0.02em",
                            marginBottom: 16,
                        }}
                    >
                        Ready to try it?
                    </h2>
                    <p
                        style={{
                            color: "var(--muted)",
                            fontSize: 16,
                            fontWeight: 300,
                            marginBottom: 40,
                            maxWidth: 440,
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    >
                        Free, open source, and runs entirely on your machine. No
                        account needed.
                    </p>
                    <a
                        href="https://github.com/benj1e/axon/releases"
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
                            e.currentTarget.style.transform =
                                "translateY(-1px)";
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
                        Download Axon v0.1
                    </a>
                    <p
                        style={{
                            marginTop: 16,
                            fontSize: 12,
                            color: "rgba(255,255,255,0.2)",
                        }}
                    >
                        Windows 10 / 11 · 64-bit · Free
                    </p>
                </div>
            </div>
        </section>
    );
}
