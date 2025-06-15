'use client';

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export default function Carousel({ images = [], height = '700px', autoPlayInterval = 5000, slidesPerView = 3 }) {
    const slides = [...images.slice(-slidesPerView), ...images, ...images.slice(0, slidesPerView)];

    const [currentIndex, setCurrentIndex] = useState(slidesPerView);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const sliderRef = useRef(null);
    const autoPlayRef = useRef(null);

    const slideWidthPercentage = 100 / slidesPerView;
    const totalOriginalSlides = images.length;

    const goToPrev = () => {
        setCurrentIndex((prev) => prev - 1);
        setIsTransitioning(true);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => prev + 1);
        setIsTransitioning(true);
    };

    useEffect(() => {
        const startBoundary = slidesPerView;
        const endBoundary = startBoundary + totalOriginalSlides - 1;

        if (currentIndex < startBoundary) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(currentIndex + totalOriginalSlides);
            }, 500);
        } else if (currentIndex > endBoundary) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(currentIndex - totalOriginalSlides);
            }, 500);
        }
    }, [currentIndex, totalOriginalSlides, slidesPerView]);

    useEffect(() => {
        autoPlayRef.current = setInterval(goToNext, autoPlayInterval);
        return () => clearInterval(autoPlayRef.current);
    }, [autoPlayInterval]);

    useEffect(() => {
        const slider = sliderRef.current;
        const handleMouseEnter = () => clearInterval(autoPlayRef.current);
        const handleMouseLeave = () => {
            autoPlayRef.current = setInterval(goToNext, autoPlayInterval);
        };

        if (slider) {
            slider.addEventListener('mouseenter', handleMouseEnter);
            slider.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (slider) {
                slider.removeEventListener('mouseenter', handleMouseEnter);
                slider.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [autoPlayInterval]);

    if (!images.length) {
        return (
            <div className="w-full h-[700px] flex items-center justify-center text-gray-500">No images provided</div>
        );
    }

    return (
        <div className="relative w-full mx-auto" style={{ height }}>
            <div ref={sliderRef} className="w-full h-full overflow-hidden">
                <div
                    className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                    style={{ transform: `translateX(-${(currentIndex - slidesPerView) * slideWidthPercentage}%)` }}
                >
                    {slides.map((src, index) => (
                        <div key={index} className="flex-shrink-0 px-2" style={{ width: `${slideWidthPercentage}%` }}>
                            <img
                                src={src}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-contain shadow-lg"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={goToPrev}
                className={`w-[48px] h-[48px] absolute top-1/2 -left-[80px] transform -translate-y-1/2 bg-[#8d8d8d] bg-opacity-50 text-white font-bold rounded-[5px] hover:bg-opacity-80 flex items-center justify-center text-[20px] cursor-pointer`}
            >
                <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <button
                onClick={goToNext}
                className={`w-[48px] h-[48px] absolute top-1/2 -right-[80px] transform -translate-y-1/2 bg-[#8d8d8d] bg-opacity-50 text-white font-bold rounded-[5px] hover:bg-opacity-75 flex items-center justify-center text-[20px] cursor-pointer`}
            >
                <FontAwesomeIcon icon={faAngleRight} />
            </button>
        </div>
    );
}
