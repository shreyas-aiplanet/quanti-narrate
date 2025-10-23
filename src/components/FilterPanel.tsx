import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductData, plants, areas, categories } from "@/data/salesData";

interface FilterPanelProps {
  products: ProductData[];
  selectedProduct: string;
  onProductChange: (value: string) => void;
  selectedPlant: string;
  onPlantChange: (value: string) => void;
  selectedArea: string;
  onAreaChange: (value: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (value: string) => void;
}

export const FilterPanel = ({
  products,
  selectedProduct,
  onProductChange,
  selectedPlant,
  onPlantChange,
  selectedArea,
  onAreaChange,
  selectedCategory,
  onCategoryChange,
}: FilterPanelProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>
          Customize your view by selecting filters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="product-select">Product</Label>
          <Select value={selectedProduct} onValueChange={onProductChange}>
            <SelectTrigger id="product-select">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.id} value={product.name}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {onCategoryChange && (
          <div className="space-y-2">
            <Label htmlFor="category-select">Category</Label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger id="category-select">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="plant-select">Plant</Label>
          <Select value={selectedPlant} onValueChange={onPlantChange}>
            <SelectTrigger id="plant-select">
              <SelectValue placeholder="Select plant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plants</SelectItem>
              {plants.map((plant) => (
                <SelectItem key={plant.id} value={plant.id}>
                  {plant.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="area-select">Region</Label>
          <Select value={selectedArea} onValueChange={onAreaChange}>
            <SelectTrigger id="area-select">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {areas.map((area) => (
                <SelectItem key={area.id} value={area.id}>
                  {area.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
