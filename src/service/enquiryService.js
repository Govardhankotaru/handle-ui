import serviceHoc, { config } from './serviceHoc';

let hoc = serviceHoc({
    url: config.API_BASE_URL + '/enquiry/'
});

export default function EnquiryService() {
    return {
        getEnquiriesForBranch: (branchId) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/enquiry/?branch=${branchId}`,
                method: 'GET'
            })
        },
        updateEnquiry: (enquiry) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/enquiry/${enquiry.id}/`,
                body: JSON.stringify(enquiry),
                method: 'PATCH'
            })
        },
        deleteEnquiry: (enquiryId) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/enquiry/${enquiryId}/`,
                method: 'DELETE'
            })
        },
        createEnquiry: (enquiry) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/enquiry/`,
                body: JSON.stringify(enquiry),
                method: 'POST'
            })
        },
        getReports: () => {
            return hoc.get({
                url: `${config.API_BASE_URL}/enquiry/reports/`,
                // body: JSON.stringify(enquiry),
                method: 'GET'
            })
        }
    }
}