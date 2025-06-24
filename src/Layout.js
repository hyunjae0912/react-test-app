import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'


// styled component를 사용해서 css 쓰기

// styled component로 div 태그 생성
const LayoutDiv = styled.div`
    background-color: #e9ecef;
`;

const Layout = () => {
    return (
        <LayoutDiv>
            <Header></Header>
            <Outlet></Outlet>
        </LayoutDiv>
    )
}

export default Layout