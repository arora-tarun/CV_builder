export const resumeHTML = (cv) => {
  const { basic, education, experience, skills, certificates } = cv.content;

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; }
      h1 { margin-bottom: 4px; }
      h2 { color: #4f46e5; margin-top: 20px; }
      p { margin: 4px 0; }
    </style>
  </head>
  <body>

    <h1>${basic.name || ""}</h1>
    <p>${basic.email || ""} | ${basic.phone || ""}</p>

    ${basic.summary ? `<h2>Summary</h2><p>${basic.summary}</p>` : ""}

    ${education.length ? `
      <h2>Education</h2>
      ${education.map(e => `<p>${e.degree} - ${e.institution}</p>`).join("")}
    ` : ""}

    ${experience.length ? `
      <h2>Experience</h2>
      ${experience.map(e => `
        <p><strong>${e.position}</strong> - ${e.company}</p>
        <p>${e.description || ""}</p>
      `).join("")}
    ` : ""}

    ${skills.length ? `
      <h2>Skills</h2>
      <p>${skills.map(s => s.name).join(", ")}</p>
    ` : ""}

    ${certificates.length ? `
      <h2>Certificates</h2>
      ${certificates.map(c => `<p>${c.name} - ${c.authority}</p>`).join("")}
    ` : ""}

  </body>
  </html>
  `;
};
