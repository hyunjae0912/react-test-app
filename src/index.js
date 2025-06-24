import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createContext } from 'react';
import store from './store/store';
import { Provider } from 'react-redux';
import { login } from './store/memberSlice';

// Router: URL 주소에따라 화면을 전환하는 기능

// context 생성
// 여러 컴포넌트에서 값을 공유할 떄 사용
// store, slice 여러 컴포넌트에서 상태를 공유할 떄 사용
export const Context = createContext();

// aws 서버 주소로 변경함
const host = 'http://43.201.66.76:8080';

const dispatch = store.dispatch;

// 화면이 새로고침 되었을 때 로그인 상태 유지하기
const user = localStorage.getItem('user');
const token = localStorage.getItem('token');


if(user != null){
  const userObj = JSON.parse(user);
  dispatch(login( { token: token, user:user } ));
  console.log(userObj);
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{ host }}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Context.Provider>
);