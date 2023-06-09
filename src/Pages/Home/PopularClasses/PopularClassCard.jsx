
const PopularClassCard = ({singleClass}) => {
    const {image, name} = singleClass;
    return (
        <div className="card w-full glass">
            <figure><img src= {image} alt="car!" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>How to park your car at your garage?</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Learn now!</button>
                </div>
            </div>
        </div>
    );
};

export default PopularClassCard;