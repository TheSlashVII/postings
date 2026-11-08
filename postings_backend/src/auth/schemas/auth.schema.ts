import { ArgumentMetadata, PipeTransform, UnprocessableEntityException } from "@nestjs/common"
import { ZodType } from "zod"
export class AuthFieldsValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) { }
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      throw new UnprocessableEntityException("Validation failed, incorrect values were sent", { cause: "wrong data values in fields" })
    }
  }
}
