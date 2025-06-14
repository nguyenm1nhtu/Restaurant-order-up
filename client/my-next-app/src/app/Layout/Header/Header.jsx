'use client';

import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useMouseLeaveDropdown } from '@/app/helper/closeDropdown';
import style from './Header.module.css';
import Login from '../Auth/Login';

export default function Header() {
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true);
    const [loginOpen, setLoginOpen] = useState(false);

    const profileRef = useMouseLeaveDropdown(() => {
        console.log('Mouse leave dropdown');
        setProfileDropdownOpen(false);
    });

    const handleLogoutClick = (e) => {
        e.stopPropagation();
        console.log('Logout clicked');
        setLoggedIn(false);
        setProfileDropdownOpen(false);
    };

    const handleLoginClick = () => {
        setLoginOpen(true);
    };

    const handleCloseLogin = () => {
        setLoginOpen(false);
    };

    const handleSubmit = (formData) => {
        console.log('Form submitted:', formData);
        setLoggedIn(true);
        setLoginOpen(false);
    };

    const handleProfileClick = (e) => {
        e.stopPropagation();
        console.log('Profile clicked');
        setProfileDropdownOpen(false);
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
                            <div className={style.items}>Thực đơn</div>
                            <div className={style.items}>Giỏ hàng</div>
                            <div className={style.items}>Thanh Toán</div>

                            {loggedIn ? (
                                <div
                                    className={style.items}
                                    ref={profileRef}
                                    onMouseEnter={() => {
                                        console.log('Mouse enter dropdown');
                                        setProfileDropdownOpen(true);
                                    }}
                                >
                                    Tài khoản
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

                            <button className={clsx(style.headerBtn, style.order)}>ĐẶT BÀN</button>
                        </div>
                    </div>
                </div>
            </header>

            <Login isOpen={loginOpen} onClose={handleCloseLogin} onSubmit={handleSubmit} />
        </>
    );
}
