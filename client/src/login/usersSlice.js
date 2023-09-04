//Action Creators

//async actions
export function fetchCurrentUser() {
    return function (dispatch) {
        dispatch({ type: "users/fetchCurrentUser/pending" });
        fetch("/users/1")
            .then((response) => response.json())
            .then((data) => {
                dispatch({
                    type: "users/fetch/fulfilled",
                    payload: data
                })
            })
    }
}

//sync actions

//Reducer
const initialState = {
    entity: {},
    status: "idle"
};

function usersReducer(state = initialState, action) {
    const { type, payload } = action
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

export default usersReducer