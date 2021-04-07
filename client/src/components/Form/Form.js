import React, { useState , useEffect} from 'react';
import useStyles from './Styles';
import { TextField, Button, Paper, Typography } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentID, setCurrentID }) => {
	const [postData, setPostData] = useState({
		title: '',
		message: '',
		tags: '',
		selectedFiles: '',
	});
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem('profile'));

	const post = useSelector((state) =>
		currentID ? state.posts.find((p) => p._id === currentID) : null
	);
	useEffect(() => {
		if (post)
			setPostData(post);
	}, [post])
	const handleSubmit = (e) => {
		e.preventDefault();

		if (currentID) {
			dispatch(
				updatePost(currentID, { ...postData, name: user?.result?.name })
			);
			console.log('submit');
		} else {
			dispatch(createPost({ ...postData, name:user?.result?.name }));
		}
		clear();
	};
	const clear = () => {
		setCurrentID(null);
		setPostData({
			title: '',
			message: '',
			tags: '',
			selectedFiles: '',
		});
	};

	if (!user?.result?.name)
	{
		return (
			<Paper className={classes.paper}>
				<Typography variant="h6" align="center">
					Please sign in to create your own memories and like other's memories.
				</Typography>
			</Paper>
		)
		}
	return (
		<Paper className={classes.paper}>
			<form
				autoComplete='off'
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}
			>
				<Typography variant='h6'>
					{currentID ? 'Editing' : 'Creating'} a Memory
				</Typography>
				{/* <TextField
					className={classes.textfield}
					name='creator'
					variant='outlined'
					label='Creator'
					fullWidth
					value={postData.creator}
					onChange={(e) =>
						setPostData({ ...postData, creator: e.target.value })
					}
				></TextField> */}
				<TextField
					className={classes.textfield}
					name='title'
					variant='outlined'
					label='Title'
					fullWidth
					value={postData.title}
					onChange={(e) => setPostData({ ...postData, title: e.target.value })}
				></TextField>
				<TextField
					className={classes.textfield}
					name='message'
					variant='outlined'
					label='Message'
					fullWidth
					value={postData.message}
					onChange={(e) =>
						setPostData({ ...postData, message: e.target.value })
					}
				></TextField>
				<TextField
					className={classes.textfield}
					name='tags'
					variant='outlined'
					label='Tags'
					fullWidth
					value={postData.tags}
					onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
				></TextField>
				<div className={classes.fileInput}>
					<FileBase
						type='file'
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFiles: base64 })
						}
					/>
				</div>
				<Button
					className={classes.buttonSubmit}
					variant='contained'
					color='primary'
					size='large'
					type='submit'
					fullWidth
				>
					Submit
				</Button>
				<Button
					variant='contained'
					color='secondary'
					size='small'
					onClick={clear}
					fullWidth
				>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
