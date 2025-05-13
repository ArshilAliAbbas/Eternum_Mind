// Utility functions for the MoodTracker component

/**
 * Generate a deterministic "random" number based on a seed
 * This ensures the same values are generated on both server and client
 */
export function seededRandom(seed: number): () => number {
  return function() {
    // Simple xorshift algorithm
    let state = seed;
    state ^= state << 13;
    state ^= state >> 17;
    state ^= state << 5;
    
    // Normalize to [0, 1)
    const result = ((state >>> 0) / 4294967296);
    
    // Update seed for next call
    seed = state;
    
    return result;
  };
}

/**
 * Generate animation properties for particles
 * Using a seed ensures consistency between server and client rendering
 * @param index - The index of the particle
 * @param total - The total number of particles
 * @param context - Optional context to generate different values for different components
 */
export function generateParticleProps(index: number, total: number, context?: string) {
  // Create a unique seed for each particle based on its index and context
  const contextValue = context ? context.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
  const seed = 42 + (index * 1000) + contextValue;
  const random = seededRandom(seed);
  
  // Generate deterministic values
  const left = random() * 100;
  const top = random() * 100;
  const duration = 5 + random() * 10; // Longer duration for main particles
  const delay = random() * 5;
  
  return {
    left,
    top,
    duration,
    delay
  };
}
