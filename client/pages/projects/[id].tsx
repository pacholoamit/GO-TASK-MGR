import {
  Container,
  InputBaseProps,
  InputVariant,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { GetServerSideProps } from "next";
import React, { CSSProperties, useState } from "react";
import { getProject } from "../../api";
import { Project } from "../../api/dto";

const styles: { [key: string]: CSSProperties } = {
  container: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 24,
  },
};

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
interface ProjectProps {
  project: Project;
}

export default function ProjectPage({ project }: ProjectProps) {
  return (
    <div style={styles.container}>
      <Stack>
        <ProjectTitleComponent projectName={project.name} />
        <ProjectDescriptionComponent projectDescription={project.description} />
      </Stack>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const project = await getProject({ id: query.id });
  return { props: { project } };
};
