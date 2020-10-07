import React, { useState, useEffect } from "react";
import styled, { withTheme } from "styled-components";

import {
    Breadcrumbs as MuiBreadcrumbs,
    Card as MuiCard, CardContent,
    Divider as MuiDivider, Grid,
    Typography
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { spacing } from "@material-ui/system";
import { ShoppingBag } from "react-feather";
import { NavLink as RouterNavLink } from "react-router-dom";
import BarChart from "../pages/charts/Chartjs/BarChart";
import PieChart from "../pages/charts/Chartjs/PieChart";
import PolarChart from "../pages/charts/Chartjs/PolarChart";
import Stats from "../pages/dashboards/Analytics/Stats";
import Actions from "./Actions";
import EnquiryService from "../service/enquiryService";
import { Pie } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
  height: 300px;
`;
const BarChartWrapper = styled.div`
  height: 318px;
  width: 100%;
`;

function EmptyCard() {
    return (
        <Card mb={6}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Empty card
        </Typography>
                <BarChart />
                <Typography variant="body2" gutterBottom>
                    Empty card
                    <PieChart />
                </Typography>
                <PolarChart />
            </CardContent>
        </Card>
    );
}

const AdminDashboard = ({ theme }) => {
    const enquiryService = new EnquiryService();
    const [total, setTotal] = useState("");
    const [today, setToday] = useState("");
    const [course_data, setCourseData] = useState([]);
    const [course_labels, setCourseLabel] = useState([]);
    const [course_color, setCourseColors] = useState([]);
    const [plat_data, setPlatData] = useState({});
    const [status_data, setStatusData] = useState({});
    const [months_data, setMonthsData] = useState({});


    const bardata = {
        labels: course_labels,
        datasets: [
            {
                label: "Courses",
                backgroundColor: theme.palette.secondary.main,
                borderColor: theme.palette.secondary.main,
                hoverBackgroundColor: theme.palette.secondary.main,
                hoverBorderColor: theme.palette.secondary.main,
                data: course_data
            },
            // {
            //     label: "Desktop",
            //     backgroundColor: theme.palette.grey["200"],
            //     borderColor: theme.palette.grey["200"],
            //     hoverBackgroundColor: theme.palette.grey["200"],
            //     hoverBorderColor: theme.palette.grey["200"],
            //     data: [69, 66, 24, 48, 52, 51, 44, 53, 62, 79, 51, 68]
            // }
        ]
    };

    const enqbardata = {
        labels: status_data.label,
        datasets: [
            {
                label: "Courses",
                backgroundColor: theme.palette.secondary.main,
                borderColor: theme.palette.secondary.main,
                hoverBackgroundColor: theme.palette.secondary.main,
                hoverBorderColor: theme.palette.secondary.main,
                data: status_data.values
            },
            // {
            //     label: "Desktop",
            //     backgroundColor: theme.palette.grey["200"],
            //     borderColor: theme.palette.grey["200"],
            //     hoverBackgroundColor: theme.palette.grey["200"],
            //     hoverBorderColor: theme.palette.grey["200"],
            //     data: [69, 66, 24, 48, 52, 51, 44, 53, 62, 79, 51, 68]
            // }
        ]
    };

    const monthsbardata = {
        labels: months_data.label,
        datasets: [
            {
                label: "Enquiries per Month",
                backgroundColor: theme.palette.secondary.main,
                borderColor: theme.palette.secondary.main,
                hoverBackgroundColor: theme.palette.secondary.main,
                hoverBorderColor: theme.palette.secondary.main,
                data: months_data.values
            },
            // {
            //     label: "Desktop",
            //     backgroundColor: theme.palette.grey["200"],
            //     borderColor: theme.palette.grey["200"],
            //     hoverBackgroundColor: theme.palette.grey["200"],
            //     hoverBorderColor: theme.palette.grey["200"],
            //     data: [69, 66, 24, 48, 52, 51, 44, 53, 62, 79, 51, 68]
            // }
        ]
    };

    const course_pie_data = {
        labels: course_labels,
        datasets: [
            {
                data: course_data,
                backgroundColor: course_color,
                borderColor: "transparent"
            }
        ]
    };

    const plat_pie_data = {
        labels: plat_data.values,
        datasets: [
            {
                data: plat_data.label,
                backgroundColor: plat_data.background,
                borderColor: "transparent"
            }
        ]
    };

    const options = {
        maintainAspectRatio: false,
        legend: {
            display: true
        },

    };

    const baroptions = {
        maintainAspectRatio: false,
        legend: {
            display: true
        },
        scales: {
            yAxes: [
                {
                    gridLines: {
                        display: true
                    },
                    stacked: true,
                    ticks: {
                        stepSize: 20
                    }
                }
            ],
            xAxes: [
                {
                    barPercentage: 0.75,
                    categoryPercentage: 0.5,
                    stacked: true,
                    gridLines: {
                        color: "transparent"
                    }
                }
            ]
        }
    };
    useEffect(() => {
        enquiryService
            .getReports()
            .then(data => data.json())
            .then((data) => {
                console.log(data);
                setTotal(data.total);
                setToday(data.today);
                setCourseData(data.courses.values);
                setCourseLabel(data.courses.label);
                setCourseColors(data.courses.background);
                setPlatData(data.platform);
                setStatusData(data.status);
                setMonthsData(data.months_data);
            })
            .catch(() => { })
    }, []);

    return (
        <React.Fragment>
            <Grid justify="space-between" container spacing={6}>
                <Grid item>
                    <Typography variant="h3" display="inline">
                        Welcome back,
          </Typography>

                </Grid>

                <Grid item>
                    <Actions />
                </Grid>
            </Grid>


            <Divider my={6} />

            <Grid container spacing={6}>
                <Grid item xs={6} sm={12} md={6} lg={3} xl>
                    <Stats
                        title="Enquiries Total"
                        amount={total}
                        // value={100}
                        color={blue[500]}
                        chip="Total"
                    />
                </Grid>
                <Grid item xs={6} sm={12} md={6} lg={3} xl>
                    <Stats
                        title="Enquiries Today"
                        amount={today}
                        value={100}
                        color={blue[500]}
                        chip="Today"
                    />
                </Grid>
            </Grid>
            <br />
            <br />
            <br />
            <Grid container xs={12} spacing={2}>

                <Grid xs={6} >
                    <Typography align="center"><h1>Courses</h1></Typography>
                    <ChartWrapper><Pie data={course_pie_data} options={options} /> </ChartWrapper>
                </Grid>
                <Grid xs={6}>
                    <Typography align="center"><h1>Platform</h1></Typography>
                    <ChartWrapper><Pie data={plat_pie_data} options={options} /> </ChartWrapper>
                </Grid>
            </Grid>
            <br />
            <br />
            <br />
            <Grid>
                <Typography align="center"><h1>Courses</h1></Typography>

                <BarChartWrapper>
                    <Bar data={bardata} options={baroptions} />
                </BarChartWrapper>

            </Grid>

            <Grid>
                <Typography align="center"><h1>Enquiry Status</h1></Typography>

                <BarChartWrapper>
                    <Bar data={enqbardata} options={baroptions} />
                </BarChartWrapper>

            </Grid>
            <Grid>
                <Typography align="center"><h1>Enquiry Per Month</h1></Typography>

                <BarChartWrapper>
                    <Bar data={monthsbardata} options={baroptions} />
                </BarChartWrapper>

            </Grid>
        </React.Fragment>
    );
};

export default withTheme(AdminDashboard);
