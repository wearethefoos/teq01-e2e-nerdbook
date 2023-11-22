export default function FormError({
  fieldName,
  message,
}: {
  fieldName: string;
  message?: string;
}) {
  if (!message) return null;

  return (
    <div
      id={[fieldName, "error"].join("-")}
      className="text-red-500 text-xs italic mt-2"
    >
      {message}
    </div>
  );
}
