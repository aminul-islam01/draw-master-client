import UseAuth from "../../../hooks/UseAuth";

const InstructorHome = () => {
    const {user} = UseAuth()
    return (
        <div>
            <h2 className="text-center py-5 text-2xl font-semibold">
            <span className="font-bold">Instructor</span>: {user?.displayName}</h2>
            <img className="mx-auto" src="https://images.unsplash.com/photo-1580191947416-62d35a55e71d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZGFzaGJvYXJkJTIwd2VsY29tZSUyMGltYWdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" />
        </div>
    );
};

export default InstructorHome;