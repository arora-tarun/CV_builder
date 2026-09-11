import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Briefcase,
  Calendar,
  Building,
  GraduationCap,
  Award,
  Code,
  FolderKanban,
  ExternalLink,
} from "lucide-react";

export default function ResumePreview({ content }) {
  if (!content) return null;

  const {
    basic = {},
    education = [],
    experience = [],
    projects = [],
    skills = [],
    certificates = [],
  } = content;

  return (
    <div className="bg-white border border-gray-300 p-8 font-sans text-gray-800 leading-relaxed">
      {/* Header */}
      <header className="border-b pb-4 mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-wide uppercase">
          {basic.name || "Your Name"}
        </h1>
        {basic.title && (
          <p className="text-sm tracking-wider uppercase text-gray-600">
            {basic.title}
          </p>
        )}
      </header>

      {/* Contact Info */}
      <section className="mb-6 text-sm">
        <div className="flex flex-wrap justify-center gap-4 text-gray-700">
          {basic.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {basic.email}
            </div>
          )}
          {basic.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {basic.phone}
            </div>
          )}
          {(basic.city || basic.address) && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {basic.city || basic.address}
            </div>
          )}
          {basic.socials?.linkedin && (
            <a
              href={basic.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-blue-600"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          )}
          {basic.socials?.github && (
            <a
              href={basic.socials.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-blue-600"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          )}
          {basic.socials?.portfolio && (
            <a
              href={basic.socials.portfolio}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-blue-600"
            >
              <Globe className="w-4 h-4" />
              Portfolio
            </a>
          )}
        </div>
      </section>

      {/* Profile Summary */}
      {basic.summary && (
        <section className="border-t border-gray-300 pt-4 mb-6">
          <h2 className="text-lg font-semibold mb-1 uppercase tracking-wide text-gray-800">
            Profile Summary
          </h2>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {basic.summary}
          </p>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-6 text-sm">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((e, i) => (
                  <div key={i}>
                    <p className="font-semibold text-gray-800">
                      {e.degree || "Degree"}
                    </p>
                    <p className="italic text-gray-600">
                      {e.institution || "Institution"}
                    </p>
                    <p className="text-gray-500">
                      {e.startYear} – {e.endYear || "Present"}
                    </p>
                    {e.percentage && (
                      <p className="text-gray-500">{e.percentage}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
                Skills
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-0.5">
                {skills.map((s, i) => (
                  <li key={i}>{s.name}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Certificates */}
          {certificates.length > 0 && (
            <section>
              <h2 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
                Certifications
              </h2>
              <ul className="list-disc list-inside space-y-1">
                {certificates.map((c, i) => (
                  <li key={i}>
                    <span className="font-medium">{c.name}</span>
                    {c.authority && (
                      <span className="text-gray-500"> – {c.authority}</span>
                    )}
                    {c.link && (
                      <a
                        href={c.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline ml-1"
                      >
                        View
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6 text-sm">
          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
                Work Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between">
                      <p className="font-semibold text-gray-800">
                        {exp.role || "Role"}
                      </p>
                      <p className="italic text-gray-500 text-sm">
                        {exp.startDate} – {exp.endDate || "Present"}
                      </p>
                    </div>
                    <p className="text-gray-700">
                      {exp.company && (
                        <span className="font-medium">{exp.company}</span>
                      )}
                      {exp.location && `, ${exp.location}`}
                    </p>
                    {exp.description && (
                      <ul className="list-disc list-inside mt-1 text-gray-700">
                        {exp.description
                          .split("\n")
                          .filter((d) => d.trim() !== "")
                          .map((line, idx) => (
                            <li key={idx}>{line}</li>
                          ))}
                      </ul>
                    )}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <p className="mt-1 text-gray-500 text-xs">
                        Tools: {exp.technologies.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-base font-semibold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between">
                      <p className="font-semibold text-gray-800">{p.title}</p>
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 text-xs flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View
                        </a>
                      )}
                    </div>
                    {p.description && (
                      <p className="text-gray-700 text-sm">{p.description}</p>
                    )}
                    {p.technologies && (
                      <p className="mt-1 text-xs text-gray-500">
                        Tech: {p.technologies.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}