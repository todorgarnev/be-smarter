export const numberOfCorrectAnswers = (userAnswers: string[], correctAnswers: string[]): number => {
	let correctCount = 0;

	for (const answer of userAnswers) {
		if (correctAnswers.includes(answer)) {
			correctCount++;
		}
	}

	return correctCount;
};
