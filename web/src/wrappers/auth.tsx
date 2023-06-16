import React from 'react'
import {storage} from "@/models/store"
import {TOKEN_KEY} from "@/constants"
import {Token} from '@/services/user/types'
import {Navigate, Outlet} from "@umijs/max"

const AuthRouter: React.FC = () => {
    const token = storage.get(TOKEN_KEY) as Token
    if (token && token.expire_time > 0) {
        return <Outlet/>
    }
    return <Navigate to="/login"/>
}

export default AuthRouter