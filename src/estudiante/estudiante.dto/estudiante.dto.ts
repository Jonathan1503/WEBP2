/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString,  } from "class-validator";

export class EstudianteDto {
   @IsString()
   @IsNotEmpty()
   readonly nombre: string;

   @IsString()
   @IsNotEmpty()
   readonly codigo: string;

   @IsNumber()
   @IsNotEmpty()
   readonly creditosAprovados: number;
}
/* archivo : src/artwork/propuesta.dto.ts*/