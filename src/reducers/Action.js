const SET_COUNTRY = 'SET_COUNTRY';

const IS_SENDING = 'IS_SENDING';

const SET_FLIGTH = 'SET_FLIGTH';

const set_country = function(arrayCountry) {
    return {
        type: SET_COUNTRY,
        arrayCountry,
    }
}

const is_sending = function(isSending) {
    return {
        type: IS_SENDING,
        isSending,
    }
}

const set_fligth = function(fligth) {
    return {
        type: SET_FLIGTH,
        fligth,
    }
}


export {
    set_country,
    SET_COUNTRY,
    is_sending,
    IS_SENDING,
    set_fligth,
    SET_FLIGTH,
}