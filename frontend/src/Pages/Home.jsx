import React, { useState } from 'react';
import Navbar from '../Components/Navbar.jsx';
import Footer from '../footer/Foooter.js';
import { FaBed, FaUtensils, FaWrench, FaUserShield, FaPlus, FaMinus } from 'react-icons/fa';
import HeroSection from '../Components/Carousel.jsx';
import Modal from 'react-modal';
import { FaSearchPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

Modal.setAppElement('#root');

const announcements = [
    { id: 1, description: 'The hostel will reopen for the new semester on July 10th, 2024.' },
    { id: 2, description: 'Scheduled maintenance will take place on July 5th, 2024. Water supply will be temporarily unavailable from 10 AM to 2 PM.' },
    { id: 3, description: 'We are introducing a new laundry service starting from July 1st, 2024. The service will be available daily from 8 AM to 8 PM.' },
    { id: 4, description: 'Please adhere to the updated COVID-19 guidelines issued by the health authorities.' },
    { id: 5, description: 'Join us for exciting summer camp activities starting from July 15th, 2024. Sign up at the admin office.' },
];

const Home = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [openIndex, setOpenIndex] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const infoBoxes = [
        {
            icon: <FaBed />,
            title: 'Comfortable Rooms',
            description: 'Our hostel offers comfortable and spacious rooms for all residents.',
            moreInfo: 'Rooms are equipped with all modern amenities to ensure a comfortable stay. Each room has a bed, study table, chair, and wardrobe.'
        },
        {
            icon: <FaUtensils />,
            title: 'Mess Facilities',
            description: 'Enjoy delicious and nutritious meals at our hostel mess.',
            moreInfo: 'Our mess provides a variety of meals, catering to different dietary needs. We ensure that all meals are healthy and hygienic.'
        },
        {
            icon: <FaWrench />,
            title: 'Maintenance',
            description: 'We provide timely maintenance services for all hostel facilities.',
            moreInfo: 'Our dedicated maintenance team is always ready to address any issues promptly, ensuring that all facilities are in top condition.'
        },
        {
            icon: <FaUserShield />,
            title: 'Security',
            description: 'Our hostel is equipped with 24/7 security to ensure your safety.',
            moreInfo: 'With round-the-clock security personnel and surveillance cameras, we ensure a safe and secure environment for all residents.'
        }
    ];

    const faqs = [
        {
            question: "What are the hostel check-in and check-out times?",
            answer: "Check-in is from 10 AM onwards and check-out is by 10 AM on the day of departure."
        },
        {
            question: "Are guests allowed in the hostel?",
            answer: "Guests are allowed to visit during the day but are not permitted to stay overnight."
        },
        {
            question: "What facilities are available in the hostel?",
            answer: "The hostel offers a variety of facilities including a mess, laundry service, Wi-Fi, and 24/7 security."
        },
        {
            question: "Can I change my room after moving in?",
            answer: "Room changes can be requested at the hostel office, but are subject to availability."
        },
        {
            question: "Is there a curfew in the hostel?",
            answer: "Yes, there is a curfew at 10 PM to ensure the safety and security of all residents."
        },
    ];

    const photoGalleryImages = [
        'https://puchd.ac.in/photos/slide3.png',
        'https://puchd.ac.in/photos/jln-joshi.jpg',
        'https://puchd.ac.in/photos/slide4.png',
        'https://puchd.ac.in/photos/slide4.png',
        'https://imgs.search.brave.com/zat1bqkP_DXul1OUeKBtuDrllUXSd-8v7d99MyuZqYQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5vbnRoZW1hcmtl/dC5jb20vcHJvcGVy/dGllcy8xNDczMDUx/Ni8xNDg2NzMzMTM1/L2ltYWdlLTMtNDgw/eDMyMC5qcGc',
        'https://imgs.search.brave.com/5737wLq74i65H0qMxSEFEeu8PgYAgBkcfKmFV0sca6c/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy85/Lzk4L1BhbmphYl9V/bml2ZXJzaXR5X0Nh/bXB1cy5qcGc',
        'https://imgs.search.brave.com/5737wLq74i65H0qMxSEFEeu8PgYAgBkcfKmFV0sca6c/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy85/Lzk4L1BhbmphYl9V/bml2ZXJzaXR5X0Nh/bXB1cy5qcGc',
        'https://imgs.search.brave.com/5737wLq74i65H0qMxSEFEeu8PgYAgBkcfKmFV0sca6c/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy85/Lzk4L1BhbmphYl9V/bml2ZXJzaXR5X0Nh/bXB1cy5qcGc',
    ];

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const openModal = (index) => {
        setCurrentImage(photoGalleryImages[index]);
        setCurrentIndex(index);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const nextImage = () => {
        const newIndex = (currentIndex + 1) % photoGalleryImages.length;
        setCurrentImage(photoGalleryImages[newIndex]);
        setCurrentIndex(newIndex);
    };

    const prevImage = () => {
        const newIndex = (currentIndex - 1 + photoGalleryImages.length) % photoGalleryImages.length;
        setCurrentImage(photoGalleryImages[newIndex]);
        setCurrentIndex(newIndex);
    };

    return (
        <>
            <div className='bg-primaryBlack text-white'>
                <Navbar />
                <HeroSection />
                <section id="announcements" className="py-8 bg-primaryBlack text-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-4">Announcements</h2>
                        <ul className="space-y-4">
                            {announcements.map((announcement) => (
                                <li key={announcement.id} className="p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300 ease-in-out">
                                    {announcement.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section id="info" className="py-8">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-4 text-white">Hostel Facilities</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {infoBoxes.map((box, index) => (
                                <div
                                    key={index}
                                    className={`p-4 border rounded-lg shadow-md transition-transform transform bg-primaryGray text-black ${hoveredIndex === index ? 'scale-105' : ''
                                        }`}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div className="flex items-center mb-2">
                                        {box.icon}
                                        <h3 className="ml-2 text-xl font-semibold">{box.title}</h3>
                                    </div>
                                    <p>{box.description}</p>
                                    <p className="mt-2">{box.moreInfo}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section id="faq" className="py-8 bg-primaryBlack">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions (FAQs)</h2>
                        <ul className="space-y-4">
                            {faqs.map((faq, index) => (
                                <li key={index} className="border rounded-lg p-4 hover:bg-secondaryBlack">
                                    <button
                                        className="flex justify-between items-center w-full "
                                        onClick={() => toggleFAQ(index)}
                                    >
                                        <span className="text-lg font-medium">{faq.question}</span>
                                        <span>{openIndex === index ? <FaMinus /> : <FaPlus />}</span>
                                    </button>
                                    {openIndex === index && <p className="mt-2 text-primaryGray">{faq.answer}</p>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
                <section id="gallery" className="py-8">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-4">Photo Gallery</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {photoGalleryImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative"
                                    onClick={() => openModal(index)}
                                >
                                    <img
                                        src={image}
                                        alt={`Gallery Image ${index + 1}`}
                            
                                        className="w-full h-48 object-cover rounded-lg cursor-pointer"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity hover:opacity-100">
                                        <FaSearchPlus className="text-white text-2xl" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            className="fixed inset-5 flex items-center justify-center bg-black bg-opacity-75"
                            overlayClassName="modal-overlay"
                        >
                            <div className="relative w-3/4 h-3/4">
                                <button
                                    onClick={closeModal}
                                    className="absolute top-2 right-2 text-white text-2xl"
                                >
                                    &times;
                                </button>
                                <img
                                    src={currentImage}
                                    alt="Current Gallery"
                                    className="w-full h-auto"
                                />
                                <button
                                    onClick={prevImage}
                                    className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-2xl"
                                >
                                    <FaArrowLeft />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-2xl"
                                >
                                    <FaArrowRight />
                                </button>
                            </div>
                        </Modal>
                    </div>
                </section>
                <section id="fee-info" className="py-12 text-white bg-primaryBlack">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-8 ">Fee Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-primaryGray p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                <h3 className="text-xl text-black font-semibold mb-4">Room Rent</h3>
                                <p className="text-gray-700 mb-4">Single Occupancy: ₹10,000 per semester</p>
                                <p className="text-gray-700">Double Occupancy: ₹8,000 per semester</p>
                            </div>
                            <div className="bg-primaryGray p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                <h3 className="text-xl text-black font-semibold mb-4">Mess Charges</h3>
                                <p className="text-gray-700 mb-4">₹2,500 per month</p>
                                <p className="text-gray-700">Includes breakfast, lunch, and dinner</p>
                            </div>
                            <div className="bg-primaryGray p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                <h3 className="text-xl text-black font-semibold mb-4">Additional Fees</h3>
                                <p className="text-gray-700 mb-4">Laundry Service: ₹500 per month</p>
                                <p className="text-gray-700">Security Deposit: ₹2,000 (refundable)</p>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default Home;