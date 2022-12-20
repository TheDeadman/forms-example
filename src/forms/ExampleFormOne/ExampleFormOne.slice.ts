import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { RootState } from "../../app/store";

export interface ExampleFormOneState {
    selectedGroup: string;
    groupOptions: string[];
    titleField: {
        value: string;
        formatError: boolean;
    };
    startDate?: string | null;
    endDate?: string | null;
}

const initialState: ExampleFormOneState = {
    selectedGroup: '',
    groupOptions: [],
    titleField: {
        value: "",
        formatError: false,
    },
    startDate: null,
    endDate: null
};

export const counterSlice = createSlice({
    name: "exampleFormOne",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setGroupOptions: (state, action: PayloadAction<string[]>) => {
            state.groupOptions = action.payload;
        },
        setSelectedGroup: (state, action: PayloadAction<string>) => {
            state.selectedGroup = action.payload;
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.titleField.value = action.payload;

            if (!/[a-zA-Z]{4}\-[0-9]{4}/.test(action.payload)) {
                state.titleField.formatError = true;
            } else {
                state.titleField.formatError = false;
            }
        },
        setStartDate: (state, action: PayloadAction<string | undefined | null>) => {
            state.startDate = action.payload;
        },
        setEndDate: (state, action: PayloadAction<string | undefined | null>) => {
            state.endDate = action.payload;
        },
    },
});

export const { setGroupOptions, setTitle, setStartDate, setEndDate, setSelectedGroup } = counterSlice.actions;

export const selectGroupOptions = (state: RootState) =>
    state.exampleFormOne.groupOptions;

export const selectSelectedGroup = (state: RootState) =>
    state.exampleFormOne.selectedGroup;

export const selectTitleField = (state: RootState) =>
    state.exampleFormOne.titleField;

export const selectStartDate = (state: RootState) =>
    state.exampleFormOne.startDate;

export const selectEndDate = (state: RootState) =>
    state.exampleFormOne.endDate;

export const selectEndDateError = createSelector([
    (state: RootState) => state.exampleFormOne.startDate,
    (state: RootState) => state.exampleFormOne.endDate,
],
    (startDate, endDate) => {
        console.log("SELECTING END DATE ERROR")
        if (startDate && endDate) {
            const startDateDayJs = dayjs(new Date(startDate));
            const endDateDayJs = dayjs(new Date(endDate));
            if (startDateDayJs.add(30, 'day') < endDateDayJs) {
                return 'End Date cannot be greater than 30 days past the start date.'
            }
        }
        return null;
    }
);

export const selectIsFormValid = createSelector([
    selectSelectedGroup, selectTitleField, selectStartDate, selectEndDate, selectEndDateError
], (selectedGroup, titleField, startDate, endDate, endDateError) => {
    console.log("SELECTING IS FORM VALID")
    console.log(selectedGroup, titleField, startDate, endDate, endDateError)
    if (selectedGroup && titleField && startDate && endDate && !endDateError) {
        return true;
    }
    return false;
});

export default counterSlice.reducer;
