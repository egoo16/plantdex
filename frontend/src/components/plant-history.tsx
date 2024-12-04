import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PlantHistory({ history }: {history: any}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Plantas</CardTitle>
      </CardHeader>
      <CardContent>
        {history.length > 0 ? (
          <ul className="space-y-2">
            {history.map((plant: any, index: number) => (
              <li key={index} className="flex justify-between items-center border-b pb-2">
                <span>{plant.name}</span>
                <span className="text-sm text-gray-500">{plant.family}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aún no has analizado ninguna planta.</p>
        )}
      </CardContent>
    </Card>
  )
}

