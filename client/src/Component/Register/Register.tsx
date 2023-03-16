import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.styles.css';
import { Alert, CircularProgress } from '@mui/material';
// import { UserContext } from '../../App';

const Register = () => {
	const [ name, setname ] = useState('');
	const [ userPassword, setuserPassword ] = useState('');
	const [ email, setemail ] = useState('');
	// const { setlogin, setUserEmail, userEmail } = useContext(UserContext);
	const navigate = useNavigate();

	const [ alertStatus, setAlertStatus ] = useState(0);
	const [ message, setMessage ] = useState('');
	const [ loading, setLoading ] = useState(false);

	// Callback function handles user email
	const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setemail(e.target.value);
	};

	const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setname(e.target.value);
	};

	// Callback function handles user Password
	const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setuserPassword(e.target.value);
	};

	const handleSubmit = async (e: React.MouseEvent) => {
		e.preventDefault();
		setLoading(true);

		const resp = await fetch(`${process.env.REACT_APP_API}/api/register`, {
			method: 'POST',
			body: JSON.stringify({
				name,
				email,
				userPassword
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await resp.json();

		if (data.status === 'ok') {
			setLoading(false);
			setAlertStatus(1);
			setMessage(data.message);
			setTimeout(() => {
				navigate('/login');
			}, 500);
		} else if (data.status === 'error') {
			setLoading(false);
			setAlertStatus(2);
			setMessage(data.message);
		}
	};

	return (
		<div className="LoginWrapper">
			{loading ? (
				<CircularProgress />
			) : alertStatus !== 0 ? (
				<Alert
					onClose={() => {
						window.location.reload();
					}}
					variant="filled"
					severity={alertStatus === 1 ? 'success' : 'error'}
				>
					{message}
				</Alert>
			) : null}

			<div className="LoginContainer">
				<div className="userInput">
					<h3>Register</h3>
					<input type="text" value={name} onChange={handleName} placeholder="Name" />
					<input type="text" value={email} onChange={handleEmail} placeholder="email" />
					<input type="password" value={userPassword} onChange={handlePassword} placeholder="password" />
					<button onClick={(e) => handleSubmit(e)}>Submit</button>
				</div>
				<div className="others">
					<p>
						Already have an Account?<a href="/login"> Log in</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
