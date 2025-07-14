export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  type: string;
}

export interface Application {
  jobId: number;
  name: string;
  email: string;
  resumeLink: string;
  coverLetter: string;
}

