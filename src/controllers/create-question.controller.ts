import { ConflictException, UseGuards, UsePipes } from "@nestjs/common";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { hash } from 'bcryptjs'
import {z} from 'zod'
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { AuthGuard } from "@nestjs/passport";

const createQuestionBodySchema = z.object({
  name: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>


@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionController {
  constructor(
    private prisma: PrismaService
  ){}

  @Post()
  @HttpCode(201)
  @UsePipes( new ZodValidationPipe(createQuestionBodySchema))
  async handle(@Body() body: CreateQuestionBodySchema) {
    const {name} = body


    // const userWithSameEmail = await this.prisma.user.findUnique({
    //   where: {
    //     email
    //   }
    // })

    // if(userWithSameEmail) {
    //   throw new ConflictException('User with same e-email address already exist')
    // }

    // const hashedPassword = await hash(password, 8)

    // await this.prisma.user.create({
    //   data: {
    //     name,
    //     email,
    //     password: hashedPassword
    //   }
    // })
    return name
  }
}