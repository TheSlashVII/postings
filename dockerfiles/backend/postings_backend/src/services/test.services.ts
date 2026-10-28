import { Injectable } from "@nestjs/common";

// services are the files that provide the data from the sources for example: databases 
@Injectable()
export class TestService {
  getGreetings(): string {
    return "whassup my people"
  }


}
