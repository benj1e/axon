export default function Orbs() {
    return (
        <>
            {[
                {
                    style: {
                        width: 600,
                        height: 600,
                        top: -200,
                        left: -100,
                        background:
                            "radial-gradient(circle,rgba(124,58,237,0.18) 0%,transparent 70%)",
                        animation: "drift1 18s ease-in-out infinite alternate",
                    },
                },
                {
                    style: {
                        width: 500,
                        height: 500,
                        bottom: "10%",
                        right: -100,
                        background:
                            "radial-gradient(circle,rgba(96,165,250,0.12) 0%,transparent 70%)",
                        animation: "drift2 22s ease-in-out infinite alternate",
                    },
                },
                {
                    style: {
                        width: 400,
                        height: 400,
                        top: "50%",
                        left: "40%",
                        background:
                            "radial-gradient(circle,rgba(245,158,11,0.07) 0%,transparent 70%)",
                        animation: "drift3 26s ease-in-out infinite alternate",
                    },
                },
            ].map((orb, i) => (
                <div
                    key={i}
                    style={{
                        position: "fixed",
                        borderRadius: "50%",
                        filter: "blur(120px)",
                        pointerEvents: "none",
                        zIndex: 0,
                        ...orb.style,
                    }}
                />
            ))}
        </>
    );
}
