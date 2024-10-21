import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { Question as PrismaQuestion } from "@prisma/client";


export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuestion): Question {
    return Question.create({
      title: raw.title,
      content: raw.content,
      authorId: new UniqueEntityID(raw.userId),
      bestAnswerId: undefined,
      slug: Slug.create(raw.slug),
      createdAt: raw.createdAt,
      updatedAt: raw.updateddAt
    }, new UniqueEntityID(raw.id))
  }
}
