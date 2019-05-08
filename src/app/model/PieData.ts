export class PieData {
  
  name: string;
  sliced: boolean;
  y: number;

  constructor(name: string, y:number, sliced: boolean) {
    this.name = name;
    this.y = y;
    this.sliced = sliced || false; 
  }
}