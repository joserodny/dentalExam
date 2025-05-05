import {Header} from '../components/HomePage/Header';
import {HeroSection} from '../components/HomePage/Hero';
import {ServicesSection} from '../components/HomePage/Services';
export const HomePage = () => {
    return (
        <main className="w-full">
        <style>{`
            .bg-blue-teal-gradient {
            background: rgb(49, 130, 206);
            background: linear-gradient(90deg, rgba(49, 130, 206, 1) 0%, rgba(56, 178, 172, 1) 100%);
            }
        `}</style>
            <Header />
            <HeroSection />
            <ServicesSection />
        </main>
    );
}