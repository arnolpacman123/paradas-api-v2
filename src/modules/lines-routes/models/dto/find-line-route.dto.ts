import { IsNotEmpty, IsString } from "class-validator";

export class FindLineRouteDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    ground: string;
}