import { Helmet } from "react-helmet-async";
import { useEffect, useState } from 'react'
import { authInit, retriveAccessToken } from '../config/userAuth'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn'   // 解决antd日期相关组件国际化问题
import { Loading, ComponentProvider, Layout as AppRouter } from '../components'
import type { UserInfo, UserAuthResponse } from '../models'
import { menu } from '../config/menu'
import { clientHeight } from '../config'

export default function Index(): JSX.Element {
    const [loading, setLoading] = useState(true)
    const [account, setAccount] = useState<UserInfo | null>(null)
    const [clientH, setClientH] = useState<number | undefined>(clientHeight())
    const [authResponse, setAuthResponse] = useState<any>(null)

    useEffect(() => {
        // 获取用户菜单，权限等
        (async () => {
            try {
                const authResponse: UserAuthResponse = await authInit()
                const userInfo: UserInfo = await authResponse.loadUserInfo();
                setAccount(userInfo)
                setAuthResponse(authResponse)
            } finally {
                setLoading(false);
            }
        })();
    }, [])

    if (loading) return <Loading progress={false} spin />

    return (
        <ConfigProvider locale={zhCN}>
            <Helmet title="BXG Admin | Home" />
            <ComponentProvider
                account={account}
                setAccount={setAccount}
                menu={menu}
                clientHeight={clientH}
                setClientHeight={setClientH}
                authResponse={authResponse}
            >
                <AppRouter />
            </ComponentProvider>
        </ConfigProvider >
    );
}
