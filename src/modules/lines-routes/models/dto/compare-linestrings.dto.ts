import { IsArray, IsNotEmpty } from "class-validator";

export class CompareLinestringsDto {
  @IsNotEmpty()
  @IsArray()
  coordinates: Array<[ number, number ]>;
}