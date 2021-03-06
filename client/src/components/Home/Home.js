import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import useStyles from './styles';

const Home = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [currentID, setCurrentID] = useState(null);

	useEffect(() => {
		dispatch(getPosts());
	}, [currentID, dispatch]);
	return (
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
	);
};

export default Home;
