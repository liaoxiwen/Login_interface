import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Login from './pages/Login';
import Sign from './pages/Sign';
import Welcome from './pages/Welcome';
import EditPwd from './pages/EditPwd';

function LoginSign() {
    return (
        <Router>
            <div className="body">
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/sign">
                        <Sign />
                    </Route>
                    <Route path="/editpwd">
                        <EditPwd />
                    </Route>
                    <Route exact path="/">
                        <Welcome />
                    </Route>
                </Switch>
            </div>

        </Router>
    )
}
export default LoginSign;
