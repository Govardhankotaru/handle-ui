import defaultConfig from './default';

const localConfig = {
    ...defaultConfig,
    API_BASE_URL: "http://ec2-13-232-94-208.ap-south-1.compute.amazonaws.com/api/v1"

    // API_BASE_URL: "http://192.168.0.100:8087/api/v1"

}

export default localConfig