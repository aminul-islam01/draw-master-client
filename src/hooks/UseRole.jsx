import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxios from "./UseAxios";


const UseRole = () => {
    const {user, loading} = UseAuth();
    const [axiosSecure] = UseAxios();
   
    const { data: users = {} } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !loading,

        queryFn: async () => {
            const res = await axiosSecure(`/users/role/${user?.email}`)
            return res.data;
        },
    })
    return [users]
};

export default UseRole;