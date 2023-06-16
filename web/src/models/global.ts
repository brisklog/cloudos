// 全局共享数据示例
import {useState} from 'react';

const useAuth = () => {
    const [auth, setAuth] = useState<boolean>(false);
    return {
        auth,
        setAuth,
    };
};

export default useAuth;
