import { Button } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectIsFormValid } from "./ExampleFormOne.slice";
import { DateSelectors } from './components/DateSelectors';
import { GroupField } from "./components/GroupField";
import { TitleField } from "./components/TitleField";
import './exampleFormOne.css';



export function ExampleFormOne() {
    const isFormValid = useAppSelector(selectIsFormValid);

    return <div className="example-form">
        <div>
            This is the example form.
        </div>

        <GroupField />

        <TitleField />

        <DateSelectors />

        <Button disabled={!isFormValid}>Submit</Button>
    </div>
}