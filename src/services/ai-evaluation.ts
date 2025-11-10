import { AIEvaluation, GitHubStats } from '@/types'

/**
 * Mock AI evaluation for project quality
 * In production, this would use OpenAI API to analyze:
 * - README quality and documentation
 * - Code structure and patterns
 * - Project originality and innovation
 * - Test coverage and CI/CD setup
 */
export async function evaluateProjectQuality(
  githubStats: GitHubStats
): Promise<AIEvaluation> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 150))

  const { topLanguages, repoQualityScore, publicRepos, totalStars } = githubStats

  // Mock originality based on diversity of languages and repo quality
  const languageCount = Object.keys(topLanguages).length
  const projectOriginality = Math.min(
    100,
    (languageCount * 10) + (repoQualityScore / 10) + (publicRepos * 2)
  )

  // Mock documentation quality based on repo quality and stars
  const documentationQuality = Math.min(
    100,
    (repoQualityScore / 5) + (totalStars / 10) + (publicRepos * 3)
  )

  // Mock code quality score
  const codeQuality = Math.min(
    100,
    (repoQualityScore / 3) + (totalStars / 5)
  )

  // Mock innovation score based on stars and repo diversity
  const innovationScore = Math.min(
    100,
    (totalStars / 20) + (languageCount * 8) + (publicRepos * 1.5)
  )

  return {
    projectOriginality: Math.round(projectOriginality),
    documentationQuality: Math.round(documentationQuality),
    codeQuality: Math.round(codeQuality),
    innovationScore: Math.round(innovationScore),
  }
}

/**
 * Future implementation with Google Gemini API
 * Uncomment when GEMINI_API_KEY is configured
 */
/*
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

export async function evaluateProjectQualityWithGemini(
  githubUsername: string,
  repoData: any[]
): Promise<AIEvaluation> {
  const prompt = `Analyze this developer's GitHub profile and rate the following (0-100):
1. Project Originality: How unique and innovative are their projects?
2. Documentation Quality: How well-documented are their repositories?
3. Code Quality: Based on repo structure, naming, and organization
4. Innovation Score: Overall technical innovation and creativity

GitHub Username: ${githubUsername}
Repos: ${JSON.stringify(repoData.slice(0, 5))}

Respond in JSON format: { "projectOriginality": number, "documentationQuality": number, "codeQuality": number, "innovationScore": number }`

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 1,
        maxOutputTokens: 512,
      }
    })
  })

  const data = await response.json()
  const text = data.candidates[0]?.content?.parts[0]?.text || '{}'
  
  // Extract JSON from response (Gemini might wrap it in markdown)
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  const jsonStr = jsonMatch ? jsonMatch[0] : text
  
  return JSON.parse(jsonStr)
}
*/
