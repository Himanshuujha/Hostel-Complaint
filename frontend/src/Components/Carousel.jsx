import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';

const images = [
    'https://puchd.ac.in/photos/slide4.png',
    'https://puchd.ac.in/photos/slide3.png',
    'https://puchd.ac.in/photos/pu9.jpg'
];

const HeroSection = () => {
    const sentences = [
        'Welcome to Panjab University',
        'Explore our campus life',
        'Join us for a brighter future'
    ];
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isTextVisible, setIsTextVisible] = useState(false);

    useEffect(() => {
        const typeAndEraseText = async () => {
            const fullText = sentences[currentSentenceIndex];

            // Show text with animation
            setCurrentText(fullText);
            setIsTextVisible(true);
            await new Promise(resolve => setTimeout(resolve, 3000)); // Visible duration

            // Hide text with animation
            setIsTextVisible(false);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Delay before next sentence

            // Move to the next sentence
            setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
        };

        typeAndEraseText();
    }, [currentSentenceIndex]);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [hoveredImageLeft, setHoveredImageLeft] = useState(null);
    const [hoveredImageRight, setHoveredImageRight] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 4000); // Change image every 4 seconds

        return () => clearInterval(interval);
    }, []);

    const handleHoverLeft = () => {
        setHoveredImageLeft((currentSlide - 1 + images.length) % images.length);
    };

    const handleHoverRight = () => {
        setHoveredImageRight((currentSlide + 1) % images.length);
    };

    const handleHoverOut = () => {
        setHoveredImageLeft(null);
        setHoveredImageRight(null);
    };

    const handlePrevClick = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
    };

    const handleNextClick = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    };

    return (
        <div className="relative w-full h-screen mt-0 overflow-hidden">
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div className="w-full flex-shrink-0" key={index}>
                        <img src={image} alt={`Slide ${index + 1}`} className="w-full h-screen object-cover" />
                    </div>
                ))}
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
                <span
                    className={`text-white text-4xl md:text-6xl font-bold font-roboto-slab tracking-wide transition-transform duration-1000 ${
                        isTextVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
                    }`}
                    style={{
                        transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
                    }}
                >
                    {currentText}
                </span>
            </div>
            <button
                className="absolute top-1/2 w-20 h-20 rounded-full left-5 transform -translate-y-1/2 px-5 py-3 bg-black bg-opacity-50 text-primaryGreen hover:bg-opacity-75 transition-all duration-300"
                onMouseOver={handleHoverLeft}
                onMouseOut={handleHoverOut}
                onClick={handlePrevClick}
                style={{
                    backgroundImage: hoveredImageLeft !== null ? `url(${images[hoveredImageLeft]})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <svg className="w-6 h-6 text-primaryGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            <button
                className="absolute top-1/2 w-20 h-20 rounded-full right-5 transform -translate-y-1/2 px-5 py-3 bg-black bg-opacity-50 text-primaryGreen hover:bg-opacity-75 transition-all duration-300"
                onMouseOver={handleHoverRight}
                onMouseOut={handleHoverOut}
                onClick={handleNextClick}
                style={{
                    backgroundImage: hoveredImageRight !== null ? `url(${images[hoveredImageRight]})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <svg className="w-6 h-6 text-primaryGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>
    );
};

export default HeroSection;
