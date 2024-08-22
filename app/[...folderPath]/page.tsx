export default function Page({ params }: { params: { folderPath: string[] } }) {
  return <div>folderPath: {params.folderPath.join("/")}</div>;
}
