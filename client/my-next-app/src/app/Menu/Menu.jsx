'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/Layout/Header/Header';
import Footer from '@/app/Layout/Footer/Footer';
import clsx from 'clsx';
import Popup from './Popup';
import style from './Menu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Menu() {
    const [foodItems, setFoodItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedFood, setSelectedFood] = useState(null);
    const [requestText, setRequestText] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [isTableBooked, setIsTableBooked] = useState(false);
    const [showTableRequiredPopup, setShowTableRequiredPopup] = useState(false);

    useEffect(() => {
        // Lấy danh mục
        fetch('http://localhost:3001/menu/danhmuc')
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error('Failed to load categories', err));

        // Lấy danh sách món ăn
        fetch('http://localhost:3001/menu/monan')
            .then((res) => res.json())
            .then((data) => setFoodItems(data))
            .catch((err) => console.error('Failed to load food items', err));
    }, []);

    const handleCategoryClick = async (category) => {
        try {
            console.log('Category clicked:', category);
            const res = await fetch(`http://localhost:3001/menu/danhmuc/${category.Ma_danh_muc}/monan`);
            if (!res.ok) throw new Error('Không tìm thấy món ăn');
            const data = await res.json();
            setSelectedCategory(category.Ma_danh_muc);
            setFoodItems(data);
        } catch (err) {
            console.error('Lỗi khi lấy thông tin danh mục: ', err);
        }
    };

    const handleFoodClick = async (food) => {
        console.log('Food clicked:', food);
        try {
            const res = await fetch(`http://localhost:3001/menu/monan/${food.Ma_mon_an}`);
            if (!res.ok) throw new Error('Không tìm thấy món ăn');
            const data = await res.json();
            setSelectedFood(data);
            setRequestText('');
            setQuantity(0);
        } catch (err) {
            console.error('Lỗi khi lấy thông tin món ăn: ', err);
        }
    };

    const handleAddToCart = async () => {
        if (quantity > 0 && selectedFood) {
            if (!isTableBooked) {
                setShowTableRequiredPopup(true);
                return;
            }

            try {
                const cartItem = {
                    Ma_mon_an: selectedFood.Ma_mon_an,
                    So_luong: quantity,
                    Ghi_chu: requestText,
                };

                const res = await fetch('http://localhost:3001/receipt/cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(cartItem),
                });

                if (!res.ok) throw new Error('Failed to add item to cart');

                console.log('Added to cart:', cartItem);
                setShowSuccessPopup(true);
            } catch (err) {
                console.error('Error adding item to cart:', err);
            }
        }
    };

    const handleDecrement = () => {
        if (quantity > 0) setQuantity(quantity - 1);
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const closePopup = () => {
        setSelectedFood(null);
        setQuantity(0);
    };

    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);
    };

    const goToCart = () => {
        console.log('Navigating to cart');
        setShowSuccessPopup(false);
    };

    const continueOrdering = () => {
        setShowSuccessPopup(false);
    };

    const closeTableRequiredPopup = () => {
        setShowTableRequiredPopup(false); // Đóng popup thông báo
    };

    return (
        <>
            <Header />
            <div className={style.container}>
                <div className={style.overlay}>
                    <div className={style.category}>
                        {categories.map((category) => (
                            <div
                                key={category.Ma_danh_muc}
                                className={clsx(style.categoryItem)}
                                onClick={() => handleCategoryClick(category)}
                            >
                                <div className="w-[100px] object-fit">
                                    {/* <img src={category.img} alt={category.name} /> */}
                                </div>
                                <span className="font-bold text-[14px] uppercase">{category.Ten_danh_muc}</span>
                            </div>
                        ))}
                    </div>

                    <div className="w-full mt-[60px] flex flex-wrap gap-[20px] mr-[-20px]">
                        {foodItems.map((item) => (
                            <div key={item.Ma_mon_an} className={style.foodItem} onClick={() => handleFoodClick(item)}>
                                <img
                                    src={item.Hinh_anh ? `/img/monan/${item.Hinh_anh}` : '/placeholder.svg'}
                                    alt={item.Ten_mon_an}
                                    className="object-fit rounded-[15px] h-[250px]"
                                />
                                <div className="flex flex-col text-white w-full">
                                    <p className="text-[20px] font-semibold">{item.Ten_mon_an}</p>
                                    {/* <span className="text-[14px]">
                                        Lượt bán: <span>{item.sales}</span>
                                    </span> */}
                                </div>
                                <p className="text-[#bfa96d] text-[16px]">
                                    Giá bán: <span className="font-semibold">{item.Don_gia}</span>
                                    <span className="font-semibold"> vnđ</span>
                                </p>

                                <div className="absolute w-[30px] h-[30px] text-[25px] right-[20px] bottom-[15px] rounded-full flex justify-center items-center font-semibold bg-[var(--primary-color)]">
                                    +
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />

            <Popup isOpen={!!selectedFood} onClose={closePopup} title={selectedFood?.Ten_mon_an}>
                {selectedFood && (
                    <>
                        <img
                            src={selectedFood.Hinh_anh ? `/img/monan/${selectedFood.Hinh_anh}` : '/placeholder.svg'}
                            alt={selectedFood.Ten_mon_an}
                            className="w-full h-[150px] object-cover rounded-[15px]"
                        />
                        <p className="text-white font-semibold text-[20px] text-center mt-5">
                            {selectedFood.Ten_mon_an}
                        </p>
                        <p className="text-[18px] text-[#bfa96d] mx-2 text-center">
                            <span className="font-semibold">{selectedFood.Don_gia}</span> vnđ
                        </p>
                        <div className="w-full h-[1px] bg-white my-4"></div>
                        {selectedFood.combo && (
                            <ul className="text-[14px] text-white mt-6">
                                {Object.values(selectedFood.combo).map((item, index) => (
                                    <li key={index} className="mb-3">
                                        <FontAwesomeIcon
                                            icon={faCircleChevronRight}
                                            style={{ color: '#bf1e2e', marginRight: index === 0 ? '5px' : '10px' }}
                                        />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="mt-10">
                            <label className="text-[14px] text-white font-semibold">Yêu cầu của bạn</label>
                            <textarea
                                className="w-full p-5 mt-2 border border-gray-300 text-[12px] bg-white resize-none"
                                rows="3"
                                maxLength="300"
                                value={requestText}
                                onChange={(e) => setRequestText(e.target.value)}
                                placeholder="Nhập yêu cầu của quý khách"
                            />
                        </div>

                        <div className="flex items-center justify-between mt-5">
                            <div className="mt-4 flex items-center gap-4">
                                <button
                                    className="px-3 py- bg-white rounded-[5px] text-black hover:bg-gray-400 cursor-pointer text-[20px] w-[30px] h-[30px]"
                                    onClick={handleDecrement}
                                >
                                    -
                                </button>
                                <span className="text-[18px] text-white font-semibold">{quantity}</span>
                                <button
                                    className="px-3 py- bg-white rounded-[5px] text-black hover:bg-gray-400 cursor-pointer text-[20px] w-[30px] h-[30px]"
                                    onClick={handleIncrement}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className="cursor-pointer mt-4 px-5 py-3 bg-[var(--primary-color)] text-white rounded-[5px] hover:bg-opacity-80 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                onClick={handleAddToCart}
                                disabled={quantity <= 0}
                            >
                                <span className="text-[14px] font-semibold">Thêm vào giỏ hàng</span>
                            </button>
                        </div>
                    </>
                )}
            </Popup>

            {/* Popup thành công */}
            <Popup isOpen={showSuccessPopup} onClose={closeSuccessPopup}>
                <div className="text-center">
                    <p className="text-white text-[16px] font-semibold mb-10">Thêm vào giỏ hàng thành công!</p>
                    <div className="flex justify-center gap-4">
                        <button
                            className="cursor-pointer px-5 py-2 bg-[var(--primary-color)] text-white rounded-[5px] hover:bg-opacity-80"
                            onClick={goToCart}
                        >
                            <span className="text-[14px] font-semibold">
                                <Link href="/Cart">Đến giỏ hàng</Link>
                            </span>
                        </button>
                        <button
                            className="cursor-pointer px-5 py-2 bg-gray-300 text-black rounded-[5px] hover:bg-gray-400"
                            onClick={continueOrdering}
                        >
                            <span className="text-[14px] font-semibold">Tiếp tục đặt đơn</span>
                        </button>
                    </div>
                </div>
            </Popup>

            {/* Popup thông báo cần đặt bàn */}
            <Popup isOpen={showTableRequiredPopup} onClose={closeTableRequiredPopup}>
                <div className="text-center">
                    <p className="text-white text-[16px] font-semibold mb-10">Cần đặt bàn trước khi đặt món!</p>
                    <button
                        className="cursor-pointer px-5 py-2 bg-[var(--primary-color)] text-white rounded-[5px] hover:bg-opacity-80"
                        onClick={closeTableRequiredPopup}
                    >
                        <span className="text-[14px] font-semibold">Đóng</span>
                    </button>
                </div>
            </Popup>
        </>
    );
}
