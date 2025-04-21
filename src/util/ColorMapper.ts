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
  // Navy blues - primary conference color
  "#0B2C5F", // Deep navy
  "#1E3A61", // Dark blue
  "#0B4F76", // Ocean blue
  "#2662A5", // Medium blue
  
  // Purples
  "#4D1880", // Deep purple
  "#693AA8", // Medium purple
  "#8246AF", // Vibrant purple
  "#9867C5", // Light purple
  
  // Pinks
  "#A41E6C", // Deep pink
  "#C82D7E", // Medium pink
  "#E44097", // Vibrant pink
  
  // Teals
  "#008891", // Deep teal
  "#00A5AD", // Medium teal
  
  // Complementary colors
  "#B63222", // Deep red
  "#D85C31", // Burnt orange
  "#F0803C", // Orange
  "#558B2F", // Forest green
  "#2E7D32", // Green
  "#00695C", // Dark teal
  "#5D4037", // Brown
  "#424242", // Dark gray
]

