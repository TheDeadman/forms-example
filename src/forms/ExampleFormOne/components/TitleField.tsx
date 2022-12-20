import { TextField } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectTitleField, setTitle } from "../ExampleFormOne.slice"

export const TitleField = () => {
    const dispatch = useAppDispatch();
    const titleField = useAppSelector(selectTitleField)

    return (
        <TextField
            label="Title"
            fullWidth
            onChange={(e) => dispatch(setTitle(e.target.value))}
            error={titleField.formatError}
            helperText={titleField.formatError ? "Invalid Format. It should match xxxx-yyyy where x is a letter and y is a number." : ""}
        />
    )
}