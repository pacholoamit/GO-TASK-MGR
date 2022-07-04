import axios from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useSWRConfig } from "swr";
import { updateProjectEndpoint, getAllProjectsEndpoint } from "../api/config";
import { ProjectRequest, Project } from "../api/dto";

const updateProject = (data: ProjectRequest) => {
  return axios
    .put(updateProjectEndpoint(data?.ID?.toString() || ""), data)
    .then((res) => res.data) as Promise<Project>;
};

const useUpdateProject = () => {
  const { mutate: revalidate } = useSWRConfig();
  const { push } = useRouter();
  return useMutation((formData: ProjectRequest) => updateProject(formData), {
    onSuccess: () => {
      revalidate(getAllProjectsEndpoint);
      push("/");
    },
  });
};

export default useUpdateProject;
