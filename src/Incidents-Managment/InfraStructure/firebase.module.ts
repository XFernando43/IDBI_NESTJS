import { Module } from "@nestjs/common";
import { FirebaseService } from "../Application/Service/firebase.service";

@Module({
    providers: [FirebaseService],
    exports:[FirebaseService]
})
export class FirebaseModule{}