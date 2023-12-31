import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import StudentsFeedback from "../StudentsFeedback/StudentsFeedback";


const Home = () => {
    return (
        <div>
            <Helmet><title>Draw-master-classes | home</title></Helmet>
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <PopularInstructor></PopularInstructor>
            <StudentsFeedback></StudentsFeedback>
        </div>
    );
};

export default Home;