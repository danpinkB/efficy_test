import { TeamInfoResponseDto } from '../team/dto/team-info-response.dto';
import { TeamShortResponseDto } from '../team/dto/team-short-response.dto';
import { Team } from '../team/entities/team';

export class TeamMapper {
  static toInfoResponseDto(team: Team): TeamInfoResponseDto {
    return {
      ...team,
      total: team.members.reduce((sum, member) => sum + member.steps, 0),
    };
  }

  static toShortResponseDto(team: Team): TeamShortResponseDto {
    return {
      id: team.id,
      name: team.name,
      total: team.members.reduce((sum, member) => sum + member.steps, 0),
    };
  }
}
