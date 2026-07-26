import * as fs from "fs";
import * as path from "path";

// Helper regex to strip all emoji characters
function stripEmojis(text: string): string {
  return text
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, '')
    .replace(/📌|💡|🎯|⚠️|📝|❌|✅|🐍|⚡|🌐|🎨|⚛️|🗄️|🚀|💚|☁️|📦|🌿|📡|🏛️|🐘|🧠|💻/g, '')
    .trim();
}

function refactorHtmlHeader(html: string): string {
  let cleaned = html;
  
  // Replace emoji headings with clean, professional enterprise headers
  cleaned = cleaned.replace(/<h4>.*?What is it\?.*?<\/h4>/gi, '<h4 class="text-base font-bold text-[var(--foreground)] mt-4 mb-2">Concept Overview</h4>');
  cleaned = cleaned.replace(/<h4>.*?Daily Life Example.*?<\/h4>/gi, '<h4 class="text-base font-bold text-[var(--foreground)] mt-4 mb-2">Real-World Analogy</h4>');
  cleaned = cleaned.replace(/<h4>.*?Real-World Usage.*?<\/h4>/gi, '<h4 class="text-base font-bold text-[var(--foreground)] mt-4 mb-2">Industry Application</h4>');
  cleaned = cleaned.replace(/<h4>.*?Common Mistake.*?<\/h4>/gi, '<h4 class="text-base font-bold text-[var(--foreground)] mt-4 mb-2">Common Pitfalls & Fixes</h4>');
  cleaned = cleaned.replace(/<h4>.*?Quick Task.*?<\/h4>/gi, '<h4 class="text-base font-bold text-[var(--foreground)] mt-4 mb-2">Practice Exercise</h4>');
  
  // Strip any remaining emojis inside list items
  cleaned = stripEmojis(cleaned);

  // Clean up formatting indicators like "Mistake:" and "Fix:" to be clean bold labels
  cleaned = cleaned.replace(/Mistake:/gi, '<strong>Incorrect:</strong>');
  cleaned = cleaned.replace(/Fix:/gi, '<strong>Correct:</strong>');

  return cleaned;
}

function processAllFiles() {
  const dataDir = path.join(process.cwd(), "scripts", "data");
  if (!fs.existsSync(dataDir)) return;

  const files = fs.readdirSync(dataDir).filter(f => f.startsWith("knowledge_") && f.endsWith(".json"));

  let totalLessonsProcessed = 0;

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(content);

    if (!Array.isArray(data) || data.length === 0) continue;

    for (const topic of data) {
      if (topic.title) topic.title = stripEmojis(topic.title);
      if (topic.description) topic.description = stripEmojis(topic.description);

      if (Array.isArray(topic.lessons)) {
        for (const lesson of topic.lessons) {
          if (lesson.title) lesson.title = stripEmojis(lesson.title);
          if (lesson.explanationHtml) {
            lesson.explanationHtml = refactorHtmlHeader(lesson.explanationHtml);
          }
          totalLessonsProcessed++;
        }
      }
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Refactored & sanitized emojis in ${file}`);
  }

  console.log(`Successfully refactored ${totalLessonsProcessed} lessons across all knowledge batches!`);
}

processAllFiles();
