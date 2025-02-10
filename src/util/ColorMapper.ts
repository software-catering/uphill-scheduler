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
  "#003300",
  "#8B4513",
  "#006633",
  "#000066",
  "#660033",
  "#333333",
  "#008080",
  "#4B3621",
  "#556B2F",
  "#800000",
  "#003366",
  "#4B0082",
  "#008B8B",
  "#2F4F4F",
  "#000000",
  "#333366",
  "#000033",
  "#330033",
  "#333300",
  "#330000",
]

