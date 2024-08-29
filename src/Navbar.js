import * as React from "react";
import PropTypes from "prop-types";
import IconButton from '@mui/material/IconButton';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";
import AdbIcon from '@mui/icons-material/Adb';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import Collapse from '@mui/material/Collapse';

const pages = ['Home', 'Skills', 'Experiences', 'Projects', 'Contact '];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function HideOnScroll(props) {
  const { children, window } = props;

  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <>
    <Slide appear={false} direction={"down" || "up"} in={!trigger}>
      {children}
    </Slide>
  </>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export function ResponsiveAppBar(props) {
  const { lenis } = props;
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (event, targetId) => {
    event.preventDefault();
    const anchor = document.querySelector(`#${targetId}`);
    if (anchor) {
      lenis.scrollTo(anchor);
      anchor.scrollIntoView({
        block: 'center',
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', boxShadow: 'none' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                sx={{ display: { xs: 'flex', md: 'none' }, color: 'white', mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row', alignItems: 'center' }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={(event) => handleNavClick(event, page.replace(/\s+/g, ''))}
                    sx={{ color: 'white', display: 'block', mx: 1 }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </Box>
            <Avatar alt="Profile" src={`${process.env.PUBLIC_URL}/profile/profile_pic.jpg`} />
          </Toolbar>
          <Collapse in={mobileMenuOpen} timeout="auto" unmountOnExit>
            <Box 
              sx={{ 
                display: { xs: 'flex', md: 'none' }, 
                flexDirection: 'column', 
                alignItems: 'center', 
                width: '100%',
                pb: 2
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={(event) => handleNavClick(event, page.replace(/\s+/g, ''))}
                  sx={{ 
                    color: 'white', 
                    display: 'block', 
                    my: 1,
                    width: '100%', 
                    textAlign: 'center' 
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Collapse>
        </Container>
      </AppBar>
      <ScrollTop lenis={lenis} {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
function ScrollTop(props) {
  const lenis = props.lenis
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#Home',
    );

    if (anchor) {
      console.log("scrolling to top")
      lenis.scrollTo(anchor);
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}
