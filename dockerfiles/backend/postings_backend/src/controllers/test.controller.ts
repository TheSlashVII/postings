import { Controller, Get, Post, Body } from "@nestjs/common";
import { TestService } from "../services/test.services.js";
@Controller("test")
export class TestController {
  // injects the service to the controller. This allows to use the methods to retrieve the data
  // The service is equivalent to the Model in MVP Arquitecture
  constructor(private testService: TestService) { }

  @Get("hello")
  getHello() {
    return "hello world my people"
  }
  @Get("hello2")
  getHello2() {
    return this.testService.getGreetings()
  }

  @Post("pt")
  postTest(@Body("name") name: string) {
    return `Hello ${name}`

  }
}
