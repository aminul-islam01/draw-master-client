import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import UseClasses from "../../../hooks/UseClasses";


const SelectedClass = () => {
   
    const [selectClasses, refetch] = UseClasses();

   

    return (
        <div className="mb-20 px-5">
            <SectionTitle subHeading="Classes" heading="My Selected Classes">
            </SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-amber-600 text-lg text-white">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Class Name</th>                                           
                            <th>Price</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectClasses.map((selectedClass, index) =>
                            <tr key={selectedClass._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-16 h-16">
                                            <img src={selectedClass.image} />
                                        </div>
                                    </div>
                                </td>
                                <td>{selectedClass.className}</td>
                                <td>$ {selectedClass.price}</td>
                                <td>
                                    <button className="btn btn-primary btn-xs">Delete</button>
                                </td>
                                <td>
                                    <button className="btn btn-primary btn-xs">Pay</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SelectedClass;