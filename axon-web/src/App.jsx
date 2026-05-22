import Orbs from "./components/Orbs";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import useReveal from "./hooks/useReveal";

export default function App() {
    useReveal();
    return (
        <>
            <Orbs />
            <Nav />
            <Hero />
            <Features />
            <HowItWorks />
            <CTA />
            <Footer />
        </>
    );
}
