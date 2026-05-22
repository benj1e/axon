const STEPS = [
    {
        title: (
            <>
                Hit <Kbd>Ctrl</Kbd> + <Kbd>Space</Kbd>
            </>
        ),
        desc: "Axon appears instantly over whatever you're doing. No dock, no taskbar — it lives in the tray and wakes on command.",
    },
    {
        title: "Pick your mode",
        desc: (
            <>
                Type <Code>&gt;</Code> for files, <Code>/</Code> for web,{" "}
                <Code>!</Code> for settings. One character and you're in
                context.
            </>
        ),
    },
    {
        title: "Hit Enter. Done.",
        desc: "Files open, searches load in your browser, settings pages appear. Axon disappears and you're back to work.",
    },
];

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
function Code({ children }) {
    return (
        <code
            style={{
                background: "rgba(255,255,255,0.06)",
                padding: "1px 6px",
                borderRadius: 4,
                fontSize: 13,
            }}
        >
            {children}
        </code>
    );
}

export default function HowItWorks() {
    return (
        <section
            style={{ padding: "80px 0 120px", position: "relative", zIndex: 1 }}
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
                    How it works
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
                    }}
                >
                    Three seconds
                    <br />
                    from thought to done.
                </h2>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: 48,
                        maxWidth: 640,
                    }}
                >
                    {STEPS.map((step, i) => (
                        <div
                            key={i}
                            className="reveal"
                            style={{
                                display: "flex",
                                gap: 24,
                                paddingBottom: 40,
                                position: "relative",
                            }}
                        >
                            {i < STEPS.length - 1 && (
                                <div
                                    style={{
                                        position: "absolute",
                                        left: 19,
                                        top: 40,
                                        bottom: 0,
                                        width: 1,
                                        background:
                                            "linear-gradient(to bottom,rgba(124,58,237,0.3),transparent)",
                                    }}
                                />
                            )}
                            <div
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    border: "1px solid rgba(124,58,237,0.4)",
                                    background: "rgba(124,58,237,0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontFamily: "Syne,sans-serif",
                                    fontWeight: 700,
                                    fontSize: 14,
                                    color: "var(--violet-2)",
                                    flexShrink: 0,
                                }}
                            >
                                {i + 1}
                            </div>
                            <div style={{ paddingTop: 8 }}>
                                <div
                                    style={{
                                        fontFamily: "Syne,sans-serif",
                                        fontSize: 17,
                                        fontWeight: 600,
                                        color: "var(--text)",
                                        marginBottom: 6,
                                    }}
                                >
                                    {step.title}
                                </div>
                                <div
                                    style={{
                                        fontSize: 14,
                                        color: "var(--muted)",
                                        fontWeight: 300,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {step.desc}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
