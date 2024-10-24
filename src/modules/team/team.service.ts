import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { v7 as uuidv7 } from 'uuid';
import { Team } from './entities/team';
import { TeamMember } from './entities/team-member';
import { IncTeamMemberStepsDto } from './dto/inc-member-steps.dto';

@Injectable()
export class TeamService {
  private storage: Map<string, Team>;

  constructor() {
    this.storage = new Map();
  }

  public async createTeam(dto: CreateTeamDto) {
    const id = uuidv7();
    const newTeam: Team = {
      id,
      name: dto.name,
      members: dto.members.map((member) => ({ name: member, steps: 0 })),
    };

    this.storage.set(id, newTeam);
    return newTeam;
  }

  public async updateTeam(id: string, updateTeamDto: UpdateTeamDto) {
    const team = this.findByIdOrThrow(id);
    const updatedTeam = {
      ...team,
      name: updateTeamDto.name,
    };
    this.storage.set(id, updatedTeam);
    return updatedTeam;
  }

  public async findAllTeams() {
    return Array.from(this.storage.values());
  }

  public async findTeamById(id: string) {
    const team = this.storage.get(id);
    if (!team) {
      throw new NotFoundException(`team with ${id} was not found`);
    }
    return team;
  }

  public async removeTeam(id: string) {
    const team = this.findByIdOrThrow(id);
    this.storage.delete(id);
    return team;
  }

  public async incrementSteps(
    id: string,
    incMemberStepsDto: IncTeamMemberStepsDto,
  ) {
    const team = this.findByIdOrThrow(id);
    const member = team.members.find((x) => x.name === incMemberStepsDto.name);
    member.steps += incMemberStepsDto.value;
    return team;
  }

  public async addMember(id: string, name: string) {
    const team = this.findByIdOrThrow(id);
    const member = team.members.find((x) => x.name === name);
    if (!member) {
      team.members.push({ name: name, steps: 0 });
    }
    return team;
  }

  public async removeMember(id: string, name: string) {
    const team = this.findByIdOrThrow(id);
    const updatedTeam = {
      ...team,
      members: team.members.filter((x) => x.name !== name),
    };
    this.storage.set(id, updatedTeam);
    return updatedTeam;
  }

  public async getMembers(id: string) {
    return this.findByIdOrThrow(id).members;
  }

  private findByIdOrThrow(id: string) {
    const team = this.storage.get(id);
    if (!team) {
      throw new NotFoundException(`team with ${id} was not found`);
    }
    return team;
  }
}
