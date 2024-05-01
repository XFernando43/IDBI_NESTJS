import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './Authentication-Managment/Infracstruture/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypesModule } from './Authentication-Managment/Infracstruture/user-types.module';
import { UserModule } from './Authentication-Managment/Infracstruture/user.module';
import { CommentsModule } from './Incidents-Managment/InfraStructure/comments.module';
import { IncidentModule } from './Incidents-Managment/InfraStructure/incident.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'idbi',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, 
      logging:true, 
    }),    
    UserModule, 
    AccountModule,
    UserTypesModule,
    CommentsModule,
    IncidentModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
