import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateLinkModalProps {
  openCreateLinkModal: () => void; 
}

interface Link {
  id: string;
  title: string;
  url: string;
}

export function ImportantLinks({
  openCreateLinkModal
}: CreateLinkModalProps) {
  const { tripId } = useParams()
  const [links, setLinks] = useState<Link[]>([])

  useEffect(() => {
    api.get(`trips/${tripId}/links`).then(response => setLinks(response.data.links))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

    {links.length > 0 ? 
      <div className="space-y-5">
        {links.map(link => {
          return (
            <div key={link.id} className="flex items-center justify-between gap-4 flex-1">
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">{link.title}</span>
                <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                  {link.url}
                </a>
              </div>
    
              <Link2 className="text-zinc-400 size-5 shrink-0" />
            </div>
            )
        })}
      </div>
    : <div className="block text-zinc-400">Sem links </div>
    }
    
      <Button variant="secondary" size="full" onClick={openCreateLinkModal}>
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  )
}

/*

Quebra o texto e colocar reticências

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

Faz o ícone ter o tamanho normal
.shrink-0 {
  flex-shrink: 0;
}
*/