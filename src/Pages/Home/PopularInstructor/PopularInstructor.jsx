import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";


const PopularInstructor = () => {
    const [instructors, setInstructors] = useState([]);
    useEffect(() => {
        fetch('https://draw-master-class-server.vercel.app/popular-instructor')
        .then(res => res.json())
        .then(data=> setInstructors(data))
    }, [])
    return (
        <div className="mb-20">
            <SectionTitle subHeading="Instructors" heading="Our Popular Instructors">
            </SectionTitle>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                {instructors.map(instructor => 
                <div className="rounded-md overflow-hidden" key={instructor._id}>
                    <img className="h-64 w-full hover:scale-125 duration-200" src={instructor.image} alt="" />
                </div> )}
            </div>
        </div>
    );
};

export default PopularInstructor;