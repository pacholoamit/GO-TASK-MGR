import React from "react";
import useUpdateProject from "@/features/projects/hooks/useUpdateProject";

import { Textarea } from "@mantine/core";
import { useState } from "react";
import { Project } from "../../api/dto";

interface ProjectDescriptionComponentProps {
  project: Project;
}

const ProjectDescriptionComponent: React.FC<
  ProjectDescriptionComponentProps
> = ({ project }) => {
  const [description, setDescription] = useState(project?.description || "");
  const isNoDescription = description === "";
  const placeholder = isNoDescription
    ? "Add a description to your task here..."
    : undefined;
  const { mutate } = useUpdateProject();

  React.useEffect(() => {
    setDescription(project.description);
  }, [project.description]);

  const submitUpdate = () => mutate({ description, ID: project.ID });
  return (
    <Textarea
      variant="unstyled"
      value={description}
      onBlur={submitUpdate}
      onChange={(e) => setDescription(e.target.value)}
      maxRows={4}
      onKeyDown={(e) =>
        e.key === "Enter" && mutate({ description, ID: project.ID })
      }
      style={{ width: "100%" }}
      placeholder={placeholder}
    />
  );
};
export default ProjectDescriptionComponent;
