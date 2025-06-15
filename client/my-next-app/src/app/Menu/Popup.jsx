'use client';

import { useEffect, useRef } from 'react';

export default function Popup({ isOpen, onClose, children }) {
    const popupRef = useRef(null);

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={onClose}
        >
            <div
                ref={popupRef}
                className="flex flex-col justify-center relative bg-black rounded-[15px] shadow-lg w-[350px] py-12"
                style={{ border: '3px solid white' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute flex justify-end top-[5px] right-[10px] cursor-pointer">
                    <button
                        className="text-[var(--primary-color)] font-bold hover:opacity-80 text-[32px]"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>
                <div className="px-12 mt-5">{children}</div>
            </div>
        </div>
    );
}
