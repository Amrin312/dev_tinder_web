import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name: 'connectionsSlice',
    initialState: [],
    reducers: {
        addConnection: (state, action) => {
            return action.payload
        },
        removeConnection: (state, action) => {

        }
    }
});

export const {addConnection, removeConnection} = connectionsSlice.actions;
export default connectionsSlice.reducer;