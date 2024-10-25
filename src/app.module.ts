import { Module } from '@nestjs/common';
import { TeamModule } from './modules/team/team.module';

@Module({
  imports: [TeamModule],
})
export class AppModule {}
