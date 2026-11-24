import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import styled from "styled-components";
import { authAtom } from "../stores/auth";

export default function Layout() {
    const [auth, setAuth]  = useAtom(authAtom);
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth(RESET);
        navigate("/", { replace: true });
    };

    return (
        <>
        <Header>
            <Inner>
                <Brand>
                  <Logo to="/posts">
                    PLAY SOPT <strong>BOARD</strong>
                  </Logo>
                  {auth && <PartBadge>{auth.part} 파트</PartBadge>}
                </Brand>
                <Nav>
                    <MenuLink to="/posts" end>
                      게시글 목록
                    </MenuLink>
                    <MenuLink to="/posts/new">글쓰기</MenuLink>
                    {auth ? (
                       <LogoutButton type="button" onClick={handleLogout}>
                           로그아웃
                       </LogoutButton>
                    ) : (
                        <MenuLink to="/">코드 발급</MenuLink>
                    )}
                </Nav>
            </Inner>
        </Header>
        <Main>
            <Outlet />
        </Main>
        </> 
    );
}

const Header = styled.header`
    position: sticky;
    top: 0;
    z-index: 10;
    background: ${({ theme }) => theme.color.background};
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
    `;

const Inner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: ${({ theme }) => theme.layout.maxWidth};
    margin: 0 auto;
    padding: 16px 20px;
`;

const Brand = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Logo = styled(Link)`
    font-size: 20px;
    font-weight: 800;

    strong {
      color: ${({ theme }) => theme.color.primary};
    }
`;

const PartBadge = styled.span`
    padding: 4px 10px;
    border: 1px solid ${({ theme }) => theme.color.primary};
    border-radius: 999px;
    color: ${({ theme }) => theme.color.primary};
    font-size: 12px;
    font-weight: 600;
`;

const Nav = styled.nav`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const MenuLink = styled(NavLink)`
    color: ${({ theme }) => theme.color.textSub};
    font-size: 15px;
    transition: color ${({ theme }) => theme.transition};

    &:hover,
    &.active {
      color: ${({ theme }) => theme.color.primary};
    }
`;

const LogoutButton = styled.button`
    color: ${({ theme }) => theme.color.textSub};
    font-size: 15px;
    transition: color ${({ theme }) => theme.transition};
`;

const Main = styled.main`
    max-width: ${({ theme }) => theme.layout.maxWidth};
    margin: 0 auto;
    padding: 32px 20px;
`;