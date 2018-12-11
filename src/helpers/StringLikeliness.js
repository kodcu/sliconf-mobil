/**
 * Calculates likeleness of 2 strings
 * Returns 1 for matching strings 
 * Returns number between 1 - 0 for similar string. 
 * The more similar the strings higher the number will be.
 * Returns 0 for not matching strings
 * @param {string} compared string to compare
 * @param {string} code input code
 * @returns {number} Returns a number between 1 and 0;
 */
function Similarity(compared, code) {
	if (compared.length === 0 || code.length === 0) return 0.0; //String to compare is empty
	if (code.length >= compared.length) {		
		const distance = code.length - Distance(code.toLowerCase(), compared.toLowerCase());
		return Number(distance / parseFloat(code.length));
	}
	const distance = compared.length - Distance(compared.toLowerCase(), code.toLowerCase());
	return Number(distance / parseFloat(compared.length));	
}

/**
 * Compares each string one by one to calculate 
 * costed dist of each char.
 * @param {string} longest 
 * @param {string} shortest 
 */
function Distance(longest, shortest) {
	const costs = [];
	for (let i = 0; i <= longest.length; i++) {
		let initial = i;
		for (let j = 0; j <= shortest.length; j++) {
			if (i === 0) costs[j] = j;
			else if (j > 0) {
				let value = costs[j - 1];
				if (longest.charAt(i - 1) !== shortest.charAt(j - 1))
					value = Math.min(
						Math.min(value, initial),
						costs[j]
					) + 1;
				costs[j - 1] = initial;
				initial = value;
			}
		}
		if (i > 0) costs[shortest.length] = initial;
	}
	return costs[shortest.length];
}

export default Similarity;
