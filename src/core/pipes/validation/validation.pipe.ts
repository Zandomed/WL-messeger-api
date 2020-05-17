import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform
} from "@nestjs/common";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value, metadata: ArgumentMetadata) {
    // console.log(metadata);
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    // console.log(object);
    const errors = await validate(object);
    // console.log(errors);

    if (errors.length > 0) {
      // console.log(errors);

      const messagesErrors = Object.entries(errors[0].constraints).reverse();
      const codeErros = Object.entries(errors[0].contexts).reverse();

      // console.log(messagesErrors);
      // console.log(codeErros);
      throw new BadRequestException({
        message: messagesErrors[0][1],
        errorCode: codeErros[0][1].errorCode
      });
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
