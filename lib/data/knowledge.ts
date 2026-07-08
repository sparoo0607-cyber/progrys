export interface KnowledgeLesson {
  id: string;
  slug: string;
  title: string;
  explanationHtml: string;
  codeExample: string;
  tryItDefault?: string;
}

export interface KnowledgeTopic {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: string; // lucide icon name reference
  lessons: KnowledgeLesson[];
}

export const MOCK_TOPICS: KnowledgeTopic[] = [
  {
    id: "t1",
    slug: "react",
    title: "React Basics",
    description: "Learn the core concepts of React.",
    iconName: "Atom",
    lessons: [
      {
        id: "l1",
        slug: "components",
        title: "What are Components?",
        explanationHtml: "<p>Components are the building blocks of any React app.</p>",
        codeExample: "function Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}",
        tryItDefault: "export default function App() {\n  return <h1>Hello World</h1>;\n}"
      },
      {
        id: "l2",
        slug: "state",
        title: "Understanding State",
        explanationHtml: "<p>State allows components to change over time.</p>",
        codeExample: "const [count, setCount] = useState(0);",
      }
    ]
  },
  {
    id: "t2",
    slug: "sql",
    title: "SQL Fundamentals",
    description: "Master database querying.",
    iconName: "Database",
    lessons: [
      {
        id: "l3",
        slug: "select",
        title: "The SELECT Statement",
        explanationHtml: "<p>Use SELECT to retrieve data from a database.</p>",
        codeExample: "SELECT * FROM users;",
        tryItDefault: "SELECT name, email FROM users LIMIT 10;"
      }
    ]
  }
];
