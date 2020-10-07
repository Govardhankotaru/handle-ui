import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Step,
    Stepper,
    Typography,
    Button,
    StepLabel,
    Card as MuiCard,
    CardHeader,
    CardContent,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import styled from "styled-components";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const Card = styled(MuiCard)(spacing);

export default function HorizontalLinearStepper({
    getStepContent,
    formTitle,
    handleBack,
    handleNext,
    steps,
    activeStep,
    personal_info
}) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardHeader title={formTitle} />
            <CardContent>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    <div>
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Back
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleNext} disabled={personal_info.id ? false : true}>
                                {activeStep === steps.length-1 ? 'Close' : 'Next'}
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

    );
}