# Portfolio content refresh — design

**Date:** 2026-09-25 · **Branch:** `content-refresh` · **Status:** written without a live review. "Decisions to confirm" lists every call made on Murtaza's behalf.

## Goal

The site still describes Murtaza as a job-seeking cloud engineer with three AWS certifications and four projects. Update every section so it matches the three documents in `docs/` (git-ignored, never committed):

- `MN_Resume_Cloud.pdf` — current resume, Aug 22
- `MN_Projects_LinkedIn.pdf` — LinkedIn projects export, Aug 17
- `LinkedIn_Profile.pdf` — LinkedIn profile export, Aug 9

Success means:

- Every claim about roles, dates, results, and tools traces to one of the three documents. Two pieces stay from the current site with no document source. One is the MS coursework line. The other is the problem statements and write-up angles for SavVio, Nuclear Shelter, and Kambaz, which agree with the documents.
- The project list is exactly the eight LinkedIn projects. GitHub supplies links only; no GitHub-only repo becomes a project.
- Every GitHub and demo link resolves.
- `next build` still produces the static export.

## Constraints

- **Stated in the request:** GitHub repos are not projects, only link targets. The three documents are the source of information.
- **Assumed:** keep the current visual design, colors, section order, and navigation. This is a content refresh, not a redesign.
- **Assumed:** never publish the phone number that appears in the resume and the LinkedIn export.

## Source precedence

When documents disagree, the newest wins: resume > projects export > profile export. Where one document adds detail the others don't contradict, merge it in (for example, EKS and CodePipeline at Bridge Informatics appear only on LinkedIn).

| Fact | Resume | LinkedIn | Site uses |
|---|---|---|---|
| Test coverage raised to | 94% | ~80% | 94% |
| MS end date | May 2027 | Dec 2027 | May 2027 |
| Bridge Informatics title | Cloud/DevOps Engineer | Cloud Engineer – Associate | Cloud/DevOps Engineer |
| Bridge Informatics location | Cambridge, MA | Boston, MA | Cambridge, MA |
| SOC-Claw date | January 2026 | Apr 2026 – Present | Apr 2026 – Present; the repo description dates the hackathon to April 25, 2026, so the resume date is a slip |
| AWS certification count | four listed | summary says three, list shows four | four |

## Approaches for the Projects section

Eight projects replace four.

1. **Four featured case-study cards plus a compact "More Projects" grid (chosen).** SOC-Claw, SavVio, Nuclear Shelter, and Kambaz keep the existing card design; the four older, smaller projects get short cards. The page grows modestly and the strongest work stays on top.
2. **Eight full case-study cards.** Gives 2020 coursework the same weight as a hackathon win and roughly doubles the section's length.
3. **One uniform compact grid.** Loses the problem, approach, and highlights depth the current design is built around.

## Section-by-section design

### Metadata — `src/app/layout.tsx`

- Title: `Murtaza Nipplewala | AI Software Engineer`.
- Description, also used for Open Graph: `AI Software Engineer at Bitcoin Culture Hub · MS CS @ Northeastern · 4× AWS Certified. I build AI-powered applications end to end, from LLM integrations to scalable cloud infrastructure.`

### Hero — `src/components/Hero.tsx`

- Kicker mirrors the LinkedIn headline: `AI Software Engineer · Cloud Engineer · DevOps Engineer · Solutions Architect`.
- Intro: `AI Software Engineer at Bitcoin Culture Hub · MS CS @ Northeastern · 4× AWS Certified. I build AI-powered applications end to end — from backend APIs and LLM integrations to the scalable cloud infrastructure they run on.`
- Buttons and social links are unchanged.

### Projects — `src/components/Projects.tsx`

**Data model.** `ProjectLink { label, href }` replaces the single `github` field, so a project can have zero, one, or several links.

- `FeaturedProject` has these fields: `id`, `title`, `tagline`, `period`, optional `affiliation`, optional `badge`, `problem`, `writeupAngle`, `description`, `highlights`, `techStack`, `links`, `color`.
- `OtherProject` has these fields: `id`, `title`, `tagline`, `period`, optional `affiliation`, `summary`, `techStack`, `links`.

**Featured projects, in order:**

