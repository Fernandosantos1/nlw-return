import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbackRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedBackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedBackUseCase {
  constructor(
    private feedbacksRepository: FeedbackRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedBackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (screenshot && !screenshot.startsWith("data:image/png;base64"))
      throw new Error("Invalid screenshot format");

    if (!type) throw new Error("Type is required");

    if (!comment) throw new Error("Comment is required");

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo Feedback !!!",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo de de feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}"` : "",
        "</div>",
      ].join("\n"),
    });
  }
}
