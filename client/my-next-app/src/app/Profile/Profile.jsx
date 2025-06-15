'use client';

import { useState } from 'react';
import Header from '@/app/Layout/Header/Header';
import style from './Profile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faUserTie, faClockRotateLeft, faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default function Profile() {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const sanitizedValue = name === 'phoneNumber' ? value.replace(/[^0-9]/g, '') : value;
        setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const isSubmitDisabled = !formData.fullName.trim() || !formData.phoneNumber.trim();

    return (
        <>
            <Header />
            <div className={style.main}>
                <div className={style.container}>
                    <div className={style.boxUpdateInfo}>
                        <p className="text-[18px] font-semibold text-black mb-5">Chỉnh sửa thông tin cá nhân</p>
                        <p className="text-[14px] text-gray mb-7">
                            <span className="text-[var(--primary-color)]">( * ) </span> Các thông tin bắt buộc
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-[14px] mb-3 font-semibold">
                                    Họ và tên: <span className="text-[var(--primary-color)]"> * </span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    className="w-full p-5 border rounded-[10px]"
                                    placeholder="Nhập họ và tên"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-[14px] mb-3 font-semibold">
                                    Số điện thoại: <span className="text-[var(--primary-color)]"> * </span>
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    className="w-full p-5 border rounded-[10px]"
                                    placeholder="Nhập số điện thoại"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    pattern="[0-9]*"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-[14px] mb-3 font-semibold">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full p-5 border rounded-[10px]"
                                    placeholder="Nhập email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <button
                                type="submit"
                                className="cursor-pointer mt-6 w-full bg-[var(--primary-color)] text-white px-2 rounded hover:opacity-80 rounded-[10px] font-bold py-5 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                disabled={isSubmitDisabled}
                            >
                                LƯU THÔNG TIN
                            </button>
                        </form>
                    </div>

                    <div className={style.boxTools}>
                        <p className="text-[16px] text-black">Chào bạn trở lại,</p>
                        <p className="text-[18px] font-semibold text-[var(--primary-color)] mb-6">Đoàn Trung Hiếu</p>
                        <p className="text-[16px] text-gray flex gap-[15px] items-center mb-4">
                            <FontAwesomeIcon icon={faPhone} />
                            <span className="font-semibold">Số điện thoại: </span>
                            <span>01234567890</span>
                        </p>
                        <p className="text-[16px] text-gray flex gap-[15px] items-center mb-4">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span className="font-semibold">Email: </span>
                            <span>1110@html.com</span>
                        </p>
                        <p className="text-[16px] text-gray flex gap-[15px] items-center mb-4">
                            <FontAwesomeIcon icon={faUserTie} />
                            <span className="font-semibold">Thành viên: </span>
                            <span>SILVER</span>
                        </p>

                        {/* <div
                            className="mt-2 text-[16px] text-gray flex justify-between items-center w-full py-5 hover:text-[var(--primary-color)] cursor-pointer"
                            style={{ borderBottom: '1px solid #e8ebed' }}
                        >
                            <div className="flex gap-[15px] items-center">
                                <FontAwesomeIcon icon={faClockRotateLeft} />
                                Lịch sử hóa đơn
                            </div>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}
