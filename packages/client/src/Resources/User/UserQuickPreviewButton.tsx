import React, { useState } from 'react';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';

import IconImageEye from '@material-ui/icons/RemoveRedEye';
import IconKeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Button, SimpleShowLayout, TextField } from 'react-admin';

const styles = (theme) => ({
    field: {
        '& span': {
            display: 'inline-block',
            maxWidth: '20em',
        },
    },
});

export const UserQuickPreviewButton = (props) => {
    let record = props.record.user ?? props.record;
    const [state, setState] = useState<{ showPanel: boolean }>({ showPanel: false });

    const handleClick = () => {
        setState({ showPanel: true });
    };

    const handleCloseClick = () => {
        setState({ showPanel: false });
    };

    const { showPanel } = state;
    return (
        <>
            <Button onClick={handleClick} label="ra.action.show">
                <IconImageEye />
            </Button>
            <Drawer anchor="right" open={showPanel} onClose={handleCloseClick}>
                <div>
                    <Button label="Close" onClick={handleCloseClick}>
                        <IconKeyboardArrowRight />
                    </Button>
                </div>
                <UserPreview {...props} id={record.user_id} basePath="/user" resource="user" />
            </Drawer>
        </>
    );
};

const UserPreviewView = ({ classes, ...props }) => (
    <SimpleShowLayout {...props}>
        <TextField source="id" />
        <TextField source="name" className={classes.field} />
        <TextField source="last_name" className={classes.field} />
    </SimpleShowLayout>
);

const mapStateToProps = (state, props) => ({
    // Get the record by its id from the react-admin state.
    record: state.admin.resources[props.resource] ? state.admin.resources[props.resource].data[props.id] : null,
    version: state.admin.ui.viewVersion,
});

const UserPreview = connect(mapStateToProps, {})(withStyles(styles)(UserPreviewView));
