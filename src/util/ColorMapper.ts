export class ColorMapper {
  private cache: { [key: string]: string } = {};


  public getColor = (key: string) => {


    if (!this.cache[key]) {
      this.cache[key] = palette[Object.keys(this.cache).length % palette.length];
    }
    return this.cache[key];
  }
}

const palette = [
  // Primary colors with high contrast
  "#0B2C5F", // Deep navy
  "#B63222", // Deep red
  "#2E7D32", // Green
  "#693AA8", // Medium purple
  
  // Secondary blues
  "#2662A5", // Medium blue
  "#0B4F76", // Ocean blue
  
  // Secondary reds/oranges
  "#D85C31", // Burnt orange
  "#F0803C", // Orange
  
  // Purples
  "#4D1880", // Deep purple
  "#8246AF", // Vibrant purple
  "#9867C5", // Light purple
  
  // Pinks
  "#A41E6C", // Deep pink
  "#C82D7E", // Medium pink
  "#E44097", // Vibrant pink
  
  // Teals/Greens
  "#008891", // Deep teal
  "#00A5AD", // Medium teal
  "#558B2F", // Forest green
  "#00695C", // Dark teal
  
  // Neutrals
  "#5D4037", // Brown
  "#424242", // Dark gray
]

