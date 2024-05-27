/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString,  } from "class-validator";

export class ProfesorDto {
   @IsString()
   @IsNotEmpty()
   readonly nombre: string;

   @IsNumber()
   @IsNotEmpty()
   readonly cedula: number;

   @IsString()
   @IsNotEmpty()
   readonly grupoInvestigacion: string;

   @IsNumber()
   @IsNotEmpty()
   readonly numeroExtension: number;
}
/* archivo : src/artwork/propuesta.dto.ts*/