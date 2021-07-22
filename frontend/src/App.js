import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CollectionsIcon from '@material-ui/icons/Collections';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import GpsNotFixedIcon from '@material-ui/icons/GpsNotFixed';
import PublicIcon from '@material-ui/icons/Public';
import NoteIcon from '@material-ui/icons/Note';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ReplyIcon from '@material-ui/icons/Reply';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function App() {
  const classes = useStyles();

  const [data, setData] = useState(null);
  useEffect(() => {
    async function f(){
      await fetch("http://localhost:3001/api")
        .then((res) => res.json())
        .then((data) => setData(data));
    }
    f()
  }, []);

  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const [postOpen, setPostOpen] = React.useState(false);
  const handlePostOpen = () => {
    setPostOpen(true);
  };
  const handlePostClose = () => {
    setPostOpen(false);
  };
  const post = () => {

    setPostOpen(false);
  };

  const [replyOpen, setReplyOpen] = useState({});
  const handleReplyOpen = (n) => {
    setReplyOpen({...replyOpen, [n]: true});
  };
  const handleReplyClose = (n) => {
    setReplyOpen({...replyOpen, [n]: false});
  };
  const reply = () => {
    //TODO
  };

  return (
    <div className={classes.root}>
      {/* TOP BAR */}
      <AppBar position="absolute" className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, drawerOpen && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            4ch
          </Typography>
          <IconButton color="inherit" onClick={handlePostOpen}>
            <Badge color="secondary">
              <AddCircleIcon />
            </Badge>
          </IconButton>
          {/* POST DIALOG */}
          <Dialog open={postOpen} onClose={handlePostClose}>
            <DialogTitle>Post</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Create a text post below. Ensure you read the rules of before posting.
              </DialogContentText>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Board</InputLabel>
                <Select
                  //value={board}
                  //onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Random</MenuItem>
                  <MenuItem value={2}>Video Games</MenuItem>
                  <MenuItem value={3}>Anime</MenuItem>
                  <MenuItem value={4}>Music</MenuItem>
                  <MenuItem value={5}>Fitness</MenuItem>
                  <MenuItem value={6}>Weapons</MenuItem>
                  <MenuItem value={7}>Science</MenuItem>
                  <MenuItem value={8}>News</MenuItem>
                </Select>
                <FormHelperText>Select which board you want to post to</FormHelperText>
              </FormControl>
              <TextField autoFocus label="Enter your post content here" fullWidth />
            </DialogContent>
            <DialogActions>
              <Button onClick={handlePostClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handlePostClose} color="primary">
                Post
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
      {/* LEFT DRAWER */}
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
        }}
        open={drawerOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            <ListItem button>
              <ListItemIcon>
                <CollectionsIcon />
              </ListItemIcon>
              <ListItemText primary="Random" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DesktopWindowsIcon />
              </ListItemIcon>
              <ListItemText primary="Video Games" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <FontDownloadIcon />
              </ListItemIcon>
              <ListItemText primary="Anime" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <MusicNoteIcon />
              </ListItemIcon>
              <ListItemText primary="Music" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <FitnessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Fitness" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <GpsNotFixedIcon />
              </ListItemIcon>
              <ListItemText primary="Weapons" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PublicIcon />
              </ListItemIcon>
              <ListItemText primary="Science" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <NoteIcon />
              </ListItemIcon>
              <ListItemText primary="News" />
            </ListItem>
          </div>
        </List>
        <Divider />
      </Drawer>
      {/* BODY */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {data && data.map((p) => (
            <Paper className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={10}>
                  <Typography>{p.content}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                  <IconButton size={'small'} onClick={handleReplyOpen}>
                    <ReplyIcon />
                  </IconButton>
                  <Dialog onClose={()=>handleReplyClose(p.id)} open={replyOpen[p.id]}>
                    <DialogTitle>Reply</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        {p.content}
                      </DialogContentText>
                      <TextField autoFocus label="Enter your reply here" fullWidth />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleReplyClose(p.id)} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleReplyClose(p.id)} color="primary">
                        Reply
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
            </Paper>
          ))}
          <Box pt={4}>
            <Typography variant="body2" color="textSecondary" align="center">
              {'Copyright © '}
              <Link color="inherit" href="https://github.com/pham-andrew">
                Andrew Pham
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </Container>
      </main>
    </div>
  );
}