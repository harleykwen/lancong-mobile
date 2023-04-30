const API_URL = {
    AUTH: {
        LOGIN: '/user/auth/login',
        LOGOUT: '/user/auth/logout',
    },
    REGISTER: {
        REQUEST_OTP: '/user/auth/register/request-otp',
        RESEND_OTP: '/user/auth/register/resend-otp',
        VALIDATE_OTP: '/user/auth/register/validate-otp',
    },
    TRIP: {
        TYPES: '/master/trip/types',
        OPTIONS: '/master/trip/options',
        SEARCH: '/user/trip',
    },
}

export default API_URL