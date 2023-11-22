export default function Button({
  id,
  children,
  onClick,
  type,
}: {
  children: React.ReactNode | string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  id?: string;
}) {
  const className =
    "bg-teal-500 dark:bg-teal-900 hover:bg-teal-600 dark:hover:bg-teal-950 text-white font-bold py-2 px-4 rounded";

  if (type === "submit") {
    return (
      <input
        id={id}
        type="submit"
        value={children as string}
        onClick={onClick}
        className={className}
      />
    );
  }

  return (
    <button id={id} onClick={onClick} className={className} type={type}>
      {children}
    </button>
  );
}
