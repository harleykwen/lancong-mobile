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
        CREATE_TRANSACTION: '/user/trip/transaction/create',
        UPDATE_TRANSACTION: '/user/trip/transaction/:transactionId/update',
        CHECKOUT: '/user/trip/transaction/virtual-account/checkout',
    },
    PELANCONG: {
        CREATE: '/user/pelancong/create',
        GET_ALL: '/user/pelancong',
        DELETE: '/user/pelancong/:id/delete'
    },
    TRANSACTION: {
        GET_ALL: '/user/transaction',
        DETAIL: '/user/transaction/:transactionId',
    },
    VA: {
        BANK_LIST: '/user/payment/virtual-account/banks',
    },
    MASTER: {
        FACILITIES: '/master/trip/facilities'
    },
    USER: {
        PROFILE: '/user/profile',
    },
}

export default API_URL