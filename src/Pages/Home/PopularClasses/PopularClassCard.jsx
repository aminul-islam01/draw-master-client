import Swal from "sweetalert2";
import UseAuth from "../../../hooks/UseAuth";
import UseClasses from "../../../hooks/UseClasses";
import UseAxios from "../../../hooks/UseAxios";
import { useNavigate } from "react-router-dom";
import UseRole from "../../../hooks/UseRole";

const PopularClassCard = ({singleClass}) => {
    const {image, className, price } = singleClass;
    const {user} = UseAuth();
    const [ , refetch] = UseClasses();
    const [axiosSecure] = UseAxios();
    const navigate = useNavigate();
    const [users] = UseRole();

    const handleSelect = (singleClass) => {
        const { _id, className, image, price} = singleClass;
        const selectedClass = {id: _id, email: user?.email, image, className, price}

       {user? axiosSecure.post('/cart-classes', selectedClass)
        .then(data => {
            if(data.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'class selected success fully',
                    showConfirmButton: false,
                    timer: 1500
                })
                refetch()
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'This class already selected!',
                  })
            }
        }): navigate('/login')}
    }
    return (
        <div className="card w-full glass">
            <figure><img src= {image} alt="car!" /></figure>
            <div className="card-body">
                <h2 className="card-title">{className}</h2>
                <div className="card-actions justify-end">
                    <p className="font-semibold">CourseFee:  <span className="text-yellow-600">${price}</span></p>
                    <button onClick={() => handleSelect(singleClass)} className="btn btn-primary btn-sm" disabled={singleClass.availableSeat === 0 || users.role === 'admin' || users.role === 'instructor'}>Select</button>
                </div>
            </div>
        </div>
    );
};

export default PopularClassCard;