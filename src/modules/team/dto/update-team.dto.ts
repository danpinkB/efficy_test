import { ApiProperty } from '@nestjs/swagger';

export class UpdateTeamDto {
  @ApiProperty()
  name: string;
}
