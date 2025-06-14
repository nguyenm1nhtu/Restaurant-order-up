'use client';

export default function Footer() {
    return (
        <>
            <footer id="footer">
                <div
                    className="w-full bg-white relative px-[180px] py-[40px]"
                    style={{ borderTop: '1px solid #e8ebed' }}
                >
                    <img src="/img/header/logo.png" alt="logo" className="h-[42px] object-contain mb-9" />

                    <div className="w-full h-full flex gap-[100px]">
                        <div className="w-1/2 flex flex-col gap-[15px]">
                            <p className="text-[16px] font-semibold text-black">Đặt chỗ & Ưu đãi</p>
                            <p className="text-[14px] text-gray">
                                Ushi Mania là hệ thống nhà hàng thịt nướng tại Hà Nội được đánh giá cao về chất lượng và
                                giá cả. Có những combo hấp dẫn chỉ có tại Ushi Mania. Khách hàng sẽ được thưởng thức tới
                                gần 50 món ăn từ ba chỉ bò Mỹ, hải sản tổng hợp, khai vị hấp dẫn với Gà sốt Hàn Quốc,
                                Salad Hoa quả, Ngao xào sốt Thái cùng vô vàn những món ăn, thức uống hấp dẫn khác…
                            </p>
                        </div>

                        <div className="w-1/2 flex flex-col gap-[15px]">
                            <p className="text-[16px] font-semibold text-black">Thông tin doanh nghiệp</p>
                            <ul className="text-[14px] text-gray">
                                <li>Địa chỉ: xxxxx</li>
                                <li>Hotline: 0287 306 9795</li>
                                <li>Email: abcd@xyzt.com</li>
                                <li>Mã số thuế: 0123456789</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
