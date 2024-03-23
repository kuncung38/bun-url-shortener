export const generateHTML = (link: string) => {
  return `
    <section 
      id="result"
      class="mt-32 w-fit border-slate-20 overflow-hidden border pl-2 rounded-full flex items-center gap-2"
    >
      <p id="url" class="px-1">${link}</p>

      <div 
        class="bg-slate-200 py-3 px-6 cursor-pointer btn relative left-1" hx-on="click: copyText()">
        Copy
      </div>
    </section>
  `;
};
