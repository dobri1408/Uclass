import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';



export default function Students(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);



  return (
    <div style={{marginLeft: "auto"}}>
        <IconButton  onClick={handleClickOpen('paper')}>
            <ExpandMoreIcon style={{color: 'white'}}/>
        </IconButton>
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            style={{borderRadius: 30}}
            PaperProps={{
              style: {
                backgroundColor: 'transparent',
                boxShadow: 'none',
              },
            }}
        >
            <DialogTitle id="scroll-dialog-title" style={{backgroundColor: '#2A333A', color: 'red'}}>
              <Typography style={{color: 'white', fontSize: 20, fontWeight: 600}}>
                Enrolled students ({props.students.length})
              </Typography>
            </DialogTitle>
            <DialogContent dividers={scroll === 'paper'} style={{backgroundColor: '#345F65'}}>

            <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
            >
                {['aas','ssd'].map((element, index) => 
                    <>
                      {/* <h4 style={{minWidth: 300}}>{index+1}. {element}</h4> */}
                      <Typography style={{color: 'white', fontSize: 25, fontWeight: 600, minWidth: 300}}>{index+1}. {element}</Typography>
                    </>
                )}
            </DialogContentText>

            </DialogContent>
            <DialogActions style={{backgroundColor: '#345F65'}}>
              <Button variant="contained" color="secondary" style={{backgroundColor: '#D99152'}} onClick={handleClose}>
                <Typography style={{color: 'white', fontSize: 15, fontWeight: 600}}>
                  Done
                </Typography>
              </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}