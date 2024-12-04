
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ImageUpload({ onPlantAnalyzed }: {onPlantAnalyzed: any}) {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0])); 
    }
  }

  const analyzePlant = async () => {
    setIsAnalyzing(true)
    // Simular llamada al backend
    await new Promise(resolve => setTimeout(resolve, 2000))
    const mockPlantData = {
      name: 'Rosa',
      family: 'Rosaceae',
      isHealthy: true,
      isPoisonous: false,
      hasFruit: false,
      needsWatering: true,
      isMedicinal: true,
      isSafeForAnimals: false,
      funFact: 'Las rosas han sido cultivadas por más de 5000 años.',
    }
    onPlantAnalyzed(mockPlantData)
    setIsAnalyzing(false)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="picture">Subir imagen de planta</Label>
            <Input id="picture" type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          {image && (
            <div className="flex flex-col items-center">
              <img src={image} alt="Planta subida" className="max-w-full h-auto max-h-64 object-contain mb-4" />
              <Button onClick={analyzePlant} disabled={isAnalyzing}>
                {isAnalyzing ? 'Analizando...' : 'Analizar Planta'}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

