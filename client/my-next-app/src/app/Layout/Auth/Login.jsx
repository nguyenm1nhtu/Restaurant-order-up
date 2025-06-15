'use client';

import { useState, useEffect, useRef } from 'react';

export default function Login({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = useState({ fullName: '', phoneNumber: '' });
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const sanitizedValue = name === 'phoneNumber' ? value.replace(/[^0-9]/g, '') : value;
        setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { fullName, phoneNumber } = formData;

        if (!fullName.trim() || !phoneNumber.trim()) {
            alert('Vui lòng điền đầy đủ họ và tên và số điện thoại!');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'phone-number': phoneNumber,
                },
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                onSubmit(data);
                onClose();
            } else {
                alert(data.message || 'Đăng nhập thất bại!');
            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu đăng nhập:', error);
            alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={onClose}
        >
            <div
                ref={popupRef}
                className="flex flex-col justify-center relative bg-white px-12 py-16 rounded-[15px] shadow-lg w-[400px] h-[400px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute flex justify-end top-[5px] right-[20px] cursor-pointer">
                    <button className="text-[var(--primary-color)] hover:opacity-80 text-[32px]" onClick={onClose}>
                        ×
                    </button>
                </div>

                <h2 className="text-[17px] font-bold my-6 pb-4">
                    <span className="text-[var(--primary-color)]">Ushi Mania</span> xin kính chào quý khách!
                </h2>

                <form onSubmit={handleFormSubmit}>
                    <div className="mb-6">
                        <label className="block text-[14px] mb-3 font-semibold">
                            Quý khách vui lòng điền họ và tên:
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full p-5 border rounded-[10px]"
                            placeholder="Nhập họ và tên"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-[14px] mb-3 font-semibold">
                            Quý khách vui lòng điền số điện thoại:
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full p-5 border rounded-[10px]"
                            placeholder="Nhập số điện thoại"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer mt-6 w-full bg-[var(--primary-color)] text-white px-2 rounded hover:opacity-80 font-bold py-5 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        disabled={!formData.fullName.trim() || !formData.phoneNumber.trim()}
                    >
                        XÁC NHẬN
                    </button>
                </form>
            </div>
        </div>
    );
}
