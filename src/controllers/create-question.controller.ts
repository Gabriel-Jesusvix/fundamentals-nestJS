import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/auth/current-user-decorator";
import { UserPayload } from "src/auth/jwt-strategy";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>


@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionController {
  constructor(
    private prisma: PrismaService
  ) { }

  @Post()
  @HttpCode(201)
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(new ZodValidationPipe(createQuestionBodySchema)) body: CreateQuestionBodySchema
  ) {
    const { title, content } = body
    const userId = user.sub
    const slug = this.convertToSlug(title)

    await this.prisma.question.create({
      data: {
        userId,
        title,
        content,
        slug: slug
      }
    })
  }

  
  private convertToSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
  }
}