import { Calendar, MapPin, X } from "lucide-react";
import { Button } from "../../components/button";
import { useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";

interface UpdateDestinationAndDateModalProps {
  closeDestinationAndDateModal: () => void; 
}

export function UpdateDestinationAndDateModal({
  closeDestinationAndDateModal
}: UpdateDestinationAndDateModalProps) {
  const { tripId } = useParams()
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()
  const [destination, setDestination] = useState('')

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  async function updateDestinationAndDate() {
    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }

    await api.put(`/trips/${tripId}`, {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
    })

    window.document.location.reload()
  }

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to 
  ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
  : null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Atualizar local e data</h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={closeDestinationAndDateModal} />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar o local e a data
          </p>
        </div>
        
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
          <div className="flex items-center gap-2 flex-1">
            <MapPin className="size-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Para onde você vai?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={event => setDestination(event.target.value)}
            />
          </div>

          <button onClick={openDatePicker} className="flex items-center gap-2 text-left w-[240px]">
            <Calendar className="size-5 text-zinc-400" />
            <span
              className="text-lg text-zinc-400 w-40 flex-1"
            >
              {displayedDate || 'Quando'}
            </span>
          </button>

          {isDatePickerOpen && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
              <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="font-lg font-semibold">Selecione a data</h2>
                    <button>
                      <X className="size-5 text-zinc-400" onClick={closeDatePicker} />
                    </button>
                  </div>
                </div>
                
                <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
              </div>
            </div>
          )}
      </div>
  
       <Button onClick={updateDestinationAndDate} size="full">
          Atualizar
       </Button>
      </div>
    </div>
  )
}