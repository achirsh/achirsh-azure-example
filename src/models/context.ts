import { ReactNode, ReactElement } from 'react'
import { UserInfo } from './account'
import { IMenu } from './menu'

interface IComponentContextValue {
    children?: ReactElement,
    // 加载中提示
    loadingTip?: string,
    // 样式类前缀，要与less文件中 @ra-lib-prefix 值变量相同
    prefixCls?: string,
    // 确定按钮文案
    okText?: string | ReactNode,
    // 取消按钮文案
    cancelText?: string | ReactNode,
    // PageContent组件 fitHeight 时，计算高度所用到的额外高度值
    layoutPageOtherHeight?: number,
    // 是否是手机布局
    isMobile?: boolean,
    // 手机布局下，缺省column宽度默认值
    mobileColumnDefaultWidth?: number,

    // 账号
    account?: UserInfo | null,
    // 设置账号
    setAccount?: (account: UserInfo | null) => void,
    authResponse?: any,
    // 菜单
    menu: IMenu[],
    // 页面可视高度
    clientHeight?: number | undefined,
    // 设置页面可视高度
    setClientHeight?: (clientHeight: number | undefined) => void,
}

export {
    IComponentContextValue
}
