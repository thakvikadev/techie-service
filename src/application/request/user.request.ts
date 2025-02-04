import {
  VALIDATION_DATE,
  VALIDATION_IN,
  VALIDATION_STRING,
} from '@constants/validations.constant';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserRequest {
  @ApiProperty({ description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Avatar URL', required: false, nullable: true })
  @IsOptional()
  @IsString({ message: VALIDATION_STRING })
  avatar?: string;

  @ApiProperty({ description: 'First name of the user' })
  @IsString({ message: VALIDATION_STRING })
  @Matches(/^[A-Za-z'.-\s]+$/, { message: VALIDATION_STRING })
  firstName: string;

  @ApiProperty({ description: 'Last name of the user' })
  @IsString({ message: VALIDATION_STRING })
  @Matches(/^[A-Za-z'.-\s]+$/, { message: VALIDATION_STRING })
  lastName: string;

  @ApiProperty({ description: 'Gender of the user' })
  @IsEnum(['Male', 'Female'], { message: VALIDATION_IN })
  gender: string;

  @ApiProperty({ description: 'Date of birth of the user' })
  @IsDateString({}, { message: VALIDATION_DATE })
  dob?: Date;

  @ApiProperty({ description: 'Identity type of the user' })
  @IsEnum(['Nationality', 'Passport'], { message: VALIDATION_IN })
  idType: string;

  @ApiProperty({ description: 'Identity number of the user' })
  @IsString({ message: VALIDATION_STRING })
  @Matches(/^[A-Za-z0-9'.-\s]+$/, { message: VALIDATION_STRING })
  idNo: string;

  @ApiProperty({ description: 'Contact number of the user' })
  @IsOptional()
  @IsString({ message: VALIDATION_STRING })
  phone?: string;

  @ApiProperty({ description: 'Nationality of the user' })
  @IsOptional()
  @IsString({ message: VALIDATION_STRING })
  @IsIn(
    [{ value: 'kh' }, { value: 'ch' }, { value: 'jp' }].map((n) => n.value),
    {
      message: VALIDATION_IN,
    },
  )
  nationality?: string;

  @ApiProperty({ description: 'Marital status of the user' })
  @IsOptional()
  @IsString({ message: VALIDATION_STRING })
  maritalStatus?: string;
}
