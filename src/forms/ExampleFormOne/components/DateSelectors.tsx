
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectEndDate, selectEndDateError, selectStartDate, setEndDate, setStartDate } from '../ExampleFormOne.slice';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { useMemo } from 'react';


export const DateSelectors = () => {
    const dispatch = useAppDispatch();
    const startDate = useAppSelector(selectStartDate);
    const endDate = useAppSelector(selectEndDate)
    const endDateError = useAppSelector(selectEndDateError);

    // @ts-ignore
    window.dayjs = dayjs;

    const maxEndDate = useMemo(() => {
        if (startDate) {
            return dayjs(new Date(startDate)).add(30, 'day');
        } else {
            return null
        }
    }, [startDate])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Start Date"
                onChange={(newDate) => {
                    if (newDate) {
                        dispatch(setStartDate(newDate?.format('MM/DD/YYYY')))
                    } else {
                        dispatch(setStartDate(null))
                    }
                }}
                value={startDate ? dayjs(startDate) : null}
                renderInput={(params) => <TextField {...params} />}
                minDate={dayjs(new Date())}
            />
            <DatePicker
                label="End Date"
                onChange={(newDate) => {
                    if (newDate) {
                        dispatch(setEndDate(newDate?.format('MM/DD/YYYY')))
                    } else {
                        dispatch(setEndDate(null))
                    }
                }}
                value={endDate ? dayjs(endDate) : null}
                renderInput={(params) => <TextField {...params} helperText={endDateError} />}
                minDate={dayjs(new Date())}
                maxDate={maxEndDate}
            />
        </LocalizationProvider>
    )
}