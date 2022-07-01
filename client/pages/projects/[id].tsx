import {
  Container,
  InputBaseProps,
  InputVariant,
  TextInput,
} from "@mantine/core";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { getProject } from "../../api";
import { Project } from "../../api/dto";

interface ProjectProps {
  project: Project;
}

export default function ProjectPage({
  project: { name: projectName, description: projectDescription },
}: ProjectProps) {
  const [name, setName] = useState(projectName);
  const [description, setDescription] = useState(projectDescription);
  const [variant, setVariant] = useState<InputVariant>("unstyled");

  const isNoDescription = description === "";
  return (
    <Container size={"xl"} px={"xs"}>
      <TextInput
        variant={variant}
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
      <TextInput
        variant="unstyled"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={
          isNoDescription ? "Add a description to your task here" : undefined
        }
        styles={{
          input: {
            fontSize: 34,
            fontWeight: 700,
            paddingBottom: 20,
            paddingTop: 20,
          },
        }}
      />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const project = await getProject({ id: query.id });
  return { props: { project } };
};
