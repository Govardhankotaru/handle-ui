import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as yup from 'yup';
import { Grid, Button, Tooltip, IconButton } from "@material-ui/core";
import { AddCircle, Delete, Edit } from "@material-ui/icons";
import moment from 'moment';

import Table from "../tables/MaterialTable";
import SelectColumns from "../tables/SelectColumns";
import EnquiryService from "../../service/enquiryService";
import {
  fetch_enquiries_success,
  delete_enquiry_success,
  create_enquiry_success,
  update_enquiry_success
} from "../../redux/reducers/enquiryReducer";
import AlertDialog from "../Dialogs";
import EnquiryForm from "./EnquiryForm";
import { FieldTypes, filterColumns } from "../../utils";

function Enquiry({
  dispatch_enquiries = () => { },
  dispatch_delete_enquiry,
  dispatch_create_enquiry,
  dispatch_update_enquiry,
  enquiryState,
  branchState,
  courseState,
  platformState,
  globalState
}) {
  let [open, setOpen] = useState(false);
  let [openAlert, setOpenAlert] = useState(false);
  let [enquiryId, setEnquiryID] = useState("");
  let [initial, setInitial] = useState({});
  let [onSubmit, setonSubmit] = useState({});
  let [formTitle, setFormTitle] = useState("Create Enquiry");
  let [selectedColumns, setSelectedColumns] = useState([]);

  const genderOptions = [
    {
      id: 1,
      name: "Male"
    },
    {
      id: 2,
      name: "Female"
    },
    {
      id: 3,
      name: "Not Specified"
    }
  ];

  const enquiryStatus = [
    {
      id: 0,
      name: "PENDING"
    },
    {
      id: 1,
      name: "JOINED"
    },
    {
      id: 2,
      name: "JOINEDELSE"
    },
    {
      id: 3,
      name: "CONTACTED"
    },
    {
      id: 4,
      name: "JOININGLATER"
    },
    {
      id: 5,
      name: "WRONGENQUIRY"
    },
    {
      id: 6,
      name: "SUSPICIOUS"
    }
  ];

  const getFields = () => {
    return [
      {
        fields: [
          {
            name: "date",
            label: "Date",
            as: FieldTypes.DATE
          },
          {
            name: "name",
            label: "Name",
            as: FieldTypes.TEXT
          },
          {
            name: "phone_1",
            label: "Phone Number",
            as: FieldTypes.TEXT
          },
          {
            name: "email",
            label: "Email",
            as: FieldTypes.TEXT
          }, {
            name: "address.address_line_1",
            label: "Address Line 1",
            as: FieldTypes.TEXT
          }, {
            name: "address.address_line_2",
            label: "Address Line 2",
            as: FieldTypes.TEXT
          },
          {
            name: "address.city",
            label: "City",
            as: FieldTypes.SELECT,
            options: globalState.cities.map((city) => {
              return {
                name: city.name,
                value: city.id
              }
            })
          }, {
            name: "address.pincode",
            label: "PinCode",
            as: FieldTypes.TEXT
          },
          {
            name: "course",
            label: "Course",
            as: FieldTypes.SELECT,
            options: courseState.courses.map((course) => {
              return {
                name: course.name,
                value: course.id
              }
            })
          },
          {
            name: "platform",
            label: "Platform",
            as: FieldTypes.SELECT,
            options: platformState.platforms.map((platform) => {
              return {
                name: platform.name,
                value: platform.id
              }
            })
          },
          {
            name: "notes",
            label: "Notes",
            as: FieldTypes.TEXTAREA
          },
          {
            name: "call_back",
            label: "Call Back Date",
            as: FieldTypes.DATE,
            disableFuture: false
          },
          {
            name: "status",
            label: "Status",
            as: FieldTypes.SELECT,
            options: enquiryStatus.map((option) => {
              return {
                name: option.name,
                value: option.id
              }
            })
          },
          {
            name: "gender",
            label: "Gender",
            as: FieldTypes.SELECT,
            options: genderOptions.map((option) => {
              return {
                name: option.name,
                value: option.id
              }
            })
          },
          {
            name: "date_of_birth",
            label: "Date Of Birth",
            as: FieldTypes.DATE
          },
          {
            name: "visitor_name",
            label: "Visitor Name",
            as: FieldTypes.TEXT
          },
          {
            name: "appointment_date",
            label: "Appointment Date",
            as: FieldTypes.DATE,
            disableFuture: false
          },
        ]
      }
    ];
  };

  const getColumns = () => {
    return [
      { title: 'Enquiry ID', field: 'id' },
      { title: 'Name', field: 'name' },
      {
        title: 'Course',
        field: 'course',
        render: rowData => {
          const course = courseState.courses.filter((course) => {
            if (course.id === rowData.course) {
              return course
            }
          })
          // return course && course[0] && course[0].name
        }
      },
      {
        title: 'Platform',
        field: 'platform',
        render: rowData => {
          const platform = platformState.platforms.filter((platform) => {
            if (platform.id === rowData.platform) {
              return platform
            }
          })
          return platform && platform[0] && platform[0].name
        }
      },
      { title: 'Date', field: 'date' },
      { title: 'Email', field: 'email' },
      { title: 'Notes', field: 'notes' },
      { title: 'Callback', field: 'call_back' },
      {
        title: 'Status',
        field: 'status',
        render: rowData => {
          const status = enquiryStatus.filter((status) => {
            if (status.id === rowData.status) {
              return status
            }
          })
          return status && status[0] && status[0].name
        }
      },
      {
        title: 'Gender',
        field: 'gender',
        render: rowData => {
          const gender = genderOptions.filter((gender) => {
            if (gender.id === rowData.gender) {
              return gender
            }
          })
          return gender && gender[0] && gender[0].name
        }
      },
      { title: 'Date Of Birth', field: 'date_of_birth' },
      { title: 'Visitor Name', field: 'visitor_name' },
      { title: 'Appointment Date', field: 'appointment_date' },
      {
        title: 'Actions',
        field: 'actions',
        filtering: false,
        export: false,
        render: rowData => {
          return (
            <div style={{ display: "flex" }}>
              <Tooltip title="Edit" onClick={(e) => handleEdit(rowData)}>
                <IconButton aria-label="edit">
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" onClick={(e) => handleDelete(rowData)} >
                <IconButton aria-label="delete">
                  <Delete />
                </IconButton>
              </Tooltip>
            </div>
          )
        }
      }
    ]
  };

  const schema = yup.object({
    name: yup.string().required("name is required"),
    phone_1: yup.string().required("phone number is required")
  })

  const enquiryService = new EnquiryService();
  useEffect(() => {
    enquiryService
      .getEnquiriesForBranch(branchState.selected_branch.id)
      .then(data => data.json())
      .then(data => {
        dispatch_enquiries({
          enquiries: data.results
        });
      }).catch(() => { })
  }, []);

  const setInitialValues = {
    date: new moment().format('YYYY-MM-DD'),
    call_back: new moment().format('YYYY-MM-DD'),
    appointment_date: "",
    date_of_birth: ""

  }

  const handleEdit = (row) => {
    let data = Object.assign({}, row, {
      address: row.location
    });
    setValues(data);
    setFormTitle('Update Enquiry');
    toggleModal();
    setonSubmit({ onSubmit: updateEnquiry });
  };
  const handleDelete = (row) => {
    openAlertDialog(row.id);
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  const openAlertDialog = (enquiryId) => {
    setEnquiryID(enquiryId);
    setOpenAlert(true);
  };
  const closeAlertDialog = () => {
    setOpenAlert(false);
    setEnquiryID("");
  };
  const deleteEnquiry = () => {
    enquiryService.deleteEnquiry(enquiryId).then(response => {
      dispatch_delete_enquiry({ enquiryId });
      setEnquiryID("");
    });
    closeAlertDialog();
  };
  const createEnquiry = enquiry => {
    enquiryService.createEnquiry({
      ...enquiry,
      branch: branchState.selected_branch.id,
    }).then(data => data.json())
      .then(enquiry => {
        dispatch_create_enquiry({ enquiry });
      }).catch((error) => {

      })
  };

  const setValues = (record) => {
    setInitial(record);
  }
  const updateEnquiry = enquiry => {
    enquiryService.updateEnquiry({
      "id": enquiry.id,
      "branch": branchState.selected_branch.id,
      "date": enquiry.date,
      "phone_1": enquiry.address.phone_1,
      "name": enquiry.name,
      "notes": enquiry.notes,
      "call_back": enquiry.call_back,
      "address": {
        "address_line_1": enquiry.address.address_line_1,
        "address_line_2": enquiry.address.address_line_2,
        "city": enquiry.address.city.id,
        "pincode": enquiry.address.pincode,
      },
      "course": enquiry.course,
      "platform": enquiry.platform,
      "email": enquiry.email,
      "gender": enquiry.gender
    }).then(data => data.json())
      .then((enquiry) => {
        dispatch_update_enquiry({ enquiry })
      })
  };

  const handleSubmit = (enquiry) => {
    onSubmit.onSubmit(enquiry);
    toggleModal();
  }

  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Button
          align="right"
          onClick={() => {
            setInitial(setInitialValues);
            setFormTitle('Create Enquiry')
            toggleModal();
            setonSubmit({ onSubmit: createEnquiry })
          }}
        >
          <AddCircle color="secondary" />
        </Button>
        <SelectColumns
          tableColumns={getColumns()}
          setSelectedColumns={setSelectedColumns}
        />
        <Table
          header="Enquires"
          columns={filterColumns(getColumns(), selectedColumns)}
          tableDataItems={enquiryState.enquiries}
        />
        <EnquiryForm
          initialValues={initial}
          open={open}
          closeModal={toggleModal}
          fieldGroups={courseState.courses && platformState.platforms && getFields()}
          onSubmit={handleSubmit}
          schema={schema}
          formTitle={formTitle}
        />
        <AlertDialog
          openAlert={openAlert}
          header="Enquiry"
          closeAlertDialog={closeAlertDialog}
          handleSubmit={deleteEnquiry}
        />
      </Grid>
    </React.Fragment>
  );
}

const mapStatetoProps = state => {
  return {
    enquiryState: state.enquiryReducer,
    branchState: state.branchReducer,
    courseState: state.courseReducer,
    platformState: state.platformReducer,
    globalState: state.globalReducer
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch_enquiries: payload => {
      dispatch(fetch_enquiries_success(payload));
    },
    dispatch_delete_enquiry: payload => {
      dispatch(delete_enquiry_success(payload));
    },
    dispatch_create_enquiry: payload => {
      dispatch(create_enquiry_success(payload));
    },
    dispatch_update_enquiry: payload => {
      dispatch(update_enquiry_success(payload));
    }
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(Enquiry);
