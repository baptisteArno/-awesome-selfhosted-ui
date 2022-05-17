import path from "path";
import fs from "fs";
import { parse } from "yaml";

type SoftwareProps = {
  name: string;
  website_url: string;
  description: string;
  licenses: string[];
  platforms: string[];
  tags: string[];
  demo_url: string;
};

type Props = {
  softwares: SoftwareProps[];
};

export default function Web({ softwares }: Props) {
  return (
    <div>
      {softwares.map((software) => (
        <div>{software.name}</div>
      ))}
    </div>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  const directoryPath = path.join(
    process.cwd(),
    "../../awesome-selfhosted-data/software"
  );
  const fileNames = fs.readdirSync(directoryPath);
  const softwares: SoftwareProps[] = fileNames.map((fileName) => {
    const fileContent = fs.readFileSync(
      path.join(
        process.cwd(),
        "../../awesome-selfhosted-data/software",
        fileName
      )
    );
    return parse(fileContent.toString());
  });
  return {
    props: {
      softwares,
    },
  };
}
