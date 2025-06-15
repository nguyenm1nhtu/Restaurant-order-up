'use client';

import { useState, useEffect } from 'react';
import Popup from '@/app/Menu/Popup';

export default function Order({ isOpen, onClose, onConfirm }) {
    const [bookingDate, setBookingDate] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setBookingDate('');
            setNumberOfPeople('');
        }
    }, [isOpen]);

    const handleConfirm = () => {
        if (bookingDate && numberOfPeople && parseInt(numberOfPeople) > 0) {
            onConfirm({ date: bookingDate, numberOfPeople: parseInt(numberOfPeople) });
            onClose();
        }
    };

    return (
        <Popup isOpen={isOpen} onClose={onClose} title="Đặt bàn">
            <div className="">
                <div className="mb-4">
                    <label className="block text-white text-[14px] font-semibold mb-2">Chọn ngày</label>
                    <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded-[5px] text-[12px] bg-white text-black mb-4"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>
                <div className="my-4">
                    <label className="block text-white text-[14px] font-semibold mb-2">Số người</label>
                    <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-[5px] text-[12px] bg-white text-black mb-4"
                        value={numberOfPeople}
                        onChange={(e) => setNumberOfPeople(e.target.value)}
                        min="1"
                        placeholder="Nhập số người"
                    />
                </div>
                <button
                    className="w-full cursor-pointer mt-4 px-5 py-3 bg-[var(--primary-color)] text-white rounded-[5px] hover:bg-opacity-80 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    onClick={handleConfirm}
                    disabled={!bookingDate || !numberOfPeople || parseInt(numberOfPeople) <= 0}
                >
                    <span className="text-[14px] font-semibold">Xác nhận đặt bàn</span>
                </button>
            </div>
        </Popup>
    );
}
