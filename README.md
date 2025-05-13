# What Did I Just Read? – AI Reader's Learning Assistant

**“What Did I Just Read?”** is a learning assistant designed for diverse learners who struggle with traditional reading. It helps users process dense academic or informational text by instantly transforming it into **casual summaries** and **flowchart-style visualizations** through the power of AI.

This project is designed to be a resume-ready demonstration of modern LLM workflows, multimodal output design, and accessibility-focused UX, with the potential to grow into a fully-featured educational tool.

## Problem & Purpose

People with learning disabilities, ADHD, or other nerodiverse conditions often find themselves re-reading the same paragraph multiple times, zoning out, or struggling to absorb written content presented in rigid formats. This tool solves that by:

- Rewriting dense material into **approachable summaries**
- Generating **visual diagrams** of key concepts
- Optionally offering **audio playback** for auditory learners
- Storing sessions in a simple **user dashboard**

## Features (MVP)

| Feature                 | Status  | Description                                                                 |
|------------------------|---------|-----------------------------------------------------------------------------|
| Casual Summary       | COMPLETE | Uses GPT-3.5 to rewrite text in relaxed, accessible language               |
| Visual Diagram (Flowchart) | Planned | Converts key ideas into Mermaid.js diagrams                                |
| Open Source TTS      | Planned | Optional playback of summaries using free browser or Python-based TTS      |
| User Accounts        | Planned | Firebase Auth for email-based login/signup                                 |
| Session Storage      | Planned | Saves summaries + diagrams per user in Firestore for review later          |

## Tech Stack & Design Justifications

| Layer        | Tech                          | Reasoning                                                                 |
|--------------|-------------------------------|---------------------------------------------------------------------------|
| **Frontend** | React + Tailwind CSS          | React offers flexibility; Tailwind enables clean UI with low friction     |
| **Backend**  | Node.js + Express             | Easy integration with React; popular for web APIs                         |
| **LLM**      | OpenAI GPT-3.5 (default), GPT-4 (optional) | GPT-3.5 is low-cost, powerful; GPT-4 can be swapped in if needed         |
| **Visuals**  | Mermaid.js                    | Renders flowcharts in-browser from text-based syntax                      |
| **TTS**      | Open Source (e.g., pyttsx3 or gTTS, still deciding) | Keeps the stack free and lightweight for prototyping                     |
| **Auth**     | Firebase Auth                 | Easy user management + optional social login support                      |
| **Storage**  | Firebase Firestore            | Fast, serverless NoSQL DB for storing sessions per user                  |
| **Deployment** | Vercel (Frontend) + Render or Railway (Backend) | Simple to set up and scalable for small projects                       |

## Example Flow (Planned)

1. User logs in and pastes a dense block of text.
2. App sends the input to the backend.
3. Backend uses GPT-3.5 to:
   - Generate a casual TL;DR summary
   - Extract key relationships for diagram
4. Mermaid.js renders the diagram in-browser.
5. Optional: Summary converted to audio and played back.
6. Session is stored and accessible from the user’s dashboard.

## Example Input & Output

**Input:** "In classical conditioning, a neutral stimulus paired with an unconditioned stimulus becomes a conditioned stimulus that elicits a response."

**Outputs (Prospective):**
- **Summary:** When you hear the ice cream truck song and start drooling - yep, that’s conditioning.
- **Visual Map:** [Neutral Stimulus] + [UCS] → [CS] → [Response]
- **Audio Clip:** Plays 30 sec version of the summary
- **Quiz:** What does a neutral stimulus become? → Conditioned Stimulus

## Status

Currently in the planning phase, so finalizing my tech stack and project setup.

## Future Directions

- Add quiz generation for comprehension checks  
- Let users customize how content is explained (e.g., story, metaphor, step-by-step)  
- Upload PDFs or slides and summarize sections in bulk  
- Chrome extension for summarizing web content instantly  
- Swap in Claude, Mistral, or open-source models using a pluggable architecture 

## Contributing

This is an open project! If you have feedback, suggestions, or want to collaborate on UX or accessibility improvements, feel free to open an issue or PR.

## Inspiration

Inspired by my own struggles with finding learning solutions that work for me and the amazing learning experience offered by tools like [Brilliant.org](https://brilliant.org). This project aims to make learning feel rewarding and accessible, not exhausting.

## About the Author

Built by Jazmin Tweedle, a Software Engineer & AI Enthusiast. Jazmin got her start from a coding bootcamp at Northwestern, then worked at her first full-time SWE role at Google through their apprenticeship program. She's now looking for a full-time role post-apprenticeship where she can create great user experiences.
