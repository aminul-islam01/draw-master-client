import { useEffect, useState } from "react";
import PopularClassCard from "./PopularClassCard";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const PopularClasses = () => {
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        fetch('https://draw-master-class-server.vercel.app/popular-classes')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])
    
    return (
        <div>
            <SectionTitle subHeading="classes" heading="Our Popular Classes">
            </SectionTitle>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                {
                    classes.map(singleClass => <PopularClassCard
                        key={singleClass._id}
                        singleClass={singleClass}></PopularClassCard>)
                }
            </div>
        </div>
    );
};

export default PopularClasses;