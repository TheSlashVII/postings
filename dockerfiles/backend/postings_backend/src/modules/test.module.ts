import { Module } from '@nestjs/common';
// import { CatsController } from './cats.controller.js';
// import { CatsService } from './cats.service.js';
import { TestController } from '../controllers/test.controller.js';
import { TestService } from '../services/test.services.js';
@Module({
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule { }

