import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './Authentication-Managment/Infracstruture/customer.module';
import { AccountModule } from './Authentication-Managment/Infracstruture/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';


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
    CustomerModule, 
    AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
