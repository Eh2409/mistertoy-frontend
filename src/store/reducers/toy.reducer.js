
// Toy
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'

// Loader
export const SET_LOADER = 'SET_LOADER'


const initialState = {
    toys: [],
    isLoad: false
}

export function toyReducer(state = initialState, cmd) {
    switch (cmd.type) {

        case SET_TOYS:
            return { ...state, toys: cmd.toys }
        case REMOVE_TOY:
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== cmd.toyId)
            }
        case ADD_TOY:
            return { ...state, toys: [...state.toys, cmd.toy] }
        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === cmd.toy._id ? cmd.toy : toy)
            }

        /// LOADER

        case SET_LOADER:
            return { ...state, isLoad: cmd.isLoad }

        default: return state
    }

}