import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid, Button, Tooltip, IconButton } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import * as yup from 'yup';

import { FieldTypes } from "../../utils";
import UserForm from "./UserForm";

function User({
}) {
    let [open, setOpen] = useState(false);
    let [initial, setInitial] = useState({});
    let [formTitle, setFormTitle] = useState("Add User");
    let [onSubmit, setonSubmit] = useState({});

    const getFields = () => {
        return [
            {
                fields: [
                    {
                        name: "branchName",
                        label: "Select Branch Name",
                        as: FieldTypes.DATE
                    },
                    {
                        name: "ipAddress",
                        label: "IP Address",
                        as: FieldTypes.TEXT
                    },
                    {
                        name: "user_name",
                        label: "User Name",
                        as: FieldTypes.TEXT
                    },
                    {
                        name: "email",
                        label: "Email",
                        as: FieldTypes.TEXT
                    },
                    {
                        name: "mobile",
                        label: "Mobile Number",
                        as: FieldTypes.TEXT
                    },
                    {
                        name: "new_password",
                        label: "New Password",
                        as: FieldTypes.TEXT
                    },
                    {
                        name: "confirm_password",
                        label: "Confirm Password",
                        as: FieldTypes.TEXT
                    },
                    {
                        name: "image",
                        label: "Upload Image",
                        as: FieldTypes.FILE
                    }
                ]
            }
        ];
    };

    const setInitialValues = {

    };

    const schema = yup.object({
    });

    const toggleModal = () => {
        setOpen(!open);
    };

    const createUser = user => {
    };

    const handleSubmit = (user) => {
        onSubmit.onSubmit(user);
        toggleModal();
    }

    return (
        <React.Fragment>
            <Grid container spacing={6}>
                <Button
                    align="right"
                    onClick={() => {
                        setInitial(setInitialValues);
                        setFormTitle('Add User');
                        toggleModal();
                        setonSubmit({ onSubmit: createUser })
                    }}
                >
                    <AddCircle color="secondary" />
                </Button>
                <UserForm
                    initialValues={initial}
                    open={open}
                    closeModal={toggleModal}
                    fieldGroups={getFields()}
                    onSubmit={handleSubmit}
                    schema={schema}
                    formTitle={formTitle}
                />
            </Grid>
        </React.Fragment>
    )
};

const mapStatetoProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStatetoProps, mapDispatchToProps)(User);