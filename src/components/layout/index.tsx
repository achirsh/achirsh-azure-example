import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { BASE_NAME } from '../../config'
import { routes } from '../../config/routes'

export default function AppRouter() {

    return (
        <Router basename={BASE_NAME}>
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
        </Router>

    )
}


