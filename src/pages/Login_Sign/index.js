import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import { Button } from 'antd';
import Login from '../Login';
import Sign from '../Sign';
import Welcome from '../Welcome';

function LoginSign() {
    return (
        <Router>
            <div>
                <Button>
                    <Link to="/sign">注册</Link>
                </Button>
                <Button>
                    <Link to="/login">登录</Link>
                </Button>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/sign">
                        <Sign />
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
