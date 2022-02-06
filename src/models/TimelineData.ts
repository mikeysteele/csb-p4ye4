import { TimeFrame } from "./TimeFrame";


export interface TimelineData {
    subtitle: string;
    title: string;
    timeFrame: TimeFrame;
    content: string;
    tags: string[];
}
