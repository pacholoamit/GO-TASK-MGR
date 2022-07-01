import { TextInput } from "@mantine/core";
import { useState } from "react";

interface ProjectTitleComponentProps {
  projectName: string;
}

const ProjectTitleComponent: React.FC<ProjectTitleComponentProps> = ({
  projectName,
}) => {
  const [name, setName] = useState(projectName);
  return (
    <TextInput
      variant={"unstyled"}
      value={name}
      onChange={(e) => setName(e.target.value)}
      styles={{
        input: {
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
