import CreateList from "./_components/create-list";
import Lists from "./_components/lists";

export default async function PlanykPage() {
  return (
    <div className="p-10">
      <CreateList />
      <Lists />
    </div>
  );
}
