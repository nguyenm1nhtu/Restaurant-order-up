'use client';

import { useState } from 'react';
import Header from '@/app/Layout/Header/Header';
import Footer from '@/app/Layout/Footer/Footer';
import clsx from 'clsx';
import Popup from './Popup';
import style from './Menu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function Menu() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedFood, setSelectedFood] = useState(null);
    const [requestText, setRequestText] = useState('');
    const [quantity, setQuantity] = useState(0);

    const categories = [
        { name: 'Thịt bò Aging', img: '/img/menu/aging.png' },
        { name: 'Món ăn phụ', img: '/img/menu/slide.png' },
        { name: 'Món ăn kèm', img: '/img/menu/fried.png' },
        { name: 'Đồ uống', img: '/img/menu/drink.png' },
    ];

    const foodItems = [
        { name: 'Wagyu Saiko Combo', sales: '1.3k', price: '1.590.000', img: '/img/menu/food.jpg' },
        { name: 'Cocktail Big Black Cock', sales: '6.9k', price: '1.110.000', img: '/img/menu/food.jpg' },
        { name: 'Wagyu Saiko Combo', sales: '1.3k', price: '1.590.000', img: '/img/menu/food.jpg' },
        { name: 'Wagyu Saiko Combo', sales: '1.3k', price: '1.590.000', img: '/img/menu/food.jpg' },
        { name: 'Wagyu Saiko Combo', sales: '1.3k', price: '1.590.000', img: '/img/menu/food.jpg' },
        { name: 'Wagyu Saiko Combo', sales: '1.3k', price: '1.590.000', img: '/img/menu/food.jpg' },
        { name: 'Wagyu Saiko Combo', sales: '1.3k', price: '1.590.000', img: '/img/menu/food.jpg' },
        { name: 'Wagyu Saiko Combo', sales: '1.3k', price: '1.590.000', img: '/img/menu/food.jpg' },
    ];

    const foodDescription = [
        {
            name: 'Wagyu Saiko Combo',
            sales: '6.9k',
            price: '1.590.000',
            img: '/img/menu/food.jpg',
            combo: {
                steak1: 'Aging SirLoin Wagyu A5 (100gr)',
                steak2: 'Chuck Short Rib Wagyu A4 (100gr)',
                steak3: 'Aging Rib Eye (100gr)',
                steak4: 'Aging Chuck Flap (100gr)',
                steak5: 'Aging Chuch Eye Roll (100gr)',
            },
        },
        {
            name: 'Cocktail Big Black Cock',
            sales: '1.3k',
            price: '1.110.000',
            img: '/img/menu/food.jpg',
        },
        {
            name: 'Wagyu Saiko Combo',
            sales: '1.3k',
            price: '1.590.000',
            img: '/img/menu/food.jpg',
            combo: {
                steak1: 'Aging SirLoin Wagyu A5 (100gr)',
                steak2: 'Chuck Short Rib Wagyu A4 (100gr)',
                steak3: 'Aging Rib Eye (100gr)',
                steak4: 'Aging Chuck Flap (100gr)',
                steak5: 'Aging Chuch Eye Roll (100gr)',
            },
        },
        {
            name: 'Wagyu Saiko Combo',
            sales: '1.3k',
            price: '1.590.000',
            img: '/img/menu/food.jpg',
            combo: {
                steak1: 'Aging SirLoin Wagyu A5 (100gr)',
                steak2: 'Chuck Short Rib Wagyu A4 (100gr)',
                steak3: 'Aging Rib Eye (100gr)',
                steak4: 'Aging Chuck Flap (100gr)',
                steak5: 'Aging Chuch Eye Roll (100gr)',
            },
        },
        {
            name: 'Wagyu Saiko Combo',
            sales: '1.3k',
            price: '1.590.000',
            img: '/img/menu/food.jpg',
            combo: {
                steak1: 'Aging SirLoin Wagyu A5 (100gr)',
                steak2: 'Chuck Short Rib Wagyu A4 (100gr)',
                steak3: 'Aging Rib Eye (100gr)',
                steak4: 'Aging Chuck Flap (100gr)',
                steak5: 'Aging Chuch Eye Roll (100gr)',
            },
        },
        {
            name: 'Wagyu Saiko Combo',
            sales: '1.3k',
            price: '1.590.000',
            img: '/img/menu/food.jpg',
            combo: {
                steak1: 'Aging SirLoin Wagyu A5 (100gr)',
                steak2: 'Chuck Short Rib Wagyu A4 (100gr)',
                steak3: 'Aging Rib Eye (100gr)',
                steak4: 'Aging Chuck Flap (100gr)',
                steak5: 'Aging Chuch Eye Roll (100gr)',
            },
        },
        {
            name: 'Wagyu Saiko Combo',
            sales: '1.3k',
            price: '1.590.000',
            img: '/img/menu/food.jpg',
            combo: {
                steak1: 'Aging SirLoin Wagyu A5 (100gr)',
                steak2: 'Chuck Short Rib Wagyu A4 (100gr)',
                steak3: 'Aging Rib Eye (100gr)',
                steak4: 'Aging Chuck Flap (100gr)',
                steak5: 'Aging Chuch Eye Roll (100gr)',
            },
        },
        {
            name: 'Wagyu Saiko Combo',
            sales: '1.3k',
            price: '1.590.000',
            img: '/img/menu/food.jpg',
            combo: {
                steak1: 'Aging SirLoin Wagyu A5 (100gr)',
                steak2: 'Chuck Short Rib Wagyu A4 (100gr)',
                steak3: 'Aging Rib Eye (100gr)',
                steak4: 'Aging Chuck Flap (100gr)',
                steak5: 'Aging Chuch Eye Roll (100gr)',
            },
        },
    ];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        console.log('Selected category:', category);
    };

    const handleFoodClick = (food) => {
        const foodWithCombo = foodDescription.find((fd) => fd.name === food.name);
        setSelectedFood({ ...food, ...foodWithCombo });
        setRequestText('');
        setQuantity(0);
    };

    const handleAddToCart = () => {
        if (quantity > 0) {
            console.log('Added to cart:', selectedFood, 'Quantity:', quantity, 'Request:', requestText);
            setSelectedFood(null);
            setQuantity(0);
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

    return (
        <>
            <Header />
            <div className={style.container}>
                <div className={style.overlay}>
                    <div className={style.category}>
                        {categories.map((category) => (
                            <div
                                key={category.name}
                                className={clsx(style.categoryItem, selectedCategory === category.name && style.active)}
                                onClick={() => handleCategoryClick(category.name)}
                            >
                                <div className="w-[100px] object-fit">
                                    <img src={category.img} alt={category.name} />
                                </div>
                                <span className="font-bold text-[14px] uppercase">{category.name}</span>
                            </div>
                        ))}
                    </div>

                    <div className="w-full mt-[60px] flex flex-wrap gap-[20px] mr-[-20px]">
                        {foodItems.map((item, index) => (
                            <div key={index} className={style.foodItem} onClick={() => handleFoodClick(item)}>
                                <img src={item.img} alt={item.name} className="object-fit rounded-[15px]" />
                                <div className="flex flex-col text-white w-full">
                                    <p className="text-[20px] font-semibold">{item.name}</p>
                                    <span className="text-[14px]">
                                        Lượt bán: <span>{item.sales}</span>
                                    </span>
                                </div>
                                <p className="text-[#bfa96d] text-[16px]">
                                    Giá bán: <span className="font-semibold">{item.price}</span>
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

            <Popup isOpen={!!selectedFood} onClose={closePopup} title={selectedFood?.name}>
                {selectedFood && (
                    <>
                        <img
                            src={selectedFood.img}
                            alt={selectedFood.name}
                            className="w-full h-[150px] object-cover rounded-[15px]"
                        />
                        <p className="text-white font-semibold text-[20px] text-center mt-5">{selectedFood.name}</p>
                        <p className="text-[18px] text-[#bfa96d] mx-2 text-center">
                            <span className="font-semibold">{selectedFood.price}</span> vnđ
                        </p>
                        <div className="w-full h-[1px] bg-white my-4"></div>
                        {selectedFood.combo && (
                            <ul className="text-[14px] text-white mt-6">
                                <li className="mb-3">
                                    <FontAwesomeIcon
                                        icon={faCircleChevronRight}
                                        style={{ color: '#bf1e2e', marginRight: '5px' }}
                                    />{' '}
                                    {selectedFood.combo.steak1}
                                </li>
                                <li className="mb-3">
                                    <FontAwesomeIcon
                                        icon={faCircleChevronRight}
                                        style={{ color: '#bf1e2e', marginRight: '10px' }}
                                    />
                                    {selectedFood.combo.steak2}
                                </li>
                                <li className="mb-3">
                                    <FontAwesomeIcon
                                        icon={faCircleChevronRight}
                                        style={{ color: '#bf1e2e', marginRight: '10px' }}
                                    />
                                    {selectedFood.combo.steak3}
                                </li>
                                <li className="mb-3">
                                    <FontAwesomeIcon
                                        icon={faCircleChevronRight}
                                        style={{ color: '#bf1e2e', marginRight: '10px' }}
                                    />
                                    {selectedFood.combo.steak4}
                                </li>
                                <li className="mb-3">
                                    <FontAwesomeIcon
                                        icon={faCircleChevronRight}
                                        style={{ color: '#bf1e2e', marginRight: '10px' }}
                                    />
                                    {selectedFood.combo.steak5}
                                </li>
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
                                className="mt-4 px-5 py-3 bg-[var(--primary-color)] text-white rounded-[5px] hover:bg-opacity-80 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                onClick={handleAddToCart}
                                disabled={quantity <= 0}
                            >
                                <span className="text-[14px] font-semibold">Thêm vào giỏ hàng</span>
                            </button>
                        </div>
                    </>
                )}
            </Popup>
        </>
    );
}
