import express from "express";
import { SubmitFeedBackUseCase } from "./use-cases/submit-feedback-use-case";
import { PrismaFeedbackRepository } from "./repositories/prisma/prisma-feedback-repository";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedBackUseCase = new SubmitFeedBackUseCase(
    prismaFeedbackRepository,
    nodemailerMailAdapter
  );

  await submitFeedBackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});
