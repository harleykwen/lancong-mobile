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
        CHECKOUT: '/user/trip/transaction/full-payment/virtual-account/checkout',
        DETAIL: '/user/trip/:id',
        FULL_PAYMENT_SUMMARY: '/user/trip/transaction/full-payment/:transactionId/summary',
    },
    PELANCONG: {
        CREATE: '/user/pelancong/create',
        GET_ALL: '/user/pelancong',
        DELETE: '/user/pelancong/:id/delete',
        UPDATE: '/user/pelancong/:id/update',
    },
    TRANSACTION: {
        GET_ALL: '/user/transaction',
        DETAIL: '/user/transaction/:transactionId',
        GET_ALL_DRAFT: '/user/transaction/draft',
        DRAFT_DETAIL: '/user/transaction/draft/:transactionId',
        VA_CANCEL: '/user/transaction/:transactionId/payment/virtual-account/cancel',
        RENEWAL_FULL_PAYMENT_VA: '/user/transaction/:transactionId/full-payment/virtual-account/renew',
    },
    VA: {
        BANK_LIST: '/user/payment/virtual-account/banks',
        BLUEPRINT: '/user/trip/transaction/installment/:transactionId/blueprint',
        INSTALLMENT_CREATE: '/user/trip/transaction/installment/:transactionId/virtual-account/create',
        INSTALLMENT_PAY: '/user/trip/transaction/installment/:transactionId/virtual-account/pay',
    },
    MASTER: {
        FACILITIES: '/master/trip/facilities',
        PLACE_AUTOCOMPLETE: '/master/maps/place/autocomplete?input=jakarta%20selatan',
    },
    USER: {
        PROFILE: '/user/profile',
    },
    HOME: {
        ACTIVE_PAYMENT: '/user/home/active-payment',
        TRIP_SUGGESTION: '/user/home/trip-suggestion',
    },
}

export default API_URL