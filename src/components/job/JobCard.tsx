"use client";
import { useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";

interface JobCardProps {
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    image?: string;
  };
}

export function JobCard({ job }: JobCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="max-w-xs w-full group/card"
      onClick={() => navigate(`/job/${job.id}`)}
    >
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
          `bg-[url(${job.image || "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80"})] bg-cover`
        )}
      >
        {/* Dark overlay on hover */}
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60" />

        {/* Company + Location */}
        <div className="flex flex-row items-center space-x-4 z-10">
          <img
            height="100"
            width="100"
            alt="Company"
            src="/company-logo.png"
            className="h-10 w-10 rounded-full border-2 object-cover"
          />
          <div className="flex flex-col">
            <p className="font-normal text-base text-gray-50 relative z-10">
              {job.company}
            </p>
            <p className="text-sm text-gray-400">{job.location}</p>
          </div>
        </div>

        {/* Job Title + Type */}
        <div className="text content z-10">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50">
            {job.title}
          </h1>
          <p className="font-normal text-sm text-gray-50 my-4">
            {job.type} role at {job.company}
          </p>
        </div>
      </div>
    </div>
  );
}
