import React, { useState, useEffect, useCallback, useMemo }  from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import {Hr} from '../myloaComponents';
import Collapse from 'react-bootstrap/Collapse';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const navMenus = [
    {
        title: '거래소',
        subMenus: [
            { name: '실시간 거래소', content: 'marketCategary'},
            { name: '거래소 시세 기록', content: 'marketHistory'},
            { name: '거래소 검색', content: 'marketSearch'}
        ]
    },
    {
        title: '손익 계산',
        subMenus: [
            { name: '레이드 보상 더보기', content: 'raidreward'},
        ]
    },
    {
        title: '랭킹',
        subMenus: [
            { name: '길드 랭킹', content: 'guildranking'},
        ]
    },
];

function NavHeader(props) {

    useEffect(() => {
        return () => {
        }
    },);

    const contentMenuList = useMemo(() => {
        let dropdownList = navMenus.map((mainMeun, mainMenuIdx) => {
            let subMenuList = mainMeun.subMenus.map((subMenu, subMenuIdx) => {
                return (
                    <Dropdown.Item key={subMenuIdx} href="#mainContent" onClick={() => { props.moveContent(subMenu.content); props.onClickNavClose(); }}>
                        {subMenu.name}
                    </Dropdown.Item>
                )
            });
    
            return (
                <ListGroup.Item as="li" className="nav-item col-12 col-lg-auto" key={mainMenuIdx}>
                    <DropdownButton id="dropdown-basic-button" variant="dark" menuVariant="dark" title={mainMeun.title}>
                        {subMenuList}
                    </DropdownButton>
                </ListGroup.Item>
            );
        })
    
        return (
            <ListGroup as="ul" bsPrefix="null" className="navbar-nav flex-row flex-wrap bd-navbar-nav">
                {dropdownList}
            </ListGroup>
        );
    }, [props.moveContent, props.onClickNavClose]);

    const defaultMenuList = useMemo(() => {
        return (
            <ListGroup as="ul" bsPrefix="null" className="navbar-nav flex-row flex-wrap ms-md-auto">
                <ListGroup.Item as="li" className="nav-item col-12 col-lg-auto">
                    <a className="nav-link py-2 px-0 px-lg-2" onClick={() => {props.moveContent("gameContent"); props.onClickNavClose(); }} href="#mainContent">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                            <title>메인 페이지</title>
                            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z" />
                        </svg>
                        <small className="d-lg-none ms-2">메인 페이지</small>
                    </a>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="nav-item col-12 col-lg-auto">
                    <a className="nav-link py-2 px-0 px-lg-2" href="https://dev715.tistory.com/2" target="_blank" rel="noopener" title="개발자 블로그">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-book" viewBox="0 0 16 16">
                            <title>개발자 블로그</title>
                            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                        </svg>
                        <small className="d-lg-none ms-2">개발자 블로그</small>
                    </a>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="nav-item col-12 col-lg-auto">
                    <div className="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
                    <Hr />
                </ListGroup.Item>
                <ListGroup.Item as="li" className="nav-item col-12 col-lg-auto">
                    <DropdownButton id="dropdown-basic-button" variant="dark" menuVariant="dark" title="도움말">
                    </DropdownButton>
                </ListGroup.Item>
            </ListGroup>
        );
    }, []);

    return (
        <Collapse in={props.navOpen} >
            <div className="offcanvas-lg offcanvas-end flex-grow-1 navbar-dark bg-dark" tabIndex="-1" id="bdNavbar">
                <div className="offcanvas-header px-4 pb-0">
                    <h5 className="offcanvas-title text-white" id="bdNavbarOffcanvasLabel">마이로아</h5>
                    <Button type="button" className="btn-close btn-close-white" bsPrefix="null" onClick={() => props.onClickNavToggle()}></Button>
                </div>
                <div className="offcanvas-body p-4 pt-0 p-lg-0">
                    <Hr />
                    {contentMenuList}
                    <Hr />
                    {defaultMenuList}
                </div>
            </div>
        </Collapse>
    );
    
}
  
  export default NavHeader;