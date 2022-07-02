import { Textarea } from "@mantine/core";
import { useState } from "react";

interface ProjectDescriptionComponentProps {
  projectDescription: string;
}

const ProjectDescriptionComponent: React.FC<
  ProjectDescriptionComponentProps
> = ({ projectDescription }) => {
  const [description, setDescription] = useState(projectDescription);
  const isNoDescription = description === "";
  return (
    <Textarea
      variant="unstyled"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      style={{ width: "400px" }}
      placeholder={
        isNoDescription ? "Add a description to your task here..." : undefined
      }
    />
  );
};
export default ProjectDescriptionComponent;
