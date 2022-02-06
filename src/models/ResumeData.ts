import { Link } from './Link';
import { SelfAssessment } from './SelfAssessment';
import { Testimonial } from './Testimonial';
import { TimelineData } from './TimelineData';

export interface ResumeData {
    name: string;
    photo: string;
    headline: string;
    blurb: string;
    contact: Link[];
    socials: Link[];
    selfAssessment: SelfAssessment[];
    skills: string[];
    roles: TimelineData[];
    education: TimelineData[];
    testimonials: Testimonial[];
}
