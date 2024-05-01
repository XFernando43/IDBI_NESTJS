import { Module } from '@nestjs/common';
import { CustomerController } from '../Application/Controllers/customer.controller';
import { CustomerService } from '../Application/Services/customer.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
