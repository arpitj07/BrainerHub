import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import jwt from 'jwt-decode';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import './Navbar.styles.css';
const drawerWidth = 100;

interface userDetail {
	name: string;
	email: string;
}
interface jwtType extends userDetail {
	iat: number;
	exp: number;
}

export const NavBarComp = () => {
	const [ userdetail, setuser ] = useState<userDetail>({
		email: '',
		name: ''
	});
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	useEffect(() => {
		if (token) {
			const user: jwtType = jwt(token);
			console.log(user);
			if (!user) {
				localStorage.removeItem('token');
				window.location.href = '/';
			} else {
				setuser({
					...userdetail,
					name: user.name
				});
			}
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('token');
		setuser({
			email: '',
			name: ''
		});
		window.location.reload();
		setTimeout(() => {
			navigate('/login');
		}, 500);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar
				color="transparent"
				elevation={0}
				position="sticky"
				sx={{
					width: '100%',

					boxShadow: 'rgba(0,0,0,0.2) 0px 5px 15px'
				}}
			>
				<Toolbar>
					<div className="NavContainer">
						<h2 style={{ fontWeight: 'bold' }}>Product APP</h2>
						<div className="actionbuttons">
							{token ? (
								<React.Fragment>
									<Typography
										variant="body1"
										sx={{ marginLeft: '20px', marginRight: '20px', fontWeight: 'bold' }}
									>
										{userdetail.name}
									</Typography>
									<Button sx={{ color: 'black' }} onClick={handleLogout}>
										<LogoutIcon />
									</Button>
								</React.Fragment>
							) : (
								<div className="buttoncontainer">
									<button onClick={() => (window.location.href = '/')}>Home</button>
									<button onClick={() => (window.location.href = '/register')}>Sign Up</button>
									<button onClick={() => (window.location.href = '/login')}>Login</button>
								</div>
							)}
						</div>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
