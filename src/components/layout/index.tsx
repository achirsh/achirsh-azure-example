import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { BASE_NAME } from '../../config'
import { routes } from '../../config/routes'
import { Layout } from 'antd'
import styles from './layout.module.scss'
import { useContext, useRef, useEffect } from 'react'
import { ComponentContext, MenuPage, HeaderPage } from '..'

const { Content } = Layout

export default function AppRouter() {
    const childRef: any = useRef()

    const context = useContext(ComponentContext)

    const collapsedFn = () => {
        childRef.current.changeCollapsed()
    }

    return (
        <Layout>
            <Router basename={BASE_NAME}>
                <MenuPage ref={childRef} />
                <Layout className={styles["site-layout"]}>
                    <HeaderPage collapsedFn={collapsedFn} />
                    <Content
                        className={styles["site-layout-background"]}
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            height: (context.clientHeight || 112) - 112
                        }}
                    >
                        <Switch>
                            {routes.map(item => {
                                return (
                                    <Route
                                        key={item.path}
                                        exact
                                        path={item.path}
                                        component={item.component}
                                    />
                                )
                            })}
                        </Switch>
                    </Content>
                </Layout>
            </Router>
        </Layout>

    )
}


