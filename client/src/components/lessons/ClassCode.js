import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton'; 
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import {data} from '../../store/data'; 
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ClassCode(props) {
    const [copied, setCopied] = useState(false);
    const [open, setOpen] = useState(false);
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClickCopied = () => {
        setCopied(true);
    };

    const handleCloseCopied = (event, reason) => {
        if (reason === 'clickaway') {return}
        setCopied(false);
    };


    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return(
        <div>
            <Snackbar 
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                open={copied} 
                autoHideDuration={3000} 
                onClose={handleCloseCopied}
            >
                <Alert onClose={handleCloseCopied} severity="success">
                    <Typography style={{color: 'white', fontSize: '30', fontWeight: 600}}>
                        Class code copied to clipboard!
                    </Typography>
                </Alert>
            </Snackbar>


            <IconButton onClick={handleOpen}>
                <ConfirmationNumberIcon style={{color: 'white'}}/>
            </IconButton>



            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                style={{backgroundColor: 'transparent', boxShadow: 'none'}}
            >
                <Card style={{width: 500, backgroundColor: '#2A333A', boxShadow: 'none', borderRadius: 0}}>
                    <CardContent style={{backgroundColor: '#2A333A', borderRadius: 50}}>
                        <Typography style={{color: 'white', fontWeight: 600, textAlign: 'center', fontSize: 30, paddingBottom: 20}}>
                            The code for this class is:
                        </Typography>

                        <Card style={{backgroundColor: '#345f65'}}>
                            <CardContent style={{height: 90}}>
                                <Typography style={{color: '#d99152', fontWeight: 600, textAlign: 'center', fontSize: 40}}>
                                    {data.getState().meetingsData.filter(e=>e.className===props.className)[0].code}
                                </Typography>
                            </CardContent>
                        </Card>

                        <Button variant="contained" style={{marginTop: 20, minWidth: '100%', backgroundColor: '#024873'}} onClick={()=>{
                            // copyToClipboard(data.getState().meetingsData.filter(e=>e.className===props.className)[0].code);
                            navigator.clipboard.writeText(data.getState().meetingsData.filter(e=>e.className===props.className)[0].code);
                            handleClose();
                            handleClickCopied();
                            console.log(data.getState().meetingsData.filter(e=>e.className===props.className)[0].code)
                        }} type='submit'>
                            <Typography style={{color: 'white', fontWeight: 600}}>
                                COPY TO CLIPBOARD
                            </Typography>
                        </Button>
                    </CardContent>
                </Card>
            </Dialog>


        </div>
    )
}


// const copyToClipboard = str => {
//     const el = document.createElement('textarea');  // Create a <textarea> element
//     el.value = str;                                 // Set its value to the string that you want copied
//     el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
//     el.style.position = 'absolute';                 
//     el.style.left = '-9999px';                      // Move outside the screen to make it invisible
//     document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
//     const selected =            
//         document.getSelection().rangeCount > 0        // Check if there is any content selected previously
//         ? document.getSelection().getRangeAt(0)     // Store selection if found
//         : false;                                    // Mark as false to know no selection existed before
//     el.select();                                    // Select the <textarea> content
//     document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
//     document.body.removeChild(el);                  // Remove the <textarea> element
//     if (selected) {                                 // If a selection existed before copying
//         document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
//         document.getSelection().addRange(selected);   // Restore the original selection
//     }
// };