import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";

import styles from "./navbar.module.css";
import { useAppContext } from "../../../lib/context";
import Router from "next/router";
import { useCookies } from 'react-cookie'

const pages = [
  {
    title: "Teams",
    url: "/teams",
  },
  {
    title: "League Table",
    url: "leaguetable",
  },
  {
    title: "Scorechart",
    url: "scorechart",
  },
  {
    title: "Cleansheets",
    url: "cleansheets",
  },
];

const settings = ["Profile", "Sign Out"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'user']);
  const user = cookies.user;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    removeCookie('token')
    removeCookie('user')
    Router.reload()
  }

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Link href="/">
              <a className={styles.menuItem}>SC</a>
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            ></IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {user &&
                pages.map(({ title, url }) => (
                  <MenuItem key={title} onClick={handleCloseNavMenu}>
                    <Link href={url}>
                      <a>{title}</a>
                    </Link>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Link href="/">
              <a className={styles.menuItem}>SC</a>
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {user &&
              pages.map((page) => (
                <Button
                  key={page.title}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link href={page.url}>
                    <a className={styles.menuItem}>{page.title}</a>
                  </Link>
                </Button>
              ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user && (
              <Button
                onClick={handleLogOut}
                style={{ color: "white", textDecoration: "none" }}
                className="menuItem"
              >
                LOG OUT
              </Button>
            )}
            {user ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={`${user.charAt(0)}`}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <a
                style={{ color: "white", textDecoration: "none" }}
                className="menuItem"
                href="/signin"
              >
                SIGN IN
              </a>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
