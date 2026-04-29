import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { QuizPanel } from "@/components/QuizPanel";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { getQuiz } from "@/data/quizzes";
import type { ReactNode } from "react";

vi.mock("canvas-confetti", () => ({ default: vi.fn() }));
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

function Wrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

function renderQuiz(gameId = "make-your-own-matter" as const) {
  return render(
    <Wrapper>
      <QuizPanel gameId={gameId} />
    </Wrapper>,
  );
}

// Select an option button by the visible option text
function optionByText(text: string) {
  return screen.getByRole("button", { name: new RegExp(text, "i") });
}

const Q = getQuiz("make-your-own-matter", "en");
const CORRECT_TEXT = Q[0].options[Q[0].correctIndex];
const WRONG_TEXT = Q[0].options[Q[0].correctIndex === 0 ? 1 : 0];

beforeEach(() => {
  localStorage.clear();
  vi.useFakeTimers();
});

afterEach(() => {
  act(() => vi.runAllTimers());
  vi.useRealTimers();
  vi.restoreAllMocks();
});

// ─── Rendering ────────────────────────────────────────────────────────────────

describe("initial render", () => {
  it("shows the first question text", () => {
    renderQuiz();
    expect(screen.getByText(Q[0].question)).toBeInTheDocument();
  });

  it("renders all 4 option texts", () => {
    renderQuiz();
    Q[0].options.forEach((opt) => {
      expect(screen.getByText(opt)).toBeInTheDocument();
    });
  });

  it("shows the hint by default", () => {
    renderQuiz();
    expect(screen.getByText(Q[0].hint)).toBeInTheDocument();
  });

  it("shows 'Hide hint' on the toggle button when hint is visible", () => {
    renderQuiz();
    expect(screen.getByRole("button", { name: /hide hint/i })).toBeInTheDocument();
  });
});

// ─── Collapse / expand ────────────────────────────────────────────────────────

describe("collapse and expand", () => {
  it("collapses when the minus button is clicked", () => {
    renderQuiz();
    fireEvent.click(screen.getByRole("button", { name: /collapse quiz/i }));
    expect(screen.getByRole("button", { name: /expand quiz/i })).toBeInTheDocument();
    expect(screen.queryByText(Q[0].question)).not.toBeInTheDocument();
  });

  it("expands again after collapsing", () => {
    renderQuiz();
    fireEvent.click(screen.getByRole("button", { name: /collapse quiz/i }));
    fireEvent.click(screen.getByRole("button", { name: /expand quiz/i }));
    expect(screen.getByText(Q[0].question)).toBeInTheDocument();
  });
});

// ─── Hint toggle ──────────────────────────────────────────────────────────────

describe("hint toggle", () => {
  it("hides the hint when 'Hide hint' is clicked", () => {
    renderQuiz();
    fireEvent.click(screen.getByRole("button", { name: /hide hint/i }));
    expect(screen.queryByText(Q[0].hint)).not.toBeInTheDocument();
  });

  it("shows 'Show hint' after hiding", () => {
    renderQuiz();
    fireEvent.click(screen.getByRole("button", { name: /hide hint/i }));
    expect(screen.getByRole("button", { name: /show hint/i })).toBeInTheDocument();
  });

  it("shows the hint again when 'Show hint' is clicked", () => {
    renderQuiz();
    fireEvent.click(screen.getByRole("button", { name: /hide hint/i }));
    fireEvent.click(screen.getByRole("button", { name: /show hint/i }));
    expect(screen.getByText(Q[0].hint)).toBeInTheDocument();
  });
});

// ─── Wrong answer ─────────────────────────────────────────────────────────────

