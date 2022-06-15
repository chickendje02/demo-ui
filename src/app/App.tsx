import React, {lazy, Suspense} from 'react';
import './app.scss';
import {Redirect, Route, Switch} from 'react-router-dom';
import {withRouter} from 'react-router';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CONSTANT} from '../common/constants/CommonConst';
import Spinner from './shared/spinner/spinner';
import 'react-datepicker/dist/react-datepicker.css';
import NotFound from './notfound/NotFound';

const Product = withRouter(lazy(() => import('./product/product.component')));

const App = () => {
    return (
        <>
            <main>
                <Suspense fallback={<Spinner/>}>
                    <Switch>
                        <Redirect from='/' exact to='/product'/>
                        <Route exact path='/product' component={Product}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </Suspense>
            </main>
            <ToastContainer
                position='top-right'
                autoClose={CONSTANT.TOAST_TIMEOUT}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default App;
