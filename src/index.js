import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createContext } from 'react';
import store from './store/store';
import { Provider } from 'react-redux';
import { login } from './store/memberSlice';

export const Context = createContext()

let host = null;

// 현재 react app을 실행시키는 컴퓨터의 이름 확인
// 내 개발 컴퓨터: localhost
console.log(window.location.hostname)

if(window.location.hostname === 'localhost'){
  host = 'http://localhost:8080'
} else {
  // aws 주소를 직접 사용하면 프로토콜 문제로 호출 안됨 따라서 우회를 해야함
  host = '/api'
}

console.log("지금 api 주소 : " , host)

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