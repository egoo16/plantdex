
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type EnfermedadesPorPlanta = {
  plant: string;
  diseases: string[];
};
export function ImageUpload({ onPlantAnalyzed }: { onPlantAnalyzed: any }) {
  const [image, setImage] = useState<string | null>(null);
  const [img, setImg] = useState<any>();
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [falimyShow, setFamilyShow] = useState('')

  const [position, setPosition] = useState();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newImage = URL.createObjectURL(e.target.files[0])
      console.log("🚀 ~ handleImageChange ~ e.target.files[0]:", e.target.files[0])
      setImg(e.target.files[0])
      setImage(newImage);
    }
  }
  const diseases = [
    "Roya de la Manzana",
    "Manchas Bacterianas",
    "Podredumbre Negra",
    "Óxido de Cedro y Manzana",
    "Manchas Foliares de Cercospora",
    "Óxido Común",
    "Mildiu Temprano",
    "Esca (Sarampión Negro)",
    "Saludable",
    "Mildiu Tardío",
    "Mildiu de la Hoja",
    "Quemaduras de Hojas",
    "Mildiu del Norte de la Hoja",
    "Mildiu Polvoriento",
    "Manchas Foliares de Septoria",
    "Virus de Curl de la Hoja Amarilla"
  ];
  
  const diseases_by_plant: EnfermedadesPorPlanta[] = [
    { plant: "Manzana", diseases: ["Roya de la Manzana", "Podredumbre Negra", "Óxido de Cedro y Manzana", "Saludable"] },
    { plant: "Pimiento", diseases: ["Manchas Bacterianas", "Saludable"] },
    { plant: "Cereza", diseases: ["Mildiu Polvoriento", "Saludable"] },
    { plant: "Maíz", diseases: ["Manchas Foliares de Cercospora", "Óxido Común", "Mildiu del Norte de la Hoja", "Saludable"] },
    { plant: "Uva", diseases: ["Podredumbre Negra", "Esca (Sarampión Negro)", "Mildiu de la Hoja", "Saludable"] },
    { plant: "Durazno", diseases: ["Manchas Bacterianas", "Saludable"] },
    { plant: "Papa", diseases: ["Mildiu Temprano", "Mildiu Tardío", "Saludable"] },
    { plant: "Fresa", diseases: ["Quemaduras de Hojas", "Saludable"] },
    {
      plant: "Tomate", diseases: [
        "Manchas Bacterianas", "Mildiu Temprano", "Mildiu Tardío", "Mildiu de la Hoja", "Manchas Foliares de Septoria",
        "Ácaros Rojos", "Manchas de Objetivo", "Virus de Curl de la Hoja Amarilla", "Saludable"
      ]
    }
  ];


  const analyzePlant = async () => {
    setIsAnalyzing(true)
    let indexImg = 0
    // Simular llamada al backend


    const formData = new FormData();
    formData.append('image', img);

    fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        searchById(data.class_id)
        indexImg = data.class_id
      })
      .catch(error => console.error('Error:', error));

    searchById(indexImg)



  }

  const searchById = (id: number) => {
    const enfermedad = diseases[id]
    const family = buscarPlantaPorEnfermedad(enfermedad)

    const mockPlantData = {
      name: family,
      family: family,
      health: diseases[id],
      isHealthy: true,
      isPoisonous: false,
      hasFruit: false,
      needsWatering: true,
      isMedicinal: true,
      isSafeForAnimals: false,
      funFact: '',
    }
    onPlantAnalyzed(mockPlantData)
    setIsAnalyzing(false)
  }

  const buscarPlantaPorEnfermedad = (enfermedad: string): string | undefined => {
    let plantaEncontrada: string | undefined;

    diseases_by_plant.forEach((item) => {
      if (item.diseases.includes(enfermedad)) {
        plantaEncontrada = item.plant;
      }
    });

    return plantaEncontrada;
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

