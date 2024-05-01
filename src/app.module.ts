import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './Authentication-Managment/Infracstruture/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypesModule } from './Authentication-Managment/Infracstruture/user-types.module';
import { UserModule } from './Authentication-Managment/Infracstruture/user.module';


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
      synchronize: true, 
      logging:true, 
    }),    
    UserModule, 
    AccountModule, UserTypesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
