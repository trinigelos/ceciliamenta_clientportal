//JobsTab.js
import React, { useState, useEffect } from "react";
import { formatDate } from "../components/component";
import { JobDescription } from "../components/component";
import "./JobsTab.css";

export const JobsTab = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // function to expand view of jobs
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  //function to press ESC to close the job
  const handleEscKey = (event) => {
    if (event.key === "Escape") {
      setIsExpanded(false);
    }
  };
// refreshes to listen to ESC events and removes it to avoid memory leaks
  useEffect(() => {
    if (isExpanded) {
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isExpanded]);

  return (
    <div className="job-post-container">
      <div
        className={`job-post-preview ${isExpanded ? "expanded" : ""}`}
        onClick={handleToggle}
      >
        <h3>{job.title}</h3>
        <p>{job.company.slice(0, 50)}...</p>
        <p>
          <strong>Ubicacion: </strong> {job.location}
        </p>
        <p>
          <strong>Disponibilidad: </strong> {job.employmentType}
        </p>
      </div>

      {/* expand view to display complete job */}
      {isExpanded && (
        <>
          <div className="backdrop-blur" onClick={handleToggle}></div>

          <div className="expanded-job-post ">
            <div className="intros-container-jobs">
              <div className="intro-control-jobs">
                <div className="actionbuttons">
                  <span
                    class="material-symbols-outlined close-btn"
                    onClick={handleToggle}
                  >
                    close
                  </span>
                </div>

                {/* reading/view part of the tab */}
                <div className="content-published-container">
                  <h3>{job.title}</h3>
                  <p>{job.company}</p>
                  <p>
                    <strong>Ubicacion: </strong> {job.location}
                  </p>
                  <p>
                    <strong>Disponibilidad: </strong> {job.employmentType}
                  </p>
                  <p>
                    <strong>Modalidad: </strong>
                    {job.employmentStyle}
                  </p>
                  <p>
                    <strong>Descripción: </strong>
                    <JobDescription description={job.description} />
                  </p>
                  {job.salaryRange && (
                    <p>
                      <strong>Salario: </strong>
                      {job.salaryRange}
                    </p>
                  )}
                  {job.contactEmail && (
                    <p>
                      <strong>Email de contacto: </strong>
                      {job.contactEmail}
                    </p>
                  )}
                  {job.linkedinLink && (
                    <p>
                      <a
                        href={job.linkedinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linkedinLink"
                      >
                        <strong>LinkedIn </strong>
                      </a>
                    </p>
                  )}
                  <p>
                    <strong>Publicado: </strong>
                    {formatDate(job.createdAt)}
                  </p>{" "}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
