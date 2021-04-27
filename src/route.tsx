import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Main from './pages/main'
import CrateVote from './pages/create_vote';
import Layout from './common/layout';
import Login from './pages/login';
export default function RouterSwitch() {

    return (
        <Layout>
            <BrowserRouter> 
                <Switch>
                    <Route exact path='/' component={Main} />
                    <Route exact path='/create' component={CrateVote} />
                    <Route exact path='/login' component={Login} />
                </Switch>
            </BrowserRouter>
        </Layout>
    )

}