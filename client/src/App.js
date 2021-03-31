import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import memories from './images/memories.png';
import useStyles from './styles';

function App() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [currentID, setCurrentID] = useState(null);

	useEffect(() => {
		dispatch(getPosts());
	}, [currentID, dispatch]);

	return (
		<Container maxwidth='lg'>
			<AppBar className={classes.appBar} position='static' color='inherit'>
				<Typography variant='h2' align='center'>
					Memories
				</Typography>
				<img
					className={classes.image}
					src={memories}
					alt='memories'
					height='60'
				></img>
			</AppBar>
			<Grow in>
				<Container>
					<Grid
						container
						className={classes.mainContainer}
						justify='space-between'
						alignItems='stretch'
						spacing={3}
					>
						<Grid item xs={12} sm={7}>
							<Posts setCurrentID={setCurrentID} />
						</Grid>
						<Grid item xs={12} sm={4}>
							<Form currentID={currentID} setCurrentID={setCurrentID} />
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);
}

export default App;
