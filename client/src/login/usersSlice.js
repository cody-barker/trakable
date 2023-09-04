//Action Creators

//async actions
export function fetchCurrentUser() {
    return function (dispatch) {
        dispatch({ type: "users/fetchCurrentUser/pending" });
        fetch("/users/")
    }
}

//sync actions

//Reducer

const initialState = {
    entity: {},
    status: "idle"
};

function usersReducer(state = initialState, action) {
    const { type, paylod } = action
    switch(type) {
        //sync actions
        //async actions
        case "users/fetchCurrentUser/pending":
            return {
                ...state,
                status: "loading",
            };
        case "users/fetchCurrentUser/fulfilled":
            return {
                ...state,
                entity: payload,
                status: "idle"
            };
        default:
            return state
    }
}