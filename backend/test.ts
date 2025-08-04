

function firstUniqueChar(s: string): string {
    const charCount: { [key: string]: number } = {};

    // Count the occurrences of each character
    for (const char of s) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    // Find the first unique character
    for (let i = 0; i < s.length; i++) {
        if (charCount[s[i]] === 1) {
            return s[i];
        }
    }

    return '';
}

// Testes
console.log(firstUniqueChar("leetcode")); // "l"
console.log(firstUniqueChar("loveleetcode")); // "v"
console.log(firstUniqueChar("aabb")); // ""
console.log(firstUniqueChar("")); // ""