1. **SOC-Claw / Blue Lantern.** Multi-Agent Incident Response Coordinator. Badge "Hackathon Winner · Red Hat". Apr 2026 – Present. Red gradient (`from-red-500 to-rose-400`), since the project uses a Red Hat theme.
2. **SavVio.** AI Financial Advocate. Jan 2026 – Present. Keeps its blue gradient.
3. **Nuclear Shelter Location by AI-Optimization.** Genetic Algorithm for NP-Hard Optimization. Jan 2026 – Apr 2026, Northeastern University. Keeps its green gradient.
4. **Kambaz.** Learning Management System. Sep 2025 – Dec 2025, Northeastern University. Keeps its violet gradient.

**More Projects:**

- AutoFinder: Jan 2025 – Apr 2025, Northeastern
- Libre Food Pantry: Jan 2022 – Jul 2022, Worcester State
- OP Credit: Jan 2021, Worcester State
- Car Insurance Report: Oct 2020 – Dec 2020, Worcester State

**Featured card changes.** The header gains a meta line (period · affiliation), an optional badge, and a row of link buttons.

- **Link labels:** `View on GitHub` when there's one repo. When there are several: `Live demo`, `Frontend repo`, `Backend repo`, `API repo`.
- **Accessible names:** each link's accessible name includes the project title, so screen readers don't hear a string of identical "View on GitHub" links.
- **Badge:** an amber pill (`border-amber-400/30 bg-amber-400/10 text-amber-300`), because white text on the red gradient would fail contrast.

**Compact cards.** Each shows the title, tagline, meta line, a one-to-two-sentence summary, tech tags, and text links. They have no per-project gradient, so the featured work stands out.

**Removed.** The "Cloud Migration" card goes. It restated the Bridge Informatics job, which Experience covers, and it is not a LinkedIn project. The unused `index` prop and `isEven` variable in `ProjectCard` go too.

**Content sources:**

- **Kept:** the problem statements and write-up angles for SavVio, Nuclear Shelter, and Kambaz, because they agree with the documents.
- **SOC-Claw problem statement:** comes from its first LinkedIn bullet.
- **SOC-Claw write-up angle:** "Why a second agent checks the first", referring to the Verifier Agent that lifted triage accuracy from 78% to 88%.
- **Rebuilt from the documents:** highlights and tech stacks.
- **Dropped:** tags the documents don't mention. That's XGBoost and scikit-learn on SavVio, Matplotlib and SciPy on Nuclear Shelter, and Express and TypeScript on Kambaz.

### Experience — `src/components/Experience.tsx`

The section becomes data-driven, like Projects and Skills: a `roles` array and an `education` array rendered with `map`, instead of hand-repeated bullet markup. Roles keep the accent-colored timeline dot and education keeps the primary-colored one.

