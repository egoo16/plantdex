import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from 'lucide-react'

export function PlantInfo({ plant }: {plant: any}) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{plant.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>Familia: <Badge variant="outline">{plant.family}</Badge></div>
          <div>Estado: {plant.isHealthy ? <CheckCircle className="inline text-green-500" /> : <XCircle className="inline text-red-500" />}</div>
          <div>Venenosa: {plant.isPoisonous ? <CheckCircle className="inline text-red-500" /> : <XCircle className="inline text-green-500" />}</div>
          <div>Da frutos: {plant.hasFruit ? <CheckCircle className="inline text-green-500" /> : <XCircle className="inline text-gray-500" />}</div>
          <div>Necesita riego: {plant.needsWatering ? <CheckCircle className="inline text-blue-500" /> : <XCircle className="inline text-gray-500" />}</div>
          <div>Medicinal: {plant.isMedicinal ? <CheckCircle className="inline text-green-500" /> : <XCircle className="inline text-gray-500" />}</div>
          <div>Segura para animales: {plant.isSafeForAnimals ? <CheckCircle className="inline text-green-500" /> : <XCircle className="inline text-red-500" />}</div>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold">Curiosidad:</h4>
          <p>{plant.funFact}</p>
        </div>
      </CardContent>
    </Card>
  )
}

