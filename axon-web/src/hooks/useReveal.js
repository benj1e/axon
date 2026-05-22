import { useEffect } from "react";

export default function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll(".reveal");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        setTimeout(
                            () => entry.target.classList.add("visible"),
                            i * 60,
                        );
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 },
        );
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
}
