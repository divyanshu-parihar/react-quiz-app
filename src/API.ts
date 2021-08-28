import { ArrayShuffle } from "./utils";

export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "Hard",
}

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: Difficulty;
  incorrect_answers: string[];
  question: string;
  type: string;
};
export type QuestionState = Question & {answers:string[]}

export const fetchQeustionFromAPI = async (
  numberOfQuestions: number,
  difficulty: Difficulty
): Promise<QuestionState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${numberOfQuestions}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question:Question)=>({
      ...question,
      answers:ArrayShuffle([...question.incorrect_answers,question.correct_answer])
  }))
};
