import { authUser, authUserToken } from "../utils/Auth";

export const user = {
    name: "Arfin Foysal",
    role: authUser ? authUser : "all",
    token: authUserToken ? authUserToken : "",
}

const routes = [
    {
        path: '/dashboard/globaladmin',
        role: 'GlobalAdmin'
    },
    {
        path: '/dashboard/localadmin',
        role: 'LocalAdmin'
    },
    {
        path: '/dashboard/schoolsdmin',
        role: 'SchoolAdmin'
    },
    {
        path: '/dashboard/expert',
        role: 'Expert'
    },
    {
        path: '/dashboard/student',
        role: 'Student'
    },
  
 // this is default route
    {
        path: '/login',
        role: 'all'
    }
    // this is default route
]

export const getPath = () => {
    const route = routes.find(r => r.role === user.role);
    return route.path
}