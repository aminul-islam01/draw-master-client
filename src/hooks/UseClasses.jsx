import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxios from "./UseAxios";


const UseClasses = () => {
    const {user, loading} = UseAuth()

    const [axiosSecure] = UseAxios();
    const { refetch, data: selectClasses = [] } = useQuery({
        queryKey: ['selectClasses', user?.email],
        enabled: !loading,

        queryFn: async () => {
            const res = await axiosSecure(`/selected-classes?email=${user?.email}`)
            return res.data;
        },
    })

    return [selectClasses, refetch]
    
};

export default UseClasses;