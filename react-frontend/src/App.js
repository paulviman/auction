import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListProductComponent from "./components/ListProductComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import AddProduct from "./components/AddProduct";
import SingInComponent from "./components/SingInComponent";
import FirstPageListComponent from "./components/FirstPageListComponent";
import SignUpComponent from "./components/SignUpComponent";
import UpdateProduct from "./components/UpdateProduct";
import ViewProduct from './components/ViewProduct';
import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';

function ProtectedRoute({children, ...rest}) {
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/signin');
        }
    }, [history]);

    return (
        <Route {...rest}>
            {children}
        </Route>
    );
};

function App() {
    return (
        <div>
            <Router>
                <HeaderComponent/>
                <div className="container">
                    <Switch>
                        <Route path='/' exact component={FirstPageListComponent}></Route>
                        <Route path='/list' component={FirstPageListComponent}></Route>
                        <Route path='/signin' component={SingInComponent}></Route>
                        <Route path='/signup' component={SignUpComponent}></Route>
                        <ProtectedRoute>
                            <Route path='/products' component={ListProductComponent}></Route>
                            <Route path='/add-product' component={AddProduct}></Route>
                            <Route path='/view-product/:id' component={ViewProduct}></Route>
                            <Route path='/update-product/:id' component={UpdateProduct}></Route>
                        </ProtectedRoute>


                        <FirstPageListComponent/>

                    </Switch>
                </div>
                <FooterComponent/>
            </Router>
        </div>
    );
}

// function RequireAuth({children, redirectTo}) {
//     let isAuthenticated = getAuth();
//     return isAuthenticated ? children : <Redirect to={redirectTo}>
//         }

export default App;
