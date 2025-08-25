import { render, screen, fireEvent } from "@testing-library/react";
import JobCard from "./JobCard";
import { SessionProvider } from "next-auth/react";

const mockJob = {
  id: "1",
  title: "Frontend Developer",
  company: "Tech Co",
  location: "Remote",
};

describe("JobCard Component", () => {
  it("renders job info and bookmark button", () => {
    render(
      <SessionProvider session={null}>
        <JobCard job={mockJob} />
      </SessionProvider>
    );
    expect(screen.getByText(mockJob.title)).toBeInTheDocument();
    expect(screen.getByTestId("bookmark-btn")).toBeInTheDocument();
  });

  it("shows alert if user not logged in", () => {
    window.alert = jest.fn();
    render(
      <SessionProvider session={null}>
        <JobCard job={mockJob} />
      </SessionProvider>
    );
    fireEvent.click(screen.getByTestId("bookmark-btn"));
    expect(window.alert).toHaveBeenCalledWith("Please log in to bookmark");
  });
});
