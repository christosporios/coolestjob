import type { JobType } from "@/types/job"
import { generateId } from "@/lib/utils"

export const jobs: JobType[] = [
  {
    id: generateId(),
    title: "👨‍💻 Frontend Developer",
    description:
      "We're looking for a talented frontend developer to join our team. You'll be working on our main product, building new features and improving the user experience.",
    company: "TechFlow",
    companyDescription: "A startup focused on developer productivity tools.",
    compensation: 55000,
    email: "jobs@techflow.io",
    location: "Athens, Greece",
  },
  {
    id: generateId(),
    title: "🎨 UX Designer",
    description:
      "Join our design team to create beautiful and intuitive user experiences. You'll be working closely with product managers and developers to bring ideas to life.",
    company: "DesignHub",
    companyDescription: "Award-winning design agency working with top brands.",
    compensation: 60000,
    email: "careers@designhub.com",
    location: "Athens / Remote",
  },
  {
    id: generateId(),
    title: "🔧 Full Stack Engineer",
    description:
      "We need a full stack engineer who can work across our entire platform. Experience with React, Node.js, and PostgreSQL is required.",
    company: "GrowthLabs",
    companyDescription: "Building the next generation of growth marketing tools.",
    compensation: 75000,
    email: "hiring@growthlabs.io",
    location: "Remote",
  },
  {
    id: generateId(),
    title: "☁️ DevOps Engineer",
    description:
      "Help us build and maintain our cloud infrastructure. Experience with AWS, Kubernetes, and CI/CD pipelines is a must.",
    company: "CloudScale",
    companyDescription: "Cloud infrastructure solutions for high-growth companies.",
    compensation: 80000,
    email: "jobs@cloudscale.tech",
    location: "Athens, Greece",
  },
  {
    id: generateId(),
    title: "📊 Product Manager",
    description:
      "Lead product development for our flagship application. You'll work with all departments to ensure we're building the right features for our users.",
    company: "ProductMind",
    companyDescription: "Creating products that users love.",
    compensation: 70000,
    email: "careers@productmind.co",
    location: "Athens / Remote",
  },
  {
    id: generateId(),
    title: "🧠 Data Scientist",
    description:
      "Join our data team to extract insights from our vast dataset. You'll build models to help us make better decisions and improve our product.",
    company: "DataDriven",
    companyDescription: "Using data to solve complex business problems.",
    compensation: 85000,
    email: "talent@datadriven.ai",
    location: "Remote",
  },
  {
    id: generateId(),
    title: "⚙️ Backend Developer",
    description:
      "Design and implement scalable APIs and services. Experience with Go or Rust is preferred, but not required.",
    company: "ServerSide",
    companyDescription: "Building high-performance backend systems.",
    compensation: 72000,
    email: "jobs@serverside.dev",
    location: "Athens, Greece",
  },
  {
    id: generateId(),
    title: "🚀 Founding Engineer",
    description:
      "Join our early-stage startup as a founding engineer. You'll have a significant impact on our product and company culture.",
    company: "Schema Labs",
    companyDescription: "A non-profit company building technology to solve democracy's biggest problems.",
    compensation: 65000,
    email: "join@schemalabs.gr",
    location: "Athens / Remote",
  },
]
