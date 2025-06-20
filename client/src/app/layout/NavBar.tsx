import { Group } from "@mui/icons-material";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Container,
    MenuItem,
} from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";

export default function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <MenuItem
                                component={NavLink}
                                to="/"
                                sx={{ display: "flex", gap: 2 }}
                            >
                                <Group fontSize="large" />
                                <Typography variant="h4" fontWeight="bold">
                                    Activity App
                                </Typography>
                            </MenuItem>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <MenuItemLink to="/activities">
                                Activities
                            </MenuItemLink>
                            <MenuItemLink to="/create-activity">
                                Create Activity
                            </MenuItemLink>
                        </Box>
                        <MenuItem>User menu</MenuItem>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}