- **AI Software Engineer, Bitcoin Culture Hub.** May 2026 – Present · Hillsdale, IL. A one-line summary (early team member who owns much of CLCT and OptEn's technical foundation) and eight bullets:
  1. Recommendation systems
  2. Organization-to-organization matching
  3. Job portal with two-stage ranking
  4. OpenTelemetry/ADOT observability
  5. WebSocket messaging
  6. Security hardening and test coverage
  7. MySQL-to-PostgreSQL migration with isolated environments
  8. Documentation and the AWS account-team contact role
- **Cloud/DevOps Engineer, Bridge Informatics.** July 2022 – December 2024 · Cambridge, MA. Four bullets from the resume, enriched with LinkedIn's EKS and CodePipeline. The 30% cost reduction stays. Old metrics that no document repeats are dropped: 10% faster production timelines, 20% faster app speed, and zero breaches in two years.
- **Education.** Unchanged, including the coursework line, which is factual and not contradicted.

New subtitle: `Cloud engineering in production since 2022, now building AI-powered products.`

### Skills & Certifications — `src/components/Skills.tsx`

**Certifications.** All four are listed under their full official names. The new AWS Certified Data Engineer – Associate gets the violet gradient. The grid changes from `sm:grid-cols-3` to `sm:grid-cols-2 lg:grid-cols-4`.

**Skill categories.** Eight categories, rebuilt from the resume's Technical Skills, LinkedIn's Top Skills, and tools named in experience and project bullets:

- AI / LLMs
- ML & Data
- MLOps / LLMOps
- Cloud Platforms
- Infrastructure & CI/CD (Docker moves here from MLOps, next to Kubernetes)
- Observability
- Databases & Search
- Languages & Frameworks

**Dropped skills.** Skills no document mentions go: scikit-learn, XGBoost, Vertex AI, BigQuery, EC2, GCP Cloud Logging, and YAML. R and AWS EMR appear only in the 2020 Car Insurance Report project, so they stay on that card and leave the Skills grid.

### About — `src/components/About.tsx`

Three paragraphs built from the LinkedIn summary, which is in Murtaza's own words, updated with current facts:

1. Building end to end, and about three years of cloud-native work.
2. The Bitcoin Culture Hub role and the Northeastern MS.
3. The Bridge Informatics and Worcester State background, four AWS certifications, and full-stack range.

The "actively seeking opportunities" sentence is removed, because Murtaza is now employed and no document says otherwise.

### Contact — `src/components/Contact.tsx`

The blurb becomes the LinkedIn summary's closing line: `Always happy to connect with people building cool things. Feel free to reach out.` The buttons are unchanged.

### Unchanged

`Navbar.tsx`, `Footer.tsx`, `page.tsx`, `globals.css`, `next.config.ts`.

## Project links

All links were checked on 2026-09-25.

| Project | Links | Notes |
|---|---|---|
| SOC-Claw / Blue Lantern | `github.com/MurtazaN/SoC-Claw` | |
| SavVio | `github.com/nirajmehta960/SavVio` | This is the team repo pinned on Murtaza's profile, with 100+ of Murtaza's commits. `MurtazaN/SavVio-Financial-Advisor` is a one-commit setup snapshot. The live demo returns HTTP 500, so it is not linked. |
| Nuclear Shelter | `github.com/MurtazaN/nuclear_shelter_location` | |
| Kambaz | `kambaz-next-js-three.vercel.app` (HTTP 200), `github.com/MurtazaN/kambaz-next-js`, `github.com/MurtazaN/kambaz-node-server-app` | |
| AutoFinder | none | No repo exists under the account, its organization, or the repos it has contributed to. |
| Libre Food Pantry | `github.com/MurtazaN/FoodPantryFrontEnd`, `github.com/MurtazaN/LibreFoodPantryBackEnd`, `github.com/MurtazaN/LibreFoodPantryAPI` | |
| OP Credit | `github.com/MurtazaN/OPcredit` | A fork of `huuvien2310/OPCredit`. Murtaza's commit is attributed in the fork, not the original. |
| Car Insurance Report | `github.com/MurtazaN/CarInsuranceAnalysis` | |

## Deliberately left out

- The phone number, which appears in both documents.
- The earlier LinkedIn roles: Technical Recruiter at Talent Explorer (2017–2018) and General Manager at Elite Plastics (2012–2017). The resume omits them, and the current site shows only engineering roles.
- GitHub-only projects, per the request: TaRa Health, AI Study Guide, Learning Accelerator, AI Chatbot, and the Bitcoin Culture Hub repos.
- The SavVio live demo, which currently returns HTTP 500.

## Decisions to confirm

These were made without a live review. Each takes a small edit to reverse.

1. The resume wins conflicts: 94% coverage, May 2027, "Cloud/DevOps Engineer", Cambridge.
2. "Cloud Migration" is removed from Projects.
3. Old Bridge Informatics metrics that no document repeats are removed.
4. Earlier non-engineering roles stay off the site.
5. Contact and About no longer say Murtaza is looking for roles.
6. The LinkedIn headline's "Solution Architect" becomes the official "Solutions Architect".
7. The Car Insurance Report card keeps its GitHub link, though the repo shows only the R and WEKA part of the work. The card, following LinkedIn, also names Spark on AWS EMR and Python. The alternatives are to drop the link or narrow the card's text.

## Verification

- `npx tsc --noEmit` passes.
- `npm run build` completes and writes `out/index.html`. ESLint is not installed, so `npm run lint` does not run; setting it up is out of scope.
- A content check on `out/index.html` finds the new facts and none of the removed ones. The new facts are Bitcoin Culture Hub, SOC-Claw, AWS Certified Data Engineer, and all eight project titles. The removed ones are Cloud Migration, the phone number, and "actively seeking".
- Every GitHub and demo `href` in the built page returns HTTP 200. LinkedIn blocks automated requests, and its URL is unchanged.
- Screenshots of the built page at 1280px and 390px wide show no overflow or broken layout.

## Out of scope

A visual redesign, new sections, new dependencies, ESLint setup, the README, and deployment.
