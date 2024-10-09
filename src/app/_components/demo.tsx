"use client";

import { api } from "~/trpc/react";

export function Demo() {
  const anonMutation = api.post.anon.useMutation({
    onSuccess: async () => {
      alert("Anon operation successful");
    },
    onError: async (error) => {
      console.error(error);
      alert(`Anon operation failed: ${error.message}`);
    },
  });

  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <button
        onClick={() => anonMutation.mutate()}
        disabled={anonMutation.isPending}
        className="text-per-neutral-900 border-per-neutral-200 rounded-full border bg-blue-500 px-10 py-3 font-semibold transition hover:bg-blue-600"
      >
        {anonMutation.isPending ? "Loading..." : "Call Anon"}
      </button>
    </div>
  );
}
