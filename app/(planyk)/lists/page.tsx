import Navbar from "../_components/navbar";

export default async function ListIdPage({ params }: { params: { id: number } }) {
  return (
    <main className="flex flex-1 flex-col">
      <Navbar />
    </main>
  );
}
