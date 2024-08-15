import SideBar from "./_components/sidebar";

export default function PlanykLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar />
      {children}
    </div>
  );
}
