import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const TOP_PLANTS = [
    { name: 'Rosa', searches: 1200 },
    { name: 'Lavanda', searches: 980 },
    { name: 'Aloe Vera', searches: 850 },
    { name: 'Orquídea', searches: 720 },
    { name: 'Cactus', searches: 650 },
]

export function TopPlants() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Top 5 Plantas Más Buscadas</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {TOP_PLANTS.map((plant, index) => (
                        <li key={index} className="flex justify-between items-center border-b pb-2">
                            <span>{index + 1}. {plant.name}</span>
                            <span className="text-sm text-gray-500">{plant.searches} búsquedas</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

