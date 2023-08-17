import {IsArray, IsNotEmpty} from "class-validator";

export class NearestLinesRoutesDto {
    @IsNotEmpty()
    @IsArray({})
    coordinate: [number, number];
}