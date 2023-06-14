
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import banner1 from "../../../images/banner5.jpg"
import banner2 from "../../../images/banner4.jpg"
import banner3 from "../../../images/banner6.jpg"
import banner4 from "../../../images/banner2.jpg"
import banner5 from "../../../images/banner1.jpg"
import { Link } from "react-router-dom";


const Banner = () => {
    const imgArray = [banner2, banner1, banner3, banner4, banner5];
  
    return (
      <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {imgArray.map((image, index) => 
       <SwiperSlide key={index}><img className="w-full h-[100vh]" src={image} />
       <div className="absolute top-0 left-0 w-full h-full md:flex items-center justify-between bg-black bg-opacity-50 p-10">
         <div className="md:w-1/2 text-white">
           <h2 className="text-4xl font-bold mb-5">Unleash Your Artistic Potential</h2>
           <p className="mb-5">Welcome to DrawMasterClass, the premier online destination for aspiring artists and seasoned sketchers alike. Discover the joy of drawing as our expert instructors guide you through a transformative journey of artistic expression. From mastering the fundamentals to exploring diverse mediums, our comprehensive courses empower you to create captivating works of art. Join our vibrant community of creators and unlock your creativity today!<br/>
           Feel free to customize and adapt the banner title and description to fit the specific focus and tone of your drawing school website.
           </p>
         </div>
         <Link to="/classes"><button className="btn btn-primary">Enroll Now</button></Link>
       </div>
       </SwiperSlide>
      )}
    </Swiper>
    );
};

export default Banner;