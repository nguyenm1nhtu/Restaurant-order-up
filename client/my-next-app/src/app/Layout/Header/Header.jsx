'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Order from '@/app/Order/Order';
import { useMouseLeaveDropdown } from '@/app/helper/closeDropdown';
import style from './Header.module.css';
import Login from '../Auth/Login';

export default function Header() {
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [guestName, setGuestName] = useState('');
    const [bookingOpen, setBookingOpen] = useState(false);

    const profileRef = useMouseLeaveDropdown(() => {
        setProfileDropdownOpen(false);
    });

    useEffect(() => {
        fetch('http://localhost:3001/me', {
            credentials: 'include',
        })
            .then((res) => {
                if (!res.ok) throw new Error('Not authenticated');
                return res.json();
            })
            .then((data) => {
                setLoggedIn(true);
                setGuestName(data.user?.Ten_khach_hang || 'Khách hàng');
            })
            .catch(() => {
                setLoggedIn(false);
                setGuestName('');
            });
        fetch('http://localhost:3001/me', {
            credentials: 'include',
        })
            .then((res) => {
                if (!res.ok) throw new Error('Not authenticated');
                return res.json();
            })
            .then((data) => {
                setLoggedIn(true);
                setGuestName(data.user?.Ten_khach_hang || 'Khách hàng');
            })
            .catch(() => {
                setLoggedIn(false);
                setGuestName('');
            });
    }, []);

    const handleLogoutClick = async (e) => {
        e.stopPropagation();

        await fetch('http://localhost:3001/logout', {
            method: 'POST',
            credentials: 'include',
        });

        setLoggedIn(false);
        setGuestName('');
        setProfileDropdownOpen(false);
    };

    const handleLoginClick = () => {
        setLoginOpen(true);
    };

    const handleCloseLogin = () => {
        setLoginOpen(false);
    };

    const handleSubmit = async (data) => {
        try {
            const res = await fetch('http://localhost:3001/me', {
                credentials: 'include',
            });

            if (res.ok) {
                const userData = await res.json();
                setGuestName(userData.user?.Ten_khach_hang || 'Khách hàng');
                setLoggedIn(true);
                setLoginOpen(false);
            }
        } catch (err) {
            console.error('Login failed to fetch user info:', err);
        }
    };

    const handleProfileClick = (e) => {
        e.stopPropagation();
        setProfileDropdownOpen(false);
    };

    const handleBookingClick = () => {
        setBookingOpen(true);
    };

    const handleCloseBooking = () => {
        setBookingOpen(false);
    };

    const handleBookingConfirm = (bookingData) => {
        console.log('Booking confirmed:', bookingData);
        setBookingOpen(false);
        setBookingOpen(false);
    };

    return (
        <>
            <header id="header">
                <div className={style.header}>
                    <div className="flex items-center w-full h-full px-[180px] justify-between">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <img src="/img/header/logo.png" alt="logo" className="h-[42px]" />
                            </Link>
                        </div>

                        <div className="flex items-center gap-[5px] h-full">
                            <div className={style.items}>
                                <Link href="/Menu">Thực đơn</Link>
                            </div>
                            <div className={style.items}>
                                <Link href="/Cart">Giỏ hàng</Link>
                            </div>

                            {loggedIn ? (
                                <div
                                    className={style.items}
                                    ref={profileRef}
                                    onMouseEnter={() => setProfileDropdownOpen(true)}
                                >
                                    <span>{guestName}</span>
                                    {profileDropdownOpen && (
                                        <div className={`${style.dropDownContainer} z-10`}>
                                            <ul className="font-[500]">
                                                <li className={style.dropdownItem} onClick={handleProfileClick}>
                                                    <Link href="/Profile" className="w-full h-full block">
                                                        <span>Thông tin tài khoản</span>
                                                    </Link>
                                                </li>
                                                <li className={style.dropdownItem}>
                                                    <div className="w-full h-full" onClick={handleLogoutClick}>
                                                        Đăng xuất
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button className={clsx(style.headerBtn, style.loggin)} onClick={handleLoginClick}>
                                    ĐĂNG NHẬP
                                </button>
                            )}

                            <button
                                className={clsx(style.headerBtn, style.order)}
                                onClick={handleBookingClick}
                                disabled={!loggedIn} // Disabled khi chưa đăng nhập
                            >
                                ĐẶT BÀN
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <Login isOpen={loginOpen} onClose={handleCloseLogin} onSubmit={handleSubmit} />
            <Order isOpen={bookingOpen} onClose={handleCloseBooking} onConfirm={handleBookingConfirm} />
        </>
    );
}
