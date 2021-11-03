/* eslint-disable @typescript-eslint/no-explicit-any */
import { createElement, useState, useContext, useEffect } from 'react'
import { Layout, Space } from 'antd'
import styles from './index.module.scss'
import { MenuUnfoldOutlined, LogoutOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import AvatarDropdown from './avatarDropdown'
import { ComponentContext } from '..'
import { clientHeight } from '../../config'

interface IProps {
    collapsedFn: () => void
}

const { Header } = Layout

export default function HeaderPage(props: IProps): JSX.Element {

    const [full, setFull] = useState(false)
    const context = useContext(ComponentContext)
    let timer: any;

    const toggleFull = async () => {
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen()
            setFull(true)
        } else {
            if (document.exitFullscreen) {
                setFull(false)
                await document.exitFullscreen()
            }
        }
        timer = setTimeout(() => {
            if (context.setClientHeight) {
                context.setClientHeight(clientHeight())
                console.log(clientHeight())
            }
        }, 100)

    }

    useEffect(() => {
        return () => {
            clearTimeout(timer)
        }
    }, [timer])

    return <Header className={styles["site-layout-background"]}>
        {createElement(MenuUnfoldOutlined, {
            className: 'trigger',
            onClick: () => props.collapsedFn()
        })}
        <div className={styles['right-content']}>
            <div className={styles.full} onClick={toggleFull}>
                {full ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            </div>
            <AvatarDropdown />
        </div>
    </Header>
}
