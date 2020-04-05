import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useUser } from '../../contexts/user';
import Button from '../Button';

const NavbarContainer = styled.div`
  display: grid;
  grid-template-columns: auto 320px;
  padding: 12px 24px;
`;

const Logo = styled.div`
  width: 50px;
  height: 50px;
`;
const Menu = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 120px;
  align-items: center;
  box-sizing: border-box;
`;

const Username = styled.span``;
const ProfileBtn = styled.a``;

const Navbar = () => {
  const { user, signOut } = useUser();
  return (
    <NavbarContainer>
      <Link href="/">
        <Logo>busco.DEV</Logo>
      </Link>
      {user && (
        <Menu>
          <Username>Hola {user.name}!</Username>
          <Link href="/profile">
            <ProfileBtn>Mi perfil</ProfileBtn>
          </Link>
          <Button type="button" onClick={signOut}>
            Cerrar sesión
          </Button>
        </Menu>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
