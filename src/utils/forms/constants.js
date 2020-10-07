import React from "react";
import styled from "styled-components";
import moment from 'moment';
import { makeStyles } from "@material-ui/core/styles";

import {
  TextField as MuiTextField,
  FormControl as MuiFormControl,
  FormHelperText,
  Select,
  InputLabel,
  MenuItem,
  Checkbox,
  ListItemText,
  Typography,
  Grid
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { TimePicker, DatePicker as MuiDatePicker, DateTimePicker } from "@material-ui/pickers";


const TextFieldSpacing = styled(MuiTextField)(spacing);

const TextField = styled(TextFieldSpacing)`
  width: 200px;
`;
const FormControlSpacing = styled(MuiFormControl)(spacing);
const DatePicker = styled(MuiDatePicker)(spacing);

const FormControl = styled(FormControlSpacing)`
  min-width: 148px;
`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const TEXT = props => {
  return <TextField {...props} />;
};
const TEXTAREA = props => {
  return (
    <TextField
      multiline
      variant="outlined"
      rowsMax={props.rowsMax ? props.rowsMax : "5"}
      rows={props.rows ? props.rows : "4"}
      {...props}
    />
  );
};
const SELECT = props => {
  return (
    <FormControl m={2} {...props}>
      <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      <Select
        defaultValue=""
        {...props}
        inputProps={{
          name: props.name
        }}
      >
        {
          props.options && props.options.map((option) => {
            return (
              <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
            )
          })
        }
      </Select>
    </FormControl>
  );
};
const DATE = props => {
  return (
    <DatePicker
      disableFuture={!props.disableFuture ? true : false}
      openTo="year"
      margin="normal"
      clearable
      views={["year", "month", "date"]}
      defaultValue=""
      {...props}
      onChange={(value) => {
        var date = new moment(value)
        props.setFieldValue(props.name, date.format('YYYY-MM-DD'))
      }}
    />
  );
};
const FILE = props => {
  return (
    <TextField
      type="file"
      {...props}
    />
  );
};
const MULTI_SELECT = props => {
  return (
    <FormControl m={2}>
      {/* <InputLabel htmlFor={props.name}>{props.label}</InputLabel> */}
      <Select
        multiple
        input={<TextField />}
        renderValue={selected => selected.join(', ')}
        MenuProps={MenuProps}
        value={props.courses}
        label={props.label}
      >
        {props.options && props.options.map(option => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={props.courses.indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const PLAIN_VIEW = props => {
  return (
    <Typography component="h6">
      {`${props.name} - ${props.value}`}
    </Typography>
  )
}

const LIST = props => {
  const { installments } = props;
  return (
    installments && installments.length && <Grid xs={12} sm={6} lg={4}>
      {installments.map(() => {
        return (
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <TextField
              id="date"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              type="text"
              defaultValue="500"
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
        )
      })}
    </Grid>
  )
}


export const TYPES = {
  TEXT,
  TEXTAREA,
  SELECT,
  DATE,
  TIME: "TIME",
  FILE,
  MULTI_SELECT,
  PLAIN_VIEW,
  LIST
};
