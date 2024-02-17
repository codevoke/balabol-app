import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, List, ListItemButton, Divider, Popover } from "@mui/material";
import { red } from '@mui/material/colors';
import { Data } from "../../App";
import './Header.css';

// Header component
export default function Header() {
    return (
        <div className="HeaderBox">
            <div className="LogoBox">
                <Typography variant="h5">Balabol</Typography>
            </div>
            <AuthenticationBox />
        </div>
    )
}

// Component for handling Authentication Box
function AuthenticationBox() {
    const { user } = useContext(Data);
    const navigate = useNavigate();
    return (
        <>
            { user["auth"] === true ?
                <div className="right-part">
                    <Button variant="contained" onClick={ ()=>{navigate('/new/post')} }>Создать пост</Button>
                    <UserAccountButton />
                </div>
                :
                <div className="AuthButtonsWrapper">
                    <NavigationButton variant="contained" src="/sign-in" label="Вход" />
                    <NavigationButton variant="outlined" src="/sign-up" label="Регистрация" />
                </div>
            }
        </>
    )
}

// Component for handling User Account Button
function UserAccountButton() {
    const { user } = useContext(Data);
    const username = user["username"];
    
    const [isPopOver, setIsPopOver] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const closeMenu = () => { setIsPopOver(false) };

    return (
        <>
            <div className="AccountButtonWrapper"
                onClick={(event) => { 
                    setAnchorEl(event.currentTarget); 
                    setIsPopOver(true); // show popover
                }}
            >
                <Typography variant="h6">{ username }</Typography>
            </div>
            <Popover
                open={isPopOver}
                anchorEl={anchorEl}
                onClose={closeMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <UserAccountMenu onClose={closeMenu} />
            </Popover>
        </>
    )
}

function UserAccountMenu({ onClose }) {
    const navigate = useNavigate();

    const redirect = (url) => {
        navigate(url);
        onClose();
    }

    const MenuItem = ({ url, text, warning = false }) => {
        return (
            <ListItemButton 
                sx={warning ? { color: red[500] } : {}}
                onClick={() => { redirect(url) }}
            >
                {text}
            </ListItemButton>
        )
    }

    return (
        <List sx={{ width: 200 }}>
            <MenuItem url="/me" text="Моя страницаЪ" />
            <MenuItem url="/settings" text="Настройки" />
            <Divider />
            <MenuItem url="/logout" text="Выйти" warning />
        </List>
    )
}

// Component for handling Navigation Button
function NavigationButton(props) {
    const navigate = useNavigate();
    const { variant, src, label } = props;

    return (
        <Button
            sx={{ margin: '0 5px' }}
            variant={variant} 
            onClick={() => navigate(src)}
        >
            {label}
        </Button>
    )
}