import { SingleOrder } from "./single-order";

export default async function SingleOrderPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <SingleOrder id={id} />;
}
