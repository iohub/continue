// Generated by continue
import { ChatMessage, MessagePart } from "../index.js";
import {
  compileChatMessages,
  countTokens,
  countTokensAsync,
  pruneLinesFromBottom,
  pruneLinesFromTop,
  pruneRawPromptFromTop,
  pruneStringFromBottom,
  pruneStringFromTop,
} from "./countTokens.js";

describe.skip("countTokens", () => {
  it("should count tokens for a simple string", () => {
    const content = "Hello world!";
    const tokenCount = countTokens(content, "gpt-4");
    expect(tokenCount).toBeGreaterThan(0);
  });

  it("should count tokens for an array of MessagePart", () => {
    const content: MessagePart[] = [{ type: "text", text: "Hello world!" }];
    const tokenCount = countTokens(content, "gpt-4");
    expect(tokenCount).toBeGreaterThan(0);
  });
});

describe.skip("countTokensAsync", () => {
  it("should count tokens asynchronously for a simple string", async () => {
    const content = "Hello world!";
    const tokenCount = await countTokensAsync(content, "gpt-4");
    expect(tokenCount).toBeGreaterThan(0);
  });

  it("should count tokens asynchronously for an array of MessagePart", async () => {
    const content: MessagePart[] = [{ type: "text", text: "Hello world!" }];
    const tokenCount = await countTokensAsync(content, "gpt-4");
    expect(tokenCount).toBeGreaterThan(0);
  });
});

describe.skip("pruneLinesFromTop", () => {
  it("should prune lines from the top to fit within max tokens", () => {
    const prompt = "Line 1\nLine 2\nLine 3\nLine 4";
    const pruned = pruneLinesFromTop(prompt, 5, "gpt-4");
    expect(pruned.split("\n").length).toBeLessThan(prompt.split("\n").length);
  });
});

describe.skip("pruneLinesFromBottom", () => {
  it("should prune lines from the bottom to fit within max tokens", () => {
    const prompt = "Line 1\nLine 2\nLine 3\nLine 4";
    const pruned = pruneLinesFromBottom(prompt, 5, "gpt-4");
    expect(pruned.split("\n").length).toBeLessThan(prompt.split("\n").length);
  });
});

describe.skip("pruneRawPromptFromTop", () => {
  it("should prune string from the top based on maxTokens", () => {
    const result = pruneRawPromptFromTop("gpt-4", 5, "Hello world!", 2);
    expect(result.length).toBeLessThan("Hello world!".length);
  });
});

describe.skip("pruneStringFromTop", () => {
  it("should prune string from the top based on maxTokens", () => {
    const result = pruneStringFromTop("gpt-4", 5, "Hello world!");
    expect(result.length).toBeLessThan("Hello world!".length);
  });
});

describe.skip("pruneStringFromBottom", () => {
  it("should prune string from the bottom based on maxTokens", () => {
    const result = pruneStringFromBottom("gpt-4", 5, "Hello world!");
    expect(result.length).toBeLessThan("Hello world!".length);
  });
});

describe.skip("compileChatMessages", () => {
  it("should compile and handle an empty or undefined message list", () => {
    const compiled = compileChatMessages("gpt-4", undefined, 100, 50, false);
    expect(compiled.length).toBe(0);
  });

  it("should compile chat messages without truncating if within context length", () => {
    const msgs: ChatMessage[] = [
      { role: "user", content: "Hello world!" },
      { role: "assistant", content: "Hi there!" },
    ];
    const compiled = compileChatMessages("gpt-4", msgs, 100, 10, false);
    expect(compiled.length).toBe(2);
  });

  it("should throw an error if maxTokens is close to or exceeds contextLength", () => {
    expect(() => {
      compileChatMessages("gpt-4", [], 100, 90, false);
    }).toThrow();
  });

  it("should filter out any empty or system messages", () => {
    const msgs: ChatMessage[] = [
      { role: "system", content: "" },
      { role: "user", content: "" },
      { role: "assistant", content: "Hi there!" },
    ];
    const compiled = compileChatMessages("gpt-4", msgs, 100, 10, false);
    expect(compiled.length).toBe(1);
  });
});