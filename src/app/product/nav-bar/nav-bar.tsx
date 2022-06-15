import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import './nav-bar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faBriefcase, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {PermissionEnum} from "../../../common/enums/PermissionEnum";
import Permission from "../../shared/Permission";

const NavBar = (props: any) => {
    const match = useRouteMatch();

    return (
        <nav className='column left-menu'>
            <ul className='menu-list'>
                <NavLink to={`${match.url}/entries`} activeClassName='active-link'>
                    Entries
                </NavLink>
                <Permission hasAnyPermission={PermissionEnum.LOCALIZATION_TOOL_WRITE.value}>
                    <NavLink to={`${match.url}/import`} activeClassName='active-link'>
                        Import
                    </NavLink>
                </Permission>
                <NavLink to={`${match.url}/languages`} activeClassName='active-link'>
                    Languages
                </NavLink>
                <NavLink to={`${match.url}/categories`} activeClassName='active-link'>
                    Categories
                </NavLink>
                <NavLink to={`${match.url}/activity-log`} activeClassName='active-link'>
                    Activity Log
                </NavLink>
            </ul>
            {props.children}
        </nav>
    );
};


export default NavBar;
