"use client";

import { useRouter } from "next/navigation";

export const Button = ({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => {};
}) => {
  const router = useRouter();
  return (
    <button
      type="submit"
      className="text-md font-bold hover:border-white border-b-2 border-transparent w-fit transition-all"
      onClick={onClick ? onClick : () => router.back()}
    >
      {label}
    </button>
  );
};
