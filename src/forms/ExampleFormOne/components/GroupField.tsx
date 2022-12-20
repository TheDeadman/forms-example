
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectGroupOptions, setGroupOptions, setSelectedGroup } from "../ExampleFormOne.slice";

const getGroupsBySearchText = async (text: string) => {
    try {
        let response = await axios.get(`http://localhost:3001/api/groups?name=${text}`)
        return response.data;
    } catch (ex) {
        console.log(ex);
        throw new Error("Problem getting group");
    }
}

export const GroupField = () => {
    const dispatch = useAppDispatch();
    const groupOptions = useAppSelector(selectGroupOptions);

    return (
        <Autocomplete
            disablePortal
            fullWidth
            options={groupOptions}
            onChange={(e, val) => {
                console.log(e, val)
                if (val) {
                    dispatch(setSelectedGroup(val));
                }
            }}
            sx={{ width: 300 }}
            renderInput={(params) =>
                <TextField {...params} label="Group" onChange={async (e) => {
                    let groupOpts = await getGroupsBySearchText(e.target.value);
                    dispatch(setGroupOptions(groupOpts));
                }} />
            }
        />
    )
}