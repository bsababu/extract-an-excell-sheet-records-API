import { createParamDecorator } from "@nestjs/common";
import { User } from "./auth.entity";

// eslint-disable-next-line no-unused-vars
const getUser = createParamDecorator((data, req): User => {
    return req.user;
})