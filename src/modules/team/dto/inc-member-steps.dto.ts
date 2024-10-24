import { ApiProperty } from '@nestjs/swagger';

export class IncTeamMemberStepsDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  value: number;
}
