import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageUpload } from './components/image-upload'
import { PlantInfo } from './components/plant-info'
import { PlantHistory } from './components/plant-history'
import { TopPlants } from './components/top-plants'

export default function PlantDex() {
  const [currentPlant, setCurrentPlant] = useState(null)
  const [plantHistory, setPlantHistory] = useState<any[]>([])

  const handlePlantAnalyzed = (plantData: any) => {
    setCurrentPlant(plantData)
    setPlantHistory(prev => [plantData, ...prev])
  }

  return (
    <div style={{ width: '100%',  alignItems: 'center' }}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">PlantDex</h1>
        <Tabs defaultValue="analyze" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analyze">Analizar</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
            <TabsTrigger value="top">Top Plantas</TabsTrigger>
          </TabsList>
          <TabsContent value="analyze">
            <ImageUpload onPlantAnalyzed={handlePlantAnalyzed} />
            {currentPlant && <PlantInfo plant={currentPlant} />}
          </TabsContent>
          <TabsContent value="history">
            <PlantHistory history={plantHistory} />
          </TabsContent>
          <TabsContent value="top">
            <TopPlants />
          </TabsContent>
        </Tabs>
      </div>
    </div>

  )
}


