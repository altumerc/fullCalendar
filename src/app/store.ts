import { Time } from "@angular/common";
import { DateInput,EventInput } from "@fullcalendar/core";

export interface store{
    start: DateInput,
    end: DateInput,
    display: 'background'
}