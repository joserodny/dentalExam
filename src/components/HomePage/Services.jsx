import {ServiceCard} from './ServiceCard'
import oralSurgery from '../../assets/images/oral-surgery.svg';
import painlessSurgery from '../../assets/images/painless-dentistry.svg';
import periodontics from '../../assets/images/periodontics.svg';
import teethWhitening from '../../assets/images/teeth-whitening.svg';

const services = [
    {
        image: teethWhitening,
        title: "Teeth Whitening",
        description: "Let us show you how our experience."
    },
    {
        image: oralSurgery,
        title: "Oral Surgery",
        description: "Let us show you how our experience."
    },
    {
        image: painlessSurgery,
        title: "Painless Dentistry",
        description: "Let us show you how our experience."
    },
    {
        image: periodontics,
        title: "Periodontics",
        description: "Let us show you how our experience."
    }
];

export const ServicesSection = () => (
    <section className="relative px-4 py-16 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 lg:py-32">
        <div className="md:flex md:flex-wrap mt-24 text-center md:-mx-4">
            {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
            ))}
        </div>
    </section>
);