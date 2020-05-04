import {
    SET_COUNTRY,
    IS_SENDING,
    SET_FLIGTH,
} from './Action';


const initialState = {
    arrayCountry: [],
    isSending: false,
    fligth: {},
};

export const AppReduser = (state = initialState, action) => {
    switch (action.type) {
        case SET_COUNTRY: {
            let newState = {
                ...state
            };
            newState.arrayCountry = action.arrayCountry;
            return newState;
        }
        case IS_SENDING: {
            let newState = {
                ...state
            };
            newState.isSending = action.isSending;
            return newState;
        }
        case SET_FLIGTH: {
            let newState = {
                ...state
            };
            newState.fligth = action.fligth;
            return newState;
        }
        default:
            return state;
    }
}