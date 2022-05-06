import { SubmitFeedBackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedBackUseCase = new SubmitFeedBackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedBackUseCase.execute({
        type: "BUG",
        comment: "test",
        screenshot: "data:image/png;base64test",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });
  it("should not be able to submit without a type", async () => {
    const submitFeedBackUseCase = new SubmitFeedBackUseCase(
      { create: async () => {} },
      { sendMail: async () => {} }
    );

    await expect(
      submitFeedBackUseCase.execute({
        type: "",
        comment: "test",
        screenshot: "data:image/png;base64test",
      })
    ).rejects.toThrow();
  });
  it("should not be able to submit without a comment", async () => {
    const submitFeedBackUseCase = new SubmitFeedBackUseCase(
      { create: async () => {} },
      { sendMail: async () => {} }
    );

    await expect(
      submitFeedBackUseCase.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64test",
      })
    ).rejects.toThrow();
  });
  it("should not be able to submit with an invalid image", async () => {
    const submitFeedBackUseCase = new SubmitFeedBackUseCase(
      { create: async () => {} },
      { sendMail: async () => {} }
    );

    await expect(
      submitFeedBackUseCase.execute({
        type: "BUG",
        comment: "Test",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
