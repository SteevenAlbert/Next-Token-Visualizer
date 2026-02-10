export interface TokenProb {
    token: string;
    originalIndex: number;
    probability: number;
    active: boolean; // Whether it survives filtering
}

/**
 * Calculates the distribution of probabilities based on logits, temperature, topK, and topP.
 */
export const calculateDistribution = (
    tokens: string[],
    baseLogits: number[],
    temperature: number,
    topK: number,
    topP: number
): TokenProb[] => {
    // 1. Apply Temperature
    // Avoid division by zero, though min input is 0.01
    const safeTemp = Math.max(temperature, 0.01);
    
    // Normalize logits for numerical stability (subtract max)
    const maxLogit = Math.max(...baseLogits);
    const scaledLogits = baseLogits.map(l => (l - maxLogit) / safeTemp);
    
    // 2. Softmax
    const exps = scaledLogits.map(l => Math.exp(l));
    const sumExps = exps.reduce((a, b) => a + b, 0);
    let probs = exps.map((e, i) => ({
        token: tokens[i],
        originalIndex: i,
        probability: e / sumExps,
        active: true
    }));

    // 3. Sort by probability descending for filtering
    probs.sort((a, b) => b.probability - a.probability);

    // 4. Apply Top-K
    // Keep top K, set others to 0.
    // Note: The UI slider is 1-10.
    probs = probs.map((p, index) => {
        if (index >= topK) {
            return { ...p, active: false, probability: 0 };
        }
        return p;
    });

    // 5. Apply Top-P (Nucleus Sampling)
    // Filter the *remaining* active tokens based on cumulative probability
    let currentSum = 0;
    let cutoffIndex = -1;
    
    // We only consider tokens that passed Top-K
    const activeProbs = probs.filter(p => p.active);
    
    // Calculate renormalization factor for Top-K first to do fair Top-P check? 
    // Usually Top-P is applied on the distribution *after* temperature but *before* Top-K?
    // Or combined? The standard is usually: Apply both constraints.
    // Common implementations: Filter by Top-K, then Filter by Top-P on the remaining set (renormalized), OR filter on original set.
    // The visualizer description says: "When used with Top-K, only tokens that satisfy *both* conditions are kept."
    
    // Let's iterate through the sorted list.
    // If a token was already killed by Top-K, it stays killed.
    // For the survivors, we check cumulative sum.
    
    // Re-calculating sum of currently active to check top-P against the proper sum? 
    // Actually, Top-P is usually defined on the *sorted probability mass*.
    // We walk down the sorted list.
    // We include tokens until cumulative_prob >= P.
    
    // Let's reset the loop to apply Top-P logic on the original sorted list, 
    // but effectively intersecting with Top-K.
    
    // Reset probabilities for calculation (using the ones from step 2, sorted)
    // But we need to zero out those strictly excluded by Top-K first?
    // Let's assume standard implementation: 
    // 1. Sort. 
    // 2. Truncate at K. 
    // 3. Truncate at P (cumulative). 
    // 4. Renormalize.
    
    // Re-verify the sorted full list from step 3.
    probs.forEach((p, index) => {
        // Top-K check
        if (index >= topK) {
            p.active = false;
            p.probability = 0;
            return;
        }
        
        // Top-P check
        // If we haven't crossed the threshold yet, keep it.
        // We include the token that causes us to cross the threshold.
        if (currentSum < topP) {
            currentSum += p.probability;
            p.active = true;
        } else {
            p.active = false;
            p.probability = 0;
        }
    });

    // 6. Renormalize active probabilities
    const activeSum = probs.reduce((sum, p) => p.active ? sum + p.probability : sum, 0);
    
    if (activeSum > 0) {
        probs = probs.map(p => ({
            ...p,
            probability: p.active ? p.probability / activeSum : 0
        }));
    }

    return probs;
};