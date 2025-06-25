import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createContext } from 'react';
import store from './store/store';
import { Provider } from 'react-redux';
import { login } from './store/memberSlice';

export const Context = createContext()

let host = null;

if(window.location.hostname === 'localhost'){
    host = 'http://localhost:8080'
} else {
    // AWS주소를 직접 사용하면 프로토콜 문제로 호출 안됨
    // 따라서 /api로 우회(프록시)할 것!
    // 프록시란? 가짜 요청을 보내고 다시 실제 요청으로 변경
    // host = 'http://aws주소:8080' X
    host = '/api' // O
}

console.log('현재 api 주소: ', host)

const dispatch = store.dispatch

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')

if(user != null){
    const userObj = JSON.parse(user)
    dispatch(login( { token: token, user: userObj } ))
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={ { host } }>
        <Provider store={store}>
        <BrowserRouter>
        <App />
        </BrowserRouter>
        </Provider>
    </Context.Provider>
);