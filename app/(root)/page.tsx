import Chart from "@/components/Chart";
import { Separator } from "@/components/ui/separator";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import FormattedDateTime from "@/components/FormattedDateTime";
import { Models } from "node-appwrite";
import ActionDropdown from "@/components/ActionDropdown";
import Thumbnail from "@/components/Thumbnail";
const Dashboard = async () => {
  const [files, totalSpace] = await Promise.allSettled([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  if (files.status === "rejected" || totalSpace.status === "rejected") {
    throw new Error("Failed to fetch dashboard data");
  }

  const usageSummary = getUsageSummary(totalSpace.value);
  return (
    <div className="dashboard-container">
      <section>
        <Chart used={totalSpace.value.used} />
        <ul className="dashboard-summary-list">
          {usageSummary.map((summary) => (
            <Link
              href={summary.url}
              key={summary.title}
              className="dashboard-summary-card"
            >
              <div className="space-y-4">
                <div className="flex justify-between gap-3">
                  <Image
                    src={summary.icon}
                    width={100}
                    height={100}
                    alt="uploaded image"
                    className="summary-type-icon"
                  />
                  <h4 className="summary-type-size">
                    {convertFileSize(summary.size) || 0}
                  </h4>
                </div>
                <h5 className="summary-type-title">{summary.title}</h5>
                <Separator className="bg-light-400" />
                <FormattedDateTime
                  date={summary.latestDate}
                  className="text-light-200"
                />
              </div>
            </Link>
          ))}
        </ul>
      </section>
      <section className="dashboard-recent-files">
        <h2 className="h3 xl:h2 text-light-100">Recent Files Uploaded</h2>
        {files.value.documents.length > 0 ? (
          <ul className="mt-5 flex flex-col gap-5">
            {files.value.documents.map((file: Models.Document) => (
              <Link
                href={file.url}
                target="_blank"
                key={file.$id}
                className="flex items-center gap-3"
              >
                <Thumbnail
                  type={file.type}
                  extension={file.extension}
                  url={file.url}
                />
                <div className="recent-file-details">
                  <div className="flex flex-col gap-1">
                    <p className="recent-file-name">{file.name}</p>
                    <FormattedDateTime
                      date={file.$createdAt}
                      className="caption"
                    />
                  </div>
                  <ActionDropdown file={file} />
                </div>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="empty-list">No files uploaded yet</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
