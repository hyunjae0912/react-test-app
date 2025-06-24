// src/store/memberSlice.js

import { createSlice } from "@reduxjs/toolkit";

const init = {
    token: null,
    info: null
};

export const memberSlice = createSlice({
    name: 'memberSlice',
    initialState: init,
    reducers: {
    login: (state, action) => {
        state.token = action.payload.token;
        state.info = action.payload.user;
        // 로컬 스토리지에도 로그인 데이터를 저장
        localStorage.setItem('token', action.payload.token);
        // user는 object로 이렇게 저장하지 못한다.
        // object -> json string로 변환
        localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state, action) => {
        state.token = null;
        state.info = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
    }
});

export const { login, logout } = memberSlice.actions;

export default memberSlice.reducer;
