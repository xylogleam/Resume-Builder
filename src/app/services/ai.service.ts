import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private ai = new GoogleGenAI({ apiKey: typeof GEMINI_API_KEY !== 'undefined' ? GEMINI_API_KEY : '' });

  async generateSummary(jobTitle: string, skills: string[]): Promise<string> {
    if (!jobTitle) {
      throw new Error('Please enter a job title first.');
    }
    
    const prompt = `Write a professional resume summary for a ${jobTitle}. 
    Include these skills if relevant: ${skills.join(', ')}. 
    Keep it concise, impactful, and around 3-4 sentences. Do not include any introductory text, just the summary itself.`;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text || '';
    } catch (error) {
      console.error('AI Generation Error:', error);
      throw new Error('Failed to generate summary. Please try again.');
    }
  }
}
