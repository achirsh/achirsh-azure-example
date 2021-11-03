/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useContext, useMemo, useCallback, useImperativeHandle, forwardRef } from 'react'
import { Menu, Layout } from 'antd'
import styles from './index.module.scss'
import { useHistory } from 'react-router-dom'
import { ComponentContext } from '..'
import { IMenu, IMenuChild } from '../../models'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {

}

const { Sider } = Layout
const { SubMenu } = Menu

function MenuPage(props: IProps, ref: any) {
    const [path, setPath] = useState('');
    const [openKeys, setOpenKeys] = useState('')
    const history = useHistory()
    const context = useContext(ComponentContext)
    const [collapsed, setCollapsed] = useState(false)

    // 收缩边菜单
    useImperativeHandle(ref, () => ({
        changeCollapsed: () => {
            setCollapsed(!collapsed)
        }
    }))

    const handleClick = useCallback(({ item, key, keyPath, selectedKeys, domEvent }) => {
        history.push(key)
        setPath(key)
    }, [history])

    const openChange = useCallback(async (keys) => {
        setOpenKeys(keys && keys.length > 0 ? keys[1] : '')
    }, [])

    const menuItems = useMemo(() => {
        return <Menu
            selectedKeys={[path]}
            openKeys={[openKeys]}
            mode="inline"
            theme="dark"
            onSelect={handleClick}
            onOpenChange={openChange}
        >
            {context.menu && context.menu.map((item: IMenu) => {
                if (item.child && item.child.length > 0) {
                    return <SubMenu
                        key={item.key}
                        title={item.value}
                        icon={item.icon}
                    >
                        {item.child.map((child: IMenuChild) => {
                            return <Menu.Item key={child.path}>
                                {child.value}
                            </Menu.Item>
                        })}
                    </SubMenu>
                } else {
                    return <Menu.Item key={item.path} icon={item.icon}>
                        {item.value}
                    </Menu.Item>
                }
            })}
        </Menu>
    }, [path, openKeys, handleClick, openChange, context.menu])

    const init = useCallback(() => {
        const pathname = window.location.pathname
        if (pathname) {
            setPath(pathname)
            let keys = ''
            for (let i = 0; i < context.menu.length; i++) {
                if (context.menu[i].path && context.menu[i].path === pathname) {
                    keys = context.menu[i].key
                    break;
                }
                if (context.menu[i].child) {
                    for (let j = 0; j < (context.menu[i].child as any).length; j++) {
                        if ((context.menu[i].child as any)[j].path === pathname) {
                            keys = context.menu[i].key
                            break;
                        }
                    }
                }
            }
            setOpenKeys(keys)
        }
    }, [context.menu])

    useEffect(() => {
        init()
    }, [init])

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className={styles.logo} style={{ justifyContent: collapsed ? 'center' : 'normal' }}>
                <img alt="" src={require('../../assets/images/logo-28.png')} />
                {!collapsed && <span>传智教育</span>}
            </div>
            {menuItems}
        </Sider>
    )
}

const MenuPages = forwardRef(MenuPage)

export default MenuPages
