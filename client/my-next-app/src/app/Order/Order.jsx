'use client';

import { useState, useEffect } from 'react';
import Popup from '@/app/Menu/Popup';

export default function Order({ isOpen, onClose, onConfirm }) {
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [selectedTables] = useState(['B001', 'B002', 'B003', 'B004', 'B005']);
    const [activeTable, setActiveTable] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setNumberOfPeople('');
            setActiveTable('');
        }
    }, [isOpen]);

    const handleConfirm = async () => {
        console.log('handleConfirm called', { activeTable, numberOfPeople }); // Debug
        if (activeTable && numberOfPeople && parseInt(numberOfPeople) > 0) {
            try {
                const res = await fetch('http://localhost:3001/bookingTable', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        numberOfPeople: parseInt(numberOfPeople),
                        table: activeTable,
                    }),
                });

                const data = await res.json();
                console.log('API Response:', data); // Debug response
                if (res.ok && data.status === 'success') {
                    onConfirm(data);
                    onClose();
                } else {
                    alert(data.message || 'Đặt bàn thất bại!');
                }
            } catch (err) {
                console.error('Error during booking:', err);
                alert('Có lỗi xảy ra, vui lòng thử lại!');
            }
        } else {
            console.log('Validation failed', { activeTable, numberOfPeople });
        }
    };

    const handleTableClick = (table) => {
        console.log('handleTableClick called', table); // Debug
        setActiveTable((prev) => (prev === table ? '' : table));
    };

    return (
        <Popup isOpen={isOpen} onClose={onClose} title="Đặt bàn">
            <div className="">
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

                <div className="my-4">
                    <div className="block text-white text-[14px] font-semibold mb-2">Chọn số bàn</div>
                    <div className="flex items-center gap-[10px] flex-wrap">
                        {selectedTables.map((table) => (
                            <div
                                key={table}
                                className={`font-semibold flex items-center justify-center w-[47px] h-[45px] p-3 border border-[var(--primary-color)] text-center rounded-[5px] text-[12px] cursor-pointer mb-4 ${
                                    activeTable === table
                                        ? 'bg-[var(--primary-color)] text-white'
                                        : 'text-white hover:bg-[var(--primary-color)] hover:text-white'
                                }`}
                                onClick={() => handleTableClick(table)}
                            >
                                {table}
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    className="w-full cursor-pointer mt-4 px-5 py-3 bg-[var(--primary-color)] text-white rounded-[5px] hover:bg-opacity-80 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    onClick={handleConfirm}
                    disabled={!activeTable || !numberOfPeople || parseInt(numberOfPeople) <= 0}
                >
                    <span className="text-[14px] font-semibold">Xác nhận đặt bàn</span>
                </button>
            </div>
        </Popup>
    );
}
