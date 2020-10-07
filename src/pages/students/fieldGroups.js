import { FieldTypes } from "../../utils/forms";

export default function getFieldGroups(courseTenures, courses, interGroupOptions, qualifications, casteOptions, cities) {
    let personal = [
        {
            fields: [
                // {
                //     name: "image",
                //     label: "Image",
                //     as: FieldTypes.FILE,
                //     helperText: "Upload your image"
                // },
                {
                    name: "first_name",
                    label: "First Name",
                    as: FieldTypes.TEXT,
                    color: "red"
                },
                {
                    name: "last_name",
                    label: "Last Name",
                    as: FieldTypes.TEXT
                },
                {
                    name: "email",
                    label: "Email",
                    as: FieldTypes.TEXT
                },
                // {
                //     name: "gender",
                //     label: "Gender",
                //     as: FieldTypes.TEXT
                // },
                {
                    name: "father_first_name",
                    label: "Father First Name",
                    as: FieldTypes.TEXT
                },
                {
                    name: "father_last_name",
                    label: "Father Last Name",
                    as: FieldTypes.TEXT
                },
                {
                    name: "mother_first_name",
                    label: "Mother First Name",
                    as: FieldTypes.TEXT
                },
                {
                    name: "mother_last_name",
                    label: "Mother Last Name",
                    as: FieldTypes.TEXT
                },
                {
                    name: "mother_occupation",
                    label: "Mother's Occupation",
                    as: FieldTypes.TEXT
                },
                {
                    name: "father_occupation",
                    label: "Father's Occupation",
                    as: FieldTypes.TEXT
                },
                // {
                //     name: "phone_1",
                //     label: "Phone Number",
                //     as: FieldTypes.TEXT
                // },
                // {
                //     name: "phone_2",
                //     label: "Phone Number",
                //     as: FieldTypes.TEXT
                // },
                {
                    name: "father_phone",
                    label: "Father Phone Number",
                    as: FieldTypes.TEXT
                },
                {
                    name: "mother_phone",
                    label: "Mother Phone Number",
                    as: FieldTypes.TEXT
                },
                {
                    name: "gurdain_name",
                    label: "Gurdain Name",
                    as: FieldTypes.TEXT
                },
                {
                    name: "gurdain_phone",
                    label: "Gurdain Phone Number",
                    as: FieldTypes.TEXT
                },
            ]
        }
    ];

    const course = [
        {
            fields: [
                {
                    name: "doj",
                    label: "Date Of Joining",
                    as: FieldTypes.DATE,
                    disableFuture: false
                },
                {
                    name: "tenure",
                    label: "Tennure of Coaching",
                    as: FieldTypes.SELECT,
                    options: courseTenures && courseTenures.map((option) => {
                        return {
                            name: `${option.name} - ${option.period}`,
                            value: option.id
                        }
                    })
                },
                {
                    name: "course",
                    label: "Course",
                    as: FieldTypes.SELECT,
                    options: courses && courses.map((course) => {
                        return {
                            name: course.name,
                            value: course.id
                        }
                    })
                },
                {
                    name: "end_date",
                    label: "End date",
                    as: FieldTypes.DATE,
                    disableFuture: false
                },
            ]
        }
    ];

    const additional = [
        {
            fields: [
                {
                    name: "college_name",
                    label: "College Name",
                    as: FieldTypes.TEXT
                },
                {
                    name: "college_address",
                    label: "College Address",
                    as: FieldTypes.TEXTAREA
                },
                {
                    name: "inter_group",
                    label: "Inter Group",
                    as: FieldTypes.SELECT,
                    options: interGroupOptions && interGroupOptions.map((option) => {
                        return {
                            name: option.name,
                            value: option.id
                        }
                    })
                },
                {
                    name: "percentage",
                    label: "Percentage",
                    as: FieldTypes.TEXT
                },
                {
                    name: "caste",
                    label: "Caste",
                    as: FieldTypes.SELECT,
                    options: casteOptions && casteOptions.map((option) => {
                        return {
                            name: option.name,
                            value: option.id
                        }
                    })
                },
                {
                    name: "qualification",
                    label: "Qualification",
                    as: FieldTypes.SELECT,
                    options: qualifications && qualifications.map((option) => {
                        return {
                            name: option.name,
                            value: option.id
                        }
                    })
                },
                {
                    name: "college",
                    label: "college",
                    as: FieldTypes.TEXT
                },
                {
                    name: "dob",
                    label: "Date Of Birth",
                    as: FieldTypes.DATE
                },
                {
                    name: "reach",
                    label: "Reach",
                    as: FieldTypes.TEXT
                },
                {
                    name: "doc1",
                    label: "Document-1",
                    as: FieldTypes.FILE,
                    helperText: "Upload Aadhar card, Passport ect..."
                },
                {
                    name: "doc_2",
                    label: "Document-2",
                    as: FieldTypes.FILE,
                    helperText: "Upload Aadhar card, Passport ect..."
                },

            ]

        }
    ]

    const address = [
        {
            fields: [
                {
                    name: "address_line_1",
                    label: "Address 1",
                    as: FieldTypes.TEXTAREA
                },
                {
                    name: "address_line_2",
                    label: "Address 2",
                    as: FieldTypes.TEXTAREA
                },
                {
                    name: "city",
                    label: "City",
                    as: FieldTypes.SELECT,
                    options: cities && cities.map((city) => {
                        return {
                            name: city.name,
                            value: city.id
                        }
                    })
                },
                {
                    name: "pincode",
                    label: "Pincode",
                    as: FieldTypes.TEXT
                },
            ]
        }
    ];


    return {
        personal,
        course,
        additional,
        address,
    };
}



