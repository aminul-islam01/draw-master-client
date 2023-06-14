import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'


const StudentsFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/student-feedback')
            .then(res => res.json())
            .then(data => setFeedbacks(data))
    }, [])
    
    return (
        <div className="md:w-1/2 mx-auto bg-slate-50">
            <SectionTitle subHeading="feedback" heading="Students Feedback">
            </SectionTitle>
            <Swiper
                pagination={{
                    type: "progressbar",
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="m-10"
            >
                {feedbacks.map(feedback =>
                    <SwiperSlide key={feedback._id} className="py-10 px-16">
                        <p className="text-center">{feedback.comment}</p>
                        <div className="flex justify-evenly items-center mt-4">
                            <h3 className="text-xl font-semibold">{feedback.name}</h3>
                            <Rating
                                style={{ maxWidth: 100 }}
                                readOnly
                                value={feedback.rating}
                            />
                        </div>
                    </SwiperSlide>
                )}

            </Swiper>
        </div>
    );
};

export default StudentsFeedback;