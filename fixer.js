const fs = require('fs');
let content = fs.readFileSync('src/app/components/resume-preview.ts', 'utf8');

let lines = content.split('\n');
let cases = [];
let currentCase = null;
let currentContent = '';

lines.forEach(line => {
  if (line.includes('@case (')) {
     if (currentCase) cases.push({name: currentCase, text: currentContent});
     currentCase = line.match(/@case \('([^']+)'\)/)[1];
     currentContent = '';
  } else {
     if (currentCase) currentContent += line + '\n';
  }
});
if (currentCase) cases.push({name: currentCase, text: currentContent});

cases.forEach(c => {
   let text = c.text;
   let divs = (text.match(/<div/gi) || []).length;
   let endDivs = (text.match(/<\/div/gi) || []).length;
   let uls = (text.match(/<ul/gi) || []).length;
   let endUls = (text.match(/<\/ul/gi) || []).length;
   let lis = (text.match(/<li/gi) || []).length;
   let endLis = (text.match(/<\/li/gi) || []).length;

   if (divs !== endDivs || uls !== endUls || lis !== endLis) {
       let diffDiv = divs - endDivs;
       let diffUl = uls - endUls;
       let diffLi = lis - endLis;
       let fix = '';
       while(diffLi > 0) { fix += '</li>\n'; diffLi--; }
       while(diffUl > 0) { fix += '</ul>\n'; diffUl--; }
       while(diffDiv > 0) { fix += '</div>\n'; diffDiv--; }
       
       if (diffDiv < 0) {
           let r = text.lastIndexOf('</div>');
           while(diffDiv < 0 && r !== -1) {
              text = text.substring(0, r) + text.substring(r + 6);
              r = text.lastIndexOf('</div>');
              diffDiv++;
           }
       }
       
       let lastRightBrace = text.lastIndexOf('}');
       if (lastRightBrace !== -1) {
          text = text.substring(0, lastRightBrace) + fix + '\n' + text.substring(lastRightBrace);
       } else {
          text += '\n' + fix;
       }
       c.text = text;
   }
});

let out = lines.slice(0, lines.findIndex(l => l.includes('@case ('))).join('\n') + '\n';
cases.forEach(c => {
   out += `          @case ('${c.name}') {\n`;
   let text = c.text.trimEnd();
   if (!text.endsWith('}')) {
       text += '\n          }';
   }
   out += text + '\n';
});

let trailerIdx = lines.findIndex(l => l.includes('export class ResumePreviewComponent'));

out += '        }\n';
out += '      </div>\n';
out += '    </div>\n';
out += '  `\n';
out += '})\n';
out += lines.slice(trailerIdx).join('\n');

fs.writeFileSync('src/app/components/resume-preview.ts', out);
console.log('Fixed tags');
