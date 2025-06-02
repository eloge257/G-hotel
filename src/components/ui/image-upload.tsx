
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image } from "lucide-react";

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  label?: string;
}

const ImageUpload = ({ 
  images, 
  onImagesChange, 
  maxImages = 10,
  label = "Images" 
}: ImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleImageAdd = (newImages: string[]) => {
    const totalImages = [...images, ...newImages];
    const limitedImages = totalImages.slice(0, maxImages);
    onImagesChange(limitedImages);
  };

  const handleImageRemove = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // Pour la démo, on simule des URLs d'images
    const imageUrls = files.map((file, index) => 
      `https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop&crop=center&auto=format&q=80&ixlib=rb-4.0.3&${index}`
    );
    handleImageAdd(imageUrls);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    // Pour la démo, on simule des URLs d'images
    const imageUrls = files.map((file, index) => 
      `https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop&crop=center&auto=format&q=80&ixlib=rb-4.0.3&${index}`
    );
    handleImageAdd(imageUrls);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      
      {/* Zone de drop */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive 
            ? "border-primary bg-primary/5" 
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <div className="space-y-2">
          <p className="text-lg font-medium">
            Déposez vos images ici ou cliquez pour sélectionner
          </p>
          <p className="text-sm text-gray-500">
            PNG, JPG, GIF jusqu'à 10MB (max {maxImages} images)
          </p>
        </div>
        <Input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileInput}
          id="image-upload"
        />
        <Button variant="outline" className="mt-4" asChild>
          <label htmlFor="image-upload" className="cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            Sélectionner des images
          </label>
        </Button>
      </div>

      {/* Prévisualisation des images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleImageRemove(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Image className="mx-auto h-12 w-12 mb-2" />
          <p>Aucune image ajoutée</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
