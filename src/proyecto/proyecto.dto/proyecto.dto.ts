/* eslint-disable prettier/prettier */
import { IsDate, IsNotEmpty, IsUrl} from "class-validator";

export class ProyectoDto {
   @IsUrl()
   @IsNotEmpty()
   readonly url: string;

   @IsDate()
   @IsNotEmpty()
   readonly fechaInicio: Date;

   @IsDate()
   @IsNotEmpty()
   readonly fechaFin: Date;
}
/* archivo : src/artwork/propuesta.dto.ts*/