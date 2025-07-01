export default async function Home({
  params: { page },
}: {
  params: { page: string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
