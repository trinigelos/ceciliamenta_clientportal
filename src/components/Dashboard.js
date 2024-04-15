//Dashboard.js
import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { SearchBar } from "./SearchBar";
import { Header } from "./Header";
import { JobsTab } from "./JobsTab";

export const Dashboard = () => {
  const [jobPosts, setJobPosts] = useState([]);

  // Fetch job posts from the backend when the component mounts
  useEffect(() => {
    fetchJobPosts();
  }, []);

  // make searchbar functional:
  const onSearch = (searchTerm, location) => {
    fetchJobPosts(searchTerm, location);
  };

  // Fetch job posts from the backend
  const fetchJobPosts = async (searchTerm = "", location = "") => {
    try {
      const response = await fetch(
        `http://localhost:5000/jobposts?searchTerm=${searchTerm}&location=${location}`
      );
      const data = await response.json();
      console.log("Data received from backend:", data);

      // Sort posts by createdAt date in descending order
      const sortedData = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setJobPosts(sortedData);
    } catch (error) {
      console.error("Error fetching job posts:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div>
        <Header />
      </div>
      <div>
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="jobs-container">
        {/* <JobsTab /> */}
        {jobPosts.map((job) => (
          <JobsTab key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};
