import React from 'react';
import { ClickAwayListener, Box } from '@mui/material';


const SidePanel = ({ open, onClose, children }) => {

    const sidePanelStyle = {
        backgroundColor: 'white',
        position: 'absolute',
        right: 0,
        zIndex: 999,
        display: !open ? 'none' : 'block',
        border: '1px solid black',
        width: 400,
        height: '100%',
        overflow: 'auto',
    };

    const handleClickAway = () => {
        if (open) onClose();
    };

    return (
        <ClickAwayListener onClickAway={() => handleClickAway()} mouseEvent= 'onMouseUp' >
            <Box style={sidePanelStyle}>
                {children}
            </Box>
        </ClickAwayListener>
    );
};

export default SidePanel;

