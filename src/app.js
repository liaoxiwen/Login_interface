import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import { Button } from 'antd';
import Login from './pages/Login';
import Sign from './pages/Sign';
import Welcome from './pages/Welcome';
import './app.css';

function LoginSign() {
    return (
        <Router>
            <div className="header">
                <span>
                    <Link to="/sign">注册</Link>
                </span>
                <span>
                    <Link to="/login">登录</Link>
                </span>
            </div>
            <div className="body">
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
