const fs = require('fs');

let content = fs.readFileSync('src/app/components/resume-preview.ts', 'utf8');

let blocks = content.split('@case (');
for (let i = 1; i < blocks.length; i++) {
  let block = blocks[i];
  let themeNameMatch = block.match(/'([^']+)'\)/);
  let themeName = themeNameMatch ? themeNameMatch[1] : 'unknown';
  
  // Find the languages block
  let langStartRegex = /@if\s*\(\s*resume\(\)\.languages\.length > 0\s*\)\s*\{/;
  let langMatch = block.match(langStartRegex);
  
  if (langMatch) {
    let startIndex = langMatch.index;
    let openBraces = 0;
    let endIndex = startIndex;
    
    // Simple brace matcher
    for (let j = startIndex; j < block.length; j++) {
      if (block[j] === '{') openBraces++;
      if (block[j] === '}') {
        openBraces--;
        if (openBraces === 0) {
          endIndex = j;
          break;
        }
      }
    }
    
    let langCode = block.substring(startIndex, endIndex + 1);
    
    // Create reference code by replacing parts of langCode
    let refCode = langCode.replace(/resume\(\)\.languages/g, 'resume().references');
    refCode = refCode.replace(/languages\.length/g, 'references?.length');
    refCode = refCode.replace(/Languages/g, 'References');
    refCode = refCode.replace(/LANGUAGE SKILL/g, 'REFERENCES');
    refCode = refCode.replace(/Language/g, 'References');
    refCode = refCode.replace(/language/g, 'groups'); // icon
    
    // Replace the @for loop content
    let forStartRegex = /@for\s*\([^;]+;\s*track [^)]+\)\s*\{/;
    let forMatch = refCode.match(forStartRegex);
    if (forMatch) {
       let forStartIndex = forMatch.index;
       let forOpenBraces = 0;
       let forEndIndex = forStartIndex;
       for (let j = forStartIndex; j < refCode.length; j++) {
         if (refCode[j] === '{') forOpenBraces++;
         if (refCode[j] === '}') {
           forOpenBraces--;
           if (forOpenBraces === 0) {
             forEndIndex = j;
             break;
           }
         }
       }
       
       let innerHTML = `
         <div class="mb-2 w-full text-left">
           <div class="font-bold flex flex-wrap gap-1">{{lang.name}} <span class="font-normal opacity-80">{{lang.position}}</span></div>
           <div class="text-[0.85em] opacity-80">{{lang.company}}</div>
           <div class="text-[0.75em] opacity-70 flex flex-col mt-0.5">
             @if(lang.email){<span>{{lang.email}}</span>}
             @if(lang.phone){<span>{{lang.phone}}</span>}
           </div>
         </div>
       `;
       
       // Change lang variable binding to ref
       let beforeFor = refCode.substring(0, forStartIndex);
       let startFor = refCode.substring(forStartIndex, forEndIndex + 1);
       let afterFor = refCode.substring(forEndIndex + 1);

       startFor = startFor.replace(/@for\s*\([^;]+;\s*track [^)]+\)\s*\{[\s\S]*?\}/, 
           `@for (lang of resume().references; track lang.id) { ${innerHTML} }`
       );
       startFor = startFor.replace(/lang\./g, 'lang.'); // keeping lang as variable name for simplicity

       refCode = beforeFor + startFor + afterFor;
    }

    blocks[i] = block.substring(0, endIndex + 1) + '\n\n' + refCode + block.substring(endIndex + 1);
    console.log("Patched theme:", themeName);
  }
}

fs.writeFileSync('src/app/components/resume-preview.ts', blocks.join('@case ('));
console.log('Done!');
