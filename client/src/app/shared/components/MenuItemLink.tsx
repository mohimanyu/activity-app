import { MenuItem } from "@mui/material";
import type { ReactNode } from "react";
import { NavLink } from "react-router";

type Props = {
    children: ReactNode;
    to: string;
};

export default function MenuItemLink({ children, to }: Props) {
    return (
        <MenuItem
            component={NavLink}
            to={to}
            sx={{
                fontSize: "1.2rem",
                textTransform: "uppercase",
                fontWeight: "bold",
                color: "inherit",
                "&.active": {
                    color: "yellow",
                },
            }}
        >
            {children}
        </MenuItem>
    );
}