describe("wrong answer", () => {
  it("shows 'Not quite' feedback after a wrong answer", () => {
    renderQuiz();
    act(() => { fireEvent.click(optionByText(WRONG_TEXT)); });
    expect(screen.getByText(/not quite/i)).toBeInTheDocument();
  });

  it("disables the clicked wrong option", () => {
    renderQuiz();
    act(() => { fireEvent.click(optionByText(WRONG_TEXT)); });
    expect(optionByText(WRONG_TEXT)).toBeDisabled();
  });

  it("does not advance to the next question after a wrong answer", () => {
    renderQuiz();
    act(() => {
      fireEvent.click(optionByText(WRONG_TEXT));
      vi.runAllTimers();
    });
    expect(screen.getByText(Q[0].question)).toBeInTheDocument();
  });

  it("leaves the correct option still enabled after a wrong answer", () => {
    renderQuiz();
    act(() => { fireEvent.click(optionByText(WRONG_TEXT)); });
    expect(optionByText(CORRECT_TEXT)).not.toBeDisabled();
  });
});

// ─── Correct answer ───────────────────────────────────────────────────────────

describe("correct answer", () => {
  it("hides 'Not quite' after the correct answer is chosen", () => {
    renderQuiz();
    act(() => { fireEvent.click(optionByText(WRONG_TEXT)); });
    act(() => { fireEvent.click(optionByText(CORRECT_TEXT)); });
    expect(screen.queryByText(/not quite/i)).not.toBeInTheDocument();
  });

  it("advances to question 2 after the 800ms delay", () => {
    renderQuiz();
    act(() => {
      fireEvent.click(optionByText(CORRECT_TEXT));
      vi.advanceTimersByTime(800);
    });
    expect(screen.getByText(Q[1].question)).toBeInTheDocument();
  });

  it("locks all other options once the correct answer is picked", () => {
    renderQuiz();
    act(() => { fireEvent.click(optionByText(CORRECT_TEXT)); });
    Q[0].options.forEach((opt) => {
      if (opt !== CORRECT_TEXT) expect(optionByText(opt)).toBeDisabled();
    });
  });
});

// ─── Hint persists across questions ──────────────────────────────────────────

describe("hint persistence", () => {
  it("keeps hint hidden on the next question if hidden on the previous", () => {
    renderQuiz();
    fireEvent.click(screen.getByRole("button", { name: /hide hint/i }));
    act(() => {
      fireEvent.click(optionByText(CORRECT_TEXT));
      vi.advanceTimersByTime(800);
    });
    expect(screen.queryByText(Q[1].hint)).not.toBeInTheDocument();
  });

  it("keeps hint visible on the next question if visible on the previous", () => {
    renderQuiz();
    act(() => {
      fireEvent.click(optionByText(CORRECT_TEXT));
      vi.advanceTimersByTime(800);
    });
    expect(screen.getByText(Q[1].hint)).toBeInTheDocument();
  });
});

// ─── Quiz completion ──────────────────────────────────────────────────────────

describe("quiz completion", () => {
  function answerAllCorrect() {
    Q.forEach((q) => {
      act(() => {
        fireEvent.click(optionByText(q.options[q.correctIndex]));
        vi.advanceTimersByTime(800);
      });
    });
  }

  it("shows the completion screen after all 5 questions", () => {
    renderQuiz();
    answerAllCorrect();
    expect(screen.getByText(/أحسنت|well done|you earned/i)).toBeInTheDocument();
  });

  it("shows the 'Back to topic' link on the completion screen", () => {
    renderQuiz();
    answerAllCorrect();
    expect(screen.getByRole("link", { name: /back to topic/i })).toBeInTheDocument();
  });

  it("awards 3 stars for all correct on first attempt", () => {
    renderQuiz();
    answerAllCorrect();
    const stored = JSON.parse(localStorage.getItem("tajruba.progress")!);
    expect(stored.games["make-your-own-matter"].stars).toBe(3);
  });

  it("awards fewer stars when a wrong answer is given on the first question", () => {
    renderQuiz();
    // Wrong first on Q1
    act(() => { fireEvent.click(optionByText(WRONG_TEXT)); });
    // Then correct for all 5
    answerAllCorrect();
    const stored = JSON.parse(localStorage.getItem("tajruba.progress")!);
    expect(stored.games["make-your-own-matter"].stars).toBeLessThan(3);
  });
});
