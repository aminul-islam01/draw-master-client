
const SectionTitle = ({subHeading, heading}) => {
    return (
        <div className="text-center pt-10">
            <p className="text-yellow-600 text-xl mb-3 font-semibold">---- {subHeading} ----</p>
            <h2 className="text-3xl uppercase font-semibold mb-8">{heading}</h2>
        </div>
    );
};

export default SectionTitle;