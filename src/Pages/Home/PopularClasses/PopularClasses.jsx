import { useEffect, useState } from "react";
import PopularClassCard from "./PopularClassCard";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const PopularClasses = () => {
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/classes')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])
    console.log(classes)
    return (
        <div>
            <SectionTitle subHeading="classes" heading="Our Popular Classes">
            </SectionTitle>
            <div className="grid gap-8 md:grid-cols-3">
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