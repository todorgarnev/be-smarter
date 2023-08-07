export type Question = {
	answers: Answer[];
	correctAnswer: string;
	question: string;
};

type Answer = {
	id: string;
	answer: string;
};
