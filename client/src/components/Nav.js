import React from 'react';
import {Navbar, NavItem, Icon } from 'react-materialize';

const Nav = (props) => {
    const {brand} = props;
    return (
        <Navbar className="blue-grey darken-1" brand={brand} right>
            <NavItem href="/"><Icon>refresh</Icon></NavItem>
        </Navbar>
    );
};

export default Nav;