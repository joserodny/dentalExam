// ServiceCard.js
export const ServiceCard = ({ image, title, description }) => (
  <div className="md:w-1/2 md:px-4 mt-4 md:mt-8 lg:mt-0 lg:w-1/4">
    <div className="bg-white rounded-lg border border-gray-300 p-8">
      <img src={image} alt={title} className="h-20 mx-auto" />
      <h4 className="text-xl font-bold mt-4">{title}</h4>
      <p className="mt-1">{description}</p>
      <a href="#" className="block mt-4">Read More</a>
    </div>
  </div>
);
