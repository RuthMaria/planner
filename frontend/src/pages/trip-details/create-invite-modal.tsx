import { Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateInviteModalProps {
  closeCreateInviteModal: () => void; 
}

export function CreateInviteModal({
  closeCreateInviteModal
}: CreateInviteModalProps) {
  const { tripId } = useParams()


  async function createInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const email = data.get('email')?.toString();

    await api.post(`/trips/${tripId}/invites`, {
      email
    })

    window.document.location.reload()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Convidar pessoas</h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={closeCreateInviteModal} />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem se visualizar entre si
          </p>
        </div>
        
        <form onSubmit={createInvite} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              name="email"
              placeholder="Qual o email?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button size="full">
            Enviar convite
          </Button>
        </form>
      </div>
    </div>
  )
}