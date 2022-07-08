import React from "react";
import useUpdateProject from "@/features/projects/hooks/useUpdateProject";
import { TextInput } from "@mantine/core";
import { useState } from "react";
import { Project } from "@/features/api/dto";

interface ProjectTitleComponentProps {
  project: Project;
}

const ProjectTitleComponent: React.FC<ProjectTitleComponentProps> = ({
  project,
}) => {
  const [name, setName] = useState(project.name);
  const { mutate } = useUpdateProject();

  React.useEffect(() => {
    setName(project.name);
  }, [project.name]);

  const submitUpdate = () => mutate({ name, ID: project.ID });
  return (
    <TextInput
      variant={"unstyled"}
      value={name}
      onChange={(e) => setName(e.target.value)}
      onBlur={submitUpdate}
      onKeyDown={(e) => e.key === "Enter" && mutate({ name, ID: project.ID })}
      styles={{
        input: {
          flex: 1,
          fontSize: 32,
          fontWeight: 700,
          paddingBottom: 20,
          paddingTop: 20,
        },
      }}
    />
  );
};

export default ProjectTitleComponent;
