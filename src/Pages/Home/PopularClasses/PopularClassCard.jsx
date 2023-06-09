
const PopularClassCard = ({singleClass}) => {
    const {image, className, price } = singleClass;
    return (
        <div className="card w-full glass">
            <figure><img src= {image} alt="car!" /></figure>
            <div className="card-body">
                <h2 className="card-title">{className}</h2>
                <div className="card-actions justify-end">
                    <p className="font-semibold">CourseFee:  <span className="text-yellow-600">${price}</span></p>
                    <button className="btn btn-primary">Enroll now!</button>
                </div>
            </div>
        </div>
    );
};

export default PopularClassCard;