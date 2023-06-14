
const LoadingSpinner = () => {
    return (
        <div className="h-[100vh] flex items-center justify-center">
            <div className="flex">
                <h2>Loading</h2>
                <span className="loading loading-spinner"></span>
            </div>
        </div>
    );
};

export default LoadingSpinner;