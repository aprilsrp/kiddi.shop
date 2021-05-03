import iig from '../../icon/instagram-brands.svg'
import ifacebook from '../../icon/facebook-square-brands.svg'
import itel from '../../icon/phone-alt-solid.svg'

function Footer() {
    return (
        
        <div>
            <div className="py-8"></div>
            <div className="flex flex-col items-center box-content h-20 py-4 bg-black text-white w-full">
            <div className="flex justify-center gap-x-5 py-1">
                <a href="https://www.instagram.com/kiddi.s/"><img src={iig} alt="instagramIcon" className="w-5" /></a>
                <a href="https://www.facebook.com/Kiddis-1517092321936942/"><img src={ifacebook} alt="facebookIcon" className="w-5 " /></a>
                <img src={itel} alt="phoneIcon" className="w-5 " />
                <p>0933297883</p>
            </div>
            <div className="flex justify-center text-center">
                <p className="text-xs">KIDDI (คิดดิ) คือแบรนด์สินค้าของคนไทย ถูกผลิตขึ้นในประเทศไทยทุกชิ้น <br></br>
            มีการเสียภาษีอย่างถูกต้อง Store 📍 (หน้าร้าน) ตั้งอยู่ที่ Asap Siam Square​ Soi 3
            </p>
            </div>
        </div>
        </div>
    )

}
export default Footer;