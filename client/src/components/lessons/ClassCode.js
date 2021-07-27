import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton'; 
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import {data} from '../../store/data'; 
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import MuiAlert from '@material-ui/lab/Alert';



export default function ClassCode(props) {
    const [copied, setCopied] = useState(false);

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
            <IconButton onClick={(e)=>{
                data.getState().meetingsData.forEach(e=>{
                    if(e.className===props.className) {
                        copyToClipboard(e.code);
                        handleClickCopied();
                    }
                })
            }}>
                <ConfirmationNumberIcon style={{color: 'white'}}/>
            </IconButton>
        </div>
    )
}


const copyToClipboard = str => {
    const el = document.createElement('textarea');  // Create a <textarea> element
    el.value = str;                                 // Set its value to the string that you want copied
    el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
    el.style.position = 'absolute';                 
    el.style.left = '-9999px';                      // Move outside the screen to make it invisible
    document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
    const selected =            
        document.getSelection().rangeCount > 0        // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0)     // Store selection if found
        : false;                                    // Mark as false to know no selection existed before
    el.select();                                    // Select the <textarea> content
    document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el);                  // Remove the <textarea> element
    if (selected) {                                 // If a selection existed before copying
        document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
        document.getSelection().addRange(selected);   // Restore the original selection
    }
};