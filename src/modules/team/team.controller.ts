import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiTags } from '@nestjs/swagger';
import { TeamInfoResponseDto } from './dto/team-info-response.dto';
import { TeamShortResponseDto } from './dto/team-short-response.dto';
import { TeamMapper } from '../mapper/team.mapper';
import { IncTeamMemberStepsDto } from './dto/inc-member-steps.dto';

@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto): Promise<TeamInfoResponseDto> {
    return this.teamService
      .createTeam(createTeamDto)
      .then(TeamMapper.toInfoResponseDto);
  }

  @Get()
  findAll(): Promise<TeamShortResponseDto[]> {
    return this.teamService
      .findAllTeams()
      .then((teams) => teams.map(TeamMapper.toShortResponseDto));
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TeamInfoResponseDto> {
    return this.teamService.findTeamById(id).then(TeamMapper.toInfoResponseDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<TeamInfoResponseDto> {
    return this.teamService
      .updateTeam(id, updateTeamDto)
      .then(TeamMapper.toInfoResponseDto);
  }

  @Put(':id/member')
  addMember(
    @Param('id') id: string,
    @Query('name') name: string,
  ): Promise<TeamInfoResponseDto> {
    return this.teamService
      .addMember(id, name)
      .then(TeamMapper.toInfoResponseDto);
  }

  @Delete(':id/member')
  removeMember(
    @Param('id') id: string,
    @Query('name') name: string,
  ): Promise<TeamInfoResponseDto> {
    return this.teamService
      .removeMember(id, name)
      .then(TeamMapper.toInfoResponseDto);
  }

  @Put(':id/inc-counter')
  increment(
    @Param('id') id: string,
    @Body() incMemberStepsDto: IncTeamMemberStepsDto,
  ): Promise<TeamInfoResponseDto> {
    return this.teamService
      .incrementSteps(id, incMemberStepsDto)
      .then(TeamMapper.toInfoResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<TeamInfoResponseDto> {
    return this.teamService.removeTeam(id).then(TeamMapper.toInfoResponseDto);
  }
}
