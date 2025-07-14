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

const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 60%)`;
  return color;
};

export function JobCard({ job }: JobCardProps) {
  const navigate = useNavigate();
  const bgColor = stringToColor(job.company);

  return (
    <div
      className="w-full h-full group/card cursor-pointer"
      onClick={() => navigate(`/job/${job.id}`)}
    >
      <div
        className={cn(
          "relative text-white h-96 rounded-xl p-4 shadow-lg text-blac flex flex-col justify-between transition duration-300 ease-in-out group-hover/card:scale-[1.02] group-hover/card:shadow-2xl",
          "bg-gradient-to-br from-cyan-400 via-cyan to-gray-200 dark:from-neutral-900 dark:to-neutral-800"
        )}
      >
        {/* Top: Company Logo Replacement */}
        <div className="flex items-center space-x-4 z-10 text-white">
          <div
            className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
            style={{ backgroundColor: bgColor }}
          >
            {job.company.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <p className="text-base font-semibold text-white dark:text-gray-100">
              {job.company}
            </p>
            <p className="text-sm text-black dark:text-gray-400">
              {job.location}
            </p>
          </div>
        </div>

        {/* Bottom: Job Title + Type */}
        <div className="z-10 mt-auto">
          <h1 className="font-bold text-xl text-black dark:text-white mb-2">
            {job.title}
          </h1>
          <p className="text-sm text-gray-900 dark:text-gray-300">
            {job.type} role at {job.company}
          </p>
        </div>
      </div>
    </div>
  );
}
