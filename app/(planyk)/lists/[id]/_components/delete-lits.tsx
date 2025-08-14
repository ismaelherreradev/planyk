"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteList } from "@/app/(planyk)/_actions";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { AlertTriangle, Trash2 } from "lucide-react";

const initialState = {
  message: "",
};

export default function DeleteList({ id }: { id: number }) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(deleteList, initialState);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isTransitionPending, startTransition] = useTransition();

  function handleDelete() {
    const formData = new FormData();
    formData.append("id", id.toString());
    startTransition(() => {
      formAction(formData);
    });
  }

  useEffect(() => {
    if (state?.success) {
      router.push("/lists");
    }
  }, [state?.success, router]);

  if (!showConfirm) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="h-9 px-3 text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
        onClick={() => setShowConfirm(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      className="h-9 px-3"
      onClick={handleDelete}
      disabled={isPending || isTransitionPending}
    >
      {isPending || isTransitionPending ? (
        <ReloadIcon className="h-4 w-4 animate-spin" />
      ) : (
        <AlertTriangle className="h-4 w-4" />
      )}
    </Button>
  );
}
