import { AppBar, Toolbar, IconButton, Typography, Box, MenuItem, Button, Divider, ListItemIcon, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import { useTranslation } from "react-i18next";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Logout, Person, Settings } from "@mui/icons-material";
import session from "../app/Session";
import logo from "../img/ntfy.svg";
import subscriptionManager from "../app/SubscriptionManager";
import routes from "./routes";
import db from "../app/db";
import { topicDisplayName } from "../app/utils";
import Navigation from "./Navigation";
import accountApi from "../app/AccountApi";
import PopupMenu from "./PopupMenu";
import { SubscriptionPopup } from "./SubscriptionPopup";
import { useIsLaunchedPWA } from "./hooks";

const ActionBar = (props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const location = useLocation();
  const isLaunchedPWA = useIsLaunchedPWA();

  let title = "ntfy";
  if (props.selected) {
    title = topicDisplayName(props.selected);
  } else if (location.pathname === routes.settings) {
    title = t("action_bar_settings");
  } else if (location.pathname === routes.account) {
    title = t("action_bar_account");
  }

  const getActionBarBackground = () => {
    if (isLaunchedPWA) {
      return "#317f6f";
    }

    switch (theme.palette.mode) {
      case "dark":
        return `linear-gradient(150deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.primary.main} 100%)`;

      case "light":
      default:
        return "linear-gradient(150deg, #338574 0%, #56bda8 100%)";
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        zIndex: { sm: 1250 }, // > Navigation (1200), but < Dialog (1300)
        ml: { sm: `${Navigation.width}px` },
      }}
    >
      <Toolbar
        sx={{
          pr: "24px",
          // background: getActionBarBackground(),
        }}
      >
        <IconButton
          color="inherit"
          edge="start"
          aria-label={t("action_bar_show_menu")}
          onClick={props.onMobileDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          component="img"
          src={logo}
          alt={t("action_bar_logo_alt")}
          sx={{
            display: { xs: "none", sm: "block" },
            marginRight: "10px",
            height: "28px",
          }}
        />
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {props.selected && <SettingsIcons subscription={props.selected} onUnsubscribe={props.onUnsubscribe} />}
        <ProfileIcon />
      </Toolbar>
    </AppBar>
  );
};

const SettingsIcons = (props) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const { subscription } = props;

  const handleToggleMute = async () => {
    const mutedUntil = subscription.mutedUntil ? 0 : 1; // Make this a timestamp in the future
    await subscriptionManager.setMutedUntil(subscription.id, mutedUntil);
  };

  return (
    <>
      <IconButton color="inherit" size="large" edge="end" onClick={handleToggleMute} aria-label={t("action_bar_toggle_mute")}>
        {subscription.mutedUntil ? <NotificationsOffIcon /> : <NotificationsIcon />}
      </IconButton>
      <IconButton
        color="inherit"
        size="large"
        edge="end"
        onClick={(ev) => setAnchorEl(ev.currentTarget)}
        aria-label={t("action_bar_toggle_action_menu")}
      >
        <MoreVertIcon />
      </IconButton>
      <SubscriptionPopup subscription={subscription} anchor={anchorEl} placement="right" onClose={() => setAnchorEl(null)} />
    </>
  );
};

const ProfileIcon = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await accountApi.logout();
      await db().delete();
    } finally {
      await session.resetAndRedirect(routes.app);
    }
  };

  return (
    <>
      {session.exists() && (
        <IconButton color="inherit" size="large" edge="end" onClick={handleClick} aria-label={t("action_bar_profile_title")}>
          <AccountCircleIcon />
        </IconButton>
      )}
      {!session.exists() && config.enable_login && (
        <Button color="inherit" variant="text" onClick={() => navigate(routes.login)} sx={{ m: 1 }} aria-label={t("action_bar_sign_in")}>
          {t("action_bar_sign_in")}
        </Button>
      )}
      {!session.exists() && config.enable_signup && (
        <Button color="inherit" variant="outlined" onClick={() => navigate(routes.signup)} aria-label={t("action_bar_sign_up")}>
          {t("action_bar_sign_up")}
        </Button>
      )}
      <PopupMenu horizontal="right" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => navigate(routes.account)}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <b>{session.username()}</b>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate(routes.settings)}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          {t("action_bar_profile_settings")}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t("action_bar_profile_logout")}
        </MenuItem>
      </PopupMenu>
    </>
  );
};

export default ActionBar;
