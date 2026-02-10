export interface Scenario {
    id: string;
    label: string; // The text shown in dropdown
    tokens: string[]; // Top 10 tokens
    baseLogits: number[]; // Base scores to simulate probability distribution
}

// Helper to generate descending logits
const generateLogits = (count: number, steepness: number = 1): number[] => {
    return Array.from({ length: count }, (_, i) => 10 - (i * steepness));
};

export const SCENARIOS: Scenario[] = [
    {
        id: 'cat-sat',
        label: 'The cat sat on the.....',
        tokens: ['Mat', 'Floor', 'Rug', 'Dog', 'Pizza', 'Table', 'Bed', 'Couch', 'Chair', 'Box'],
        // Configured so Mat(14.0) and Floor(13.8) are highest and close.
        // Rug(12.5) and Dog(11.0) are high but lower.
        // Furniture items (8.0 down to 7.2) are significantly lower than top tier, but much higher than Pizza.
        // Pizza(0.1) is the absolute lowest.
        baseLogits: [14.0, 13.8, 12.5, 11.0, 0.1, 8.0, 7.8, 7.6, 7.4, 7.2]
    },
    {
        id: 'roses',
        label: 'Roses are red, violets are...',
        tokens: ['blue', 'purple', 'violet', 'red', 'white', 'pink', 'yellow', 'orange', 'green', 'black'],
        baseLogits: [10, 8, 7, 4, 3, 2, 1.5, 1, 0.5, 0.1]
    },
    {
        id: 'once-upon',
        label: 'Once upon a time, there was a...',
        tokens: ['princess', 'king', 'little', 'prince', 'kingdom', 'dragon', 'time', 'girl', 'boy', 'man'],
        baseLogits: [8, 7.5, 6, 5, 4, 3.5, 3, 2, 1, 0.5]
    },
    {
        id: 'quick-fox',
        label: 'The quick brown fox jumps over the lazy...',
        tokens: ['dog', 'cat', 'fox', 'log', 'frog', 'river', 'fence', 'moon', 'grass', 'stone'],
        baseLogits: [15, 6, 4, 3, 2, 1.5, 1, 0.5, 0.2, 0.1]
    },
    {
        id: 'stormy-night',
        label: 'It was a dark and stormy night, the rain was falling and the wind was...',
        tokens: ['howling', 'blowing', 'whistling', 'cold', 'strong', 'loud', 'roaring', 'wet', 'silent', 'gone'],
        baseLogits: [10, 9, 5, 4, 3, 2, 1.5, 1, 0.5, 0.1]
    },
    {
        id: 'sun-shining',
        label: 'The sun was shining, the birds were singing, and the flowers were...',
        tokens: ['blooming', 'growing', 'bright', 'beautiful', 'opening', 'colorful', 'smelling', 'dancing', 'everywhere', 'alive'],
        baseLogits: [11, 8, 5, 4, 3, 2, 1.5, 1, 0.5, 0.1]
    }
];