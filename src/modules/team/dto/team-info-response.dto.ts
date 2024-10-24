import { TeamMemberResponseDto } from './team-member-response.dto';

export class TeamInfoResponseDto {
  id: string;
  name: string;
  members: TeamMemberResponseDto[];
  total: number;
}
