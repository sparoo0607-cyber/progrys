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
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 1 — HTML Basics
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t1",
    slug: "html",
    title: "HTML Basics",
    description: "Learn the foundation of every website — HTML structure, elements, and attributes.",
    iconName: "Code2",
    lessons: [
      {
        id: "html-1",
        slug: "what-is-html",
        title: "What is HTML?",
        explanationHtml: `
<h3>Definition</h3>
<p><strong>HTML</strong> stands for <strong>HyperText Markup Language</strong>. It is the standard language used to create and structure content on web pages.</p>
<p>HTML is <strong>not</strong> a programming language — it is a <em>markup language</em>. It uses <strong>tags</strong> to tell the browser how to display content like text, images, and links.</p>

<h3>How It Works</h3>
<ul>
  <li>You write HTML in a plain text file with a <code>.html</code> extension.</li>
  <li>A web browser (Chrome, Firefox, etc.) reads the file and renders it as a web page.</li>
  <li>HTML elements are represented by <strong>tags</strong> like <code>&lt;h1&gt;</code>, <code>&lt;p&gt;</code>, and <code>&lt;img&gt;</code>.</li>
</ul>

<h3>Basic Structure</h3>
<p>Every HTML page follows this basic structure:</p>
<ul>
  <li><code>&lt;!DOCTYPE html&gt;</code> — Tells the browser this is an HTML5 document.</li>
  <li><code>&lt;html&gt;</code> — The root element that wraps everything.</li>
  <li><code>&lt;head&gt;</code> — Contains meta information (title, links to CSS, etc.).</li>
  <li><code>&lt;body&gt;</code> — Contains the visible content of the page.</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> You can create your first web page with just a text editor (like Notepad) and a browser — no special software needed!
</div>`,
        codeExample: `<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is my first web page.</p>
</body>
</html>`,
        tryItDefault: `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Welcome!</h1>
  <p>Try changing this text.</p>
</body>
</html>`,
      },
      {
        id: "html-2",
        slug: "html-elements",
        title: "HTML Elements",
        explanationHtml: `
<h3>What is an HTML Element?</h3>
<p>An HTML element is everything from the <strong>opening tag</strong> to the <strong>closing tag</strong>, including the content in between.</p>
<p>For example: <code>&lt;p&gt;Hello&lt;/p&gt;</code> is a complete paragraph element.</p>

<h3>Parts of an Element</h3>
<ul>
  <li><strong>Opening tag:</strong> <code>&lt;p&gt;</code> — marks the start.</li>
  <li><strong>Content:</strong> The text or other elements inside.</li>
  <li><strong>Closing tag:</strong> <code>&lt;/p&gt;</code> — marks the end (note the <code>/</code>).</li>
</ul>

<h3>Common HTML Elements</h3>
<table>
  <thead>
    <tr><th>Element</th><th>Purpose</th><th>Example</th></tr>
  </thead>
  <tbody>
    <tr><td><code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code></td><td>Headings (h1 = largest)</td><td><code>&lt;h1&gt;Title&lt;/h1&gt;</code></td></tr>
    <tr><td><code>&lt;p&gt;</code></td><td>Paragraph of text</td><td><code>&lt;p&gt;Some text&lt;/p&gt;</code></td></tr>
    <tr><td><code>&lt;a&gt;</code></td><td>Hyperlink</td><td><code>&lt;a href="url"&gt;Click&lt;/a&gt;</code></td></tr>
    <tr><td><code>&lt;img&gt;</code></td><td>Image (self-closing)</td><td><code>&lt;img src="pic.jpg"&gt;</code></td></tr>
    <tr><td><code>&lt;ul&gt;</code> / <code>&lt;ol&gt;</code></td><td>Unordered / Ordered list</td><td><code>&lt;ul&gt;&lt;li&gt;Item&lt;/li&gt;&lt;/ul&gt;</code></td></tr>
    <tr><td><code>&lt;div&gt;</code></td><td>Generic container</td><td><code>&lt;div&gt;...&lt;/div&gt;</code></td></tr>
  </tbody>
</table>

<h3>Self-Closing Elements</h3>
<p>Some elements don't have content or a closing tag. These are called <strong>void elements</strong>:</p>
<ul>
  <li><code>&lt;br&gt;</code> — Line break</li>
  <li><code>&lt;hr&gt;</code> — Horizontal line</li>
  <li><code>&lt;img&gt;</code> — Image</li>
  <li><code>&lt;input&gt;</code> — Form input</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Remember:</strong> HTML elements can be <strong>nested</strong> inside each other. For example, a <code>&lt;strong&gt;</code> tag inside a <code>&lt;p&gt;</code> tag makes text bold within a paragraph.
</div>`,
        codeExample: `<h1>Main Heading</h1>
<h2>Sub Heading</h2>

<p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p>

<a href="https://example.com">Visit Example</a>

<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>

<img src="photo.jpg" alt="A description of the photo">`,
      },
      {
        id: "html-3",
        slug: "html-attributes",
        title: "HTML Attributes",
        explanationHtml: `
<h3>What are Attributes?</h3>
<p>Attributes provide <strong>extra information</strong> about an HTML element. They are always written inside the <strong>opening tag</strong>.</p>
<p>Attributes come in <strong>name="value"</strong> pairs. For example: <code>&lt;a href="https://example.com"&gt;</code></p>

<h3>Rules for Attributes</h3>
<ul>
  <li>Attributes are always placed in the <strong>opening tag</strong>.</li>
  <li>Values should be wrapped in <strong>quotes</strong> (double or single).</li>
  <li>An element can have <strong>multiple attributes</strong>, separated by spaces.</li>
</ul>

<h3>Most Used Attributes</h3>
<table>
  <thead>
    <tr><th>Attribute</th><th>Used With</th><th>Purpose</th></tr>
  </thead>
  <tbody>
    <tr><td><code>href</code></td><td><code>&lt;a&gt;</code></td><td>URL the link goes to</td></tr>
    <tr><td><code>src</code></td><td><code>&lt;img&gt;</code>, <code>&lt;script&gt;</code></td><td>Path to a file</td></tr>
    <tr><td><code>alt</code></td><td><code>&lt;img&gt;</code></td><td>Alternate text for images</td></tr>
    <tr><td><code>class</code></td><td>Any element</td><td>Assigns a CSS class</td></tr>
    <tr><td><code>id</code></td><td>Any element</td><td>Unique identifier</td></tr>
    <tr><td><code>style</code></td><td>Any element</td><td>Inline CSS styles</td></tr>
    <tr><td><code>type</code></td><td><code>&lt;input&gt;</code></td><td>Kind of input (text, password, etc.)</td></tr>
  </tbody>
</table>

<div class="knowledge-tip">
  <strong>💡 Best Practice:</strong> Always include the <code>alt</code> attribute on images — it helps with accessibility (screen readers) and shows text if the image fails to load.
</div>`,
        codeExample: `<!-- Link with href attribute -->
<a href="https://example.com" target="_blank">Open Example</a>

<!-- Image with src and alt attributes -->
<img src="logo.png" alt="Company Logo" width="200">

<!-- Input with type and placeholder -->
<input type="email" placeholder="Enter your email">

<!-- Element with class and id -->
<div id="main-content" class="container">
  <p class="highlight">Styled paragraph</p>
</div>`,
      },
      {
        id: "html-4",
        slug: "html-forms",
        title: "HTML Forms",
        explanationHtml: `
<h3>What are HTML Forms?</h3>
<p>Forms are used to <strong>collect user input</strong> — like login pages, search bars, and registration forms.</p>
<p>A form is created using the <code>&lt;form&gt;</code> element, which contains <strong>input fields</strong>, <strong>labels</strong>, and a <strong>submit button</strong>.</p>

<h3>Common Form Elements</h3>
<ul>
  <li><code>&lt;input&gt;</code> — A field for user input (text, email, password, checkbox, etc.).</li>
  <li><code>&lt;label&gt;</code> — A label that describes an input field.</li>
  <li><code>&lt;textarea&gt;</code> — A multi-line text input.</li>
  <li><code>&lt;select&gt;</code> — A dropdown list.</li>
  <li><code>&lt;button&gt;</code> — A clickable button.</li>
</ul>

<h3>Input Types</h3>
<table>
  <thead>
    <tr><th>Type</th><th>What It Does</th></tr>
  </thead>
  <tbody>
    <tr><td><code>text</code></td><td>Single-line text field</td></tr>
    <tr><td><code>password</code></td><td>Text field with hidden characters</td></tr>
    <tr><td><code>email</code></td><td>Email field with validation</td></tr>
    <tr><td><code>number</code></td><td>Numeric input</td></tr>
    <tr><td><code>checkbox</code></td><td>A checkbox</td></tr>
    <tr><td><code>radio</code></td><td>A radio button (pick one option)</td></tr>
    <tr><td><code>submit</code></td><td>A submit button</td></tr>
  </tbody>
</table>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> Always pair <code>&lt;label&gt;</code> with <code>&lt;input&gt;</code> using the <code>for</code> attribute — it improves accessibility and makes the label clickable.
</div>`,
        codeExample: `<form action="/submit" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" placeholder="Your name">

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" placeholder="you@email.com">

  <label for="password">Password:</label>
  <input type="password" id="password" name="password">

  <label>
    <input type="checkbox" name="agree"> I agree to the terms
  </label>

  <button type="submit">Sign Up</button>
</form>`,
        tryItDefault: `<form>
  <label for="username">Username:</label>
  <input type="text" id="username" placeholder="Enter username">

  <button type="submit">Submit</button>
</form>`,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 2 — CSS Basics
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t2",
    slug: "css",
    title: "CSS Basics",
    description: "Style your web pages with colors, layouts, fonts, and responsive design.",
    iconName: "Palette",
    lessons: [
      {
        id: "css-1",
        slug: "what-is-css",
        title: "What is CSS?",
        explanationHtml: `
<h3>Definition</h3>
<p><strong>CSS</strong> stands for <strong>Cascading Style Sheets</strong>. It is the language used to <strong>style and design</strong> the visual appearance of HTML elements on a web page.</p>
<p>While HTML defines the <em>structure</em> of a page, CSS controls how it <em>looks</em> — colors, fonts, spacing, layout, and more.</p>

<h3>Three Ways to Add CSS</h3>
<ul>
  <li><strong>Inline CSS:</strong> Use the <code>style</code> attribute directly on an element.<br>
    Example: <code>&lt;p style="color: red;"&gt;Red text&lt;/p&gt;</code></li>
  <li><strong>Internal CSS:</strong> Place styles inside a <code>&lt;style&gt;</code> tag in the <code>&lt;head&gt;</code>.</li>
  <li><strong>External CSS:</strong> Link a separate <code>.css</code> file using <code>&lt;link&gt;</code>. <em>(Recommended!)</em></li>
</ul>

<h3>CSS Syntax</h3>
<p>A CSS rule has two parts:</p>
<ul>
  <li><strong>Selector</strong> — What element to style (e.g., <code>h1</code>, <code>.class</code>, <code>#id</code>).</li>
  <li><strong>Declaration block</strong> — One or more property-value pairs inside <code>{ }</code>.</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Best Practice:</strong> Always use <strong>external CSS</strong> files for real projects. It keeps your HTML clean and makes your styles reusable across multiple pages.
</div>`,
        codeExample: `/* CSS Syntax */
selector {
  property: value;
}

/* Example: Style all paragraphs */
p {
  color: navy;
  font-size: 16px;
  line-height: 1.6;
}

/* Style by class */
.highlight {
  background-color: yellow;
  padding: 4px 8px;
}

/* Style by ID */
#main-title {
  font-size: 32px;
  font-weight: bold;
}`,
        tryItDefault: `/* Try changing these values! */
body {
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  text-align: center;
}

p {
  color: #666;
  font-size: 18px;
}`,
      },
      {
        id: "css-2",
        slug: "css-selectors",
        title: "CSS Selectors",
        explanationHtml: `
<h3>What are Selectors?</h3>
<p>A <strong>CSS selector</strong> targets the HTML element(s) you want to style. Think of it as a way to "point" to specific elements on the page.</p>

<h3>Types of Selectors</h3>
<table>
  <thead>
    <tr><th>Selector</th><th>Syntax</th><th>What It Selects</th></tr>
  </thead>
  <tbody>
    <tr><td>Element</td><td><code>p</code></td><td>All <code>&lt;p&gt;</code> elements</td></tr>
    <tr><td>Class</td><td><code>.card</code></td><td>All elements with <code>class="card"</code></td></tr>
    <tr><td>ID</td><td><code>#header</code></td><td>The element with <code>id="header"</code></td></tr>
    <tr><td>Universal</td><td><code>*</code></td><td>Every element on the page</td></tr>
    <tr><td>Grouping</td><td><code>h1, h2, p</code></td><td>Multiple elements at once</td></tr>
    <tr><td>Descendant</td><td><code>div p</code></td><td><code>&lt;p&gt;</code> inside a <code>&lt;div&gt;</code></td></tr>
    <tr><td>Child</td><td><code>div > p</code></td><td>Direct <code>&lt;p&gt;</code> children of <code>&lt;div&gt;</code></td></tr>
  </tbody>
</table>

<h3>Selector Priority (Specificity)</h3>
<p>When multiple rules target the same element, CSS uses <strong>specificity</strong> to decide which one wins:</p>
<ul>
  <li><strong>Inline styles</strong> (highest priority)</li>
  <li><strong>ID selectors</strong> (<code>#id</code>)</li>
  <li><strong>Class selectors</strong> (<code>.class</code>)</li>
  <li><strong>Element selectors</strong> (<code>p</code>, <code>div</code>) (lowest priority)</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> Use <strong>class selectors</strong> for most styling — they are reusable and have the right level of specificity. Avoid using <code>#id</code> for styling whenever possible.
</div>`,
        codeExample: `/* Element selector */
p {
  color: #333;
}

/* Class selector — reusable */
.btn-primary {
  background: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
}

/* ID selector — unique */
#navbar {
  background: #1a1a1a;
  padding: 16px;
}

/* Descendant selector */
.card p {
  font-size: 14px;
  color: #666;
}

/* Group selector */
h1, h2, h3 {
  font-family: 'Georgia', serif;
  color: #111;
}`,
      },
      {
        id: "css-3",
        slug: "css-box-model",
        title: "CSS Box Model",
        explanationHtml: `
<h3>What is the Box Model?</h3>
<p>In CSS, every element is treated as a <strong>rectangular box</strong>. The <strong>box model</strong> describes the space an element takes up on the page.</p>
<p>Understanding the box model is essential for controlling layouts and spacing.</p>

<h3>The Four Layers</h3>
<p>From inside to outside, every box has:</p>
<ul>
  <li><strong>Content</strong> — The actual text, image, or child elements.</li>
  <li><strong>Padding</strong> — Space between the content and the border. (Transparent)</li>
  <li><strong>Border</strong> — A line around the padding.</li>
  <li><strong>Margin</strong> — Space outside the border, between this element and others.</li>
</ul>

<h3>Calculating Total Size</h3>
<p>By default, an element's total width is:</p>
<p><code>Total width = width + padding-left + padding-right + border-left + border-right</code></p>

<div class="knowledge-note">
  <strong>📌 Important:</strong> Use <code>box-sizing: border-box;</code> to make width and height include padding and border. This is much easier to work with and is used by most modern frameworks.
</div>

<h3>Margin vs Padding</h3>
<table>
  <thead>
    <tr><th>Property</th><th>Where</th><th>Background?</th></tr>
  </thead>
  <tbody>
    <tr><td><code>padding</code></td><td>Inside the border</td><td>Yes — takes element's background</td></tr>
    <tr><td><code>margin</code></td><td>Outside the border</td><td>No — always transparent</td></tr>
  </tbody>
</table>`,
        codeExample: `/* Box Model Example */
.card {
  /* Content width */
  width: 300px;

  /* Padding: space inside */
  padding: 20px;

  /* Border */
  border: 2px solid #e0e0e0;

  /* Margin: space outside */
  margin: 16px;

  /* Include padding and border in width */
  box-sizing: border-box;
}

/* Shorthand: top right bottom left */
.box {
  padding: 10px 20px 10px 20px;
  margin: 0 auto; /* Centers the element */
}`,
        tryItDefault: `/* Experiment with the box model! */
.box {
  width: 200px;
  padding: 20px;
  border: 3px solid #3b82f6;
  margin: 30px auto;
  background: #eff6ff;
  text-align: center;
}`,
      },
      {
        id: "css-4",
        slug: "css-flexbox",
        title: "CSS Flexbox",
        explanationHtml: `
<h3>What is Flexbox?</h3>
<p><strong>Flexbox</strong> (Flexible Box Layout) is a CSS layout method that makes it easy to <strong>align and distribute space</strong> among items in a container — even when their sizes are unknown.</p>
<p>Before Flexbox, centering elements and creating layouts required hacks with floats and positioning. Flexbox makes it simple.</p>

<h3>How It Works</h3>
<ul>
  <li>Add <code>display: flex;</code> to a <strong>parent</strong> container.</li>
  <li>The direct children become <strong>flex items</strong>.</li>
  <li>Use flex properties to control alignment and spacing.</li>
</ul>

<h3>Key Properties</h3>
<table>
  <thead>
    <tr><th>Property</th><th>Applied To</th><th>What It Does</th></tr>
  </thead>
  <tbody>
    <tr><td><code>display: flex</code></td><td>Parent</td><td>Enables flex layout</td></tr>
    <tr><td><code>flex-direction</code></td><td>Parent</td><td>Row (default) or column</td></tr>
    <tr><td><code>justify-content</code></td><td>Parent</td><td>Align items along the main axis</td></tr>
    <tr><td><code>align-items</code></td><td>Parent</td><td>Align items along the cross axis</td></tr>
    <tr><td><code>gap</code></td><td>Parent</td><td>Space between items</td></tr>
    <tr><td><code>flex-grow</code></td><td>Children</td><td>How much an item should grow</td></tr>
  </tbody>
</table>

<h3>Common Values for justify-content</h3>
<ul>
  <li><code>flex-start</code> — Items at the start (default).</li>
  <li><code>center</code> — Items centered.</li>
  <li><code>space-between</code> — Equal space between items.</li>
  <li><code>space-around</code> — Equal space around items.</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Quick Win:</strong> To perfectly center anything, use:<br>
  <code>display: flex; justify-content: center; align-items: center;</code>
</div>`,
        codeExample: `/* Center items horizontally and vertically */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Navigation bar layout */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
}

/* Card grid with gap */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card-grid .card {
  flex: 1 1 300px; /* grow, shrink, min-width */
}`,
        tryItDefault: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 300px;
  background: #f0f0f0;
}

.box {
  width: 80px;
  height: 80px;
  background: #3b82f6;
  border-radius: 8px;
}`,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 3 — JavaScript Basics
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t3",
    slug: "javascript",
    title: "JavaScript Basics",
    description: "Add interactivity to websites — variables, functions, arrays, and more.",
    iconName: "Braces",
    lessons: [
      {
        id: "js-1",
        slug: "what-is-javascript",
        title: "What is JavaScript?",
        explanationHtml: `
<h3>Definition</h3>
<p><strong>JavaScript</strong> (JS) is a <strong>programming language</strong> that adds interactivity and dynamic behavior to websites.</p>
<p>While HTML builds the structure and CSS styles it, JavaScript makes things <strong>happen</strong> — button clicks, form validation, animations, fetching data, and more.</p>

<h3>What Can JavaScript Do?</h3>
<ul>
  <li><strong>Change HTML content</strong> dynamically (e.g., update text on a button click).</li>
  <li><strong>Respond to events</strong> like clicks, scrolls, and key presses.</li>
  <li><strong>Validate forms</strong> before submitting data.</li>
  <li><strong>Fetch data</strong> from APIs without reloading the page.</li>
  <li><strong>Create animations</strong> and visual effects.</li>
  <li><strong>Build full applications</strong> (with frameworks like React, Node.js).</li>
</ul>

<h3>Where Does JavaScript Run?</h3>
<ul>
  <li><strong>Browser</strong> — Every modern browser has a built-in JavaScript engine.</li>
  <li><strong>Server</strong> — Using Node.js, JavaScript can also run on the backend.</li>
</ul>

<h3>Adding JavaScript to HTML</h3>
<p>You can add JS to your page in two ways:</p>
<ul>
  <li><strong>Inline:</strong> Inside a <code>&lt;script&gt;</code> tag in your HTML.</li>
  <li><strong>External:</strong> Link a <code>.js</code> file using <code>&lt;script src="app.js"&gt;&lt;/script&gt;</code>.</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> Place your <code>&lt;script&gt;</code> tag just before the closing <code>&lt;/body&gt;</code> tag — this ensures the HTML loads first before JavaScript runs.
</div>`,
        codeExample: `// Display a message
console.log("Hello, JavaScript!");

// Change HTML content
document.getElementById("demo").textContent = "Text changed!";

// Respond to a button click
document.getElementById("myBtn").addEventListener("click", function() {
  alert("Button clicked!");
});

// Simple calculation
let price = 100;
let tax = price * 0.18;
console.log("Total:", price + tax); // Output: 118`,
        tryItDefault: `// Try changing the message!
console.log("Hello, World!");

// Basic math
let a = 10;
let b = 5;
console.log("Sum:", a + b);
console.log("Product:", a * b);`,
      },
      {
        id: "js-2",
        slug: "variables-data-types",
        title: "Variables & Data Types",
        explanationHtml: `
<h3>What are Variables?</h3>
<p>Variables are <strong>containers that store data values</strong>. Think of them as labeled boxes where you put information to use later.</p>

<h3>Declaring Variables</h3>
<p>JavaScript has three ways to declare variables:</p>
<table>
  <thead>
    <tr><th>Keyword</th><th>Scope</th><th>Reassignable?</th><th>When to Use</th></tr>
  </thead>
  <tbody>
    <tr><td><code>let</code></td><td>Block</td><td>✅ Yes</td><td>Values that change</td></tr>
    <tr><td><code>const</code></td><td>Block</td><td>❌ No</td><td>Values that stay the same</td></tr>
    <tr><td><code>var</code></td><td>Function</td><td>✅ Yes</td><td>⚠️ Avoid (older style)</td></tr>
  </tbody>
</table>

<h3>Data Types</h3>
<p>JavaScript has <strong>7 primitive data types</strong>:</p>
<ul>
  <li><strong>String</strong> — Text: <code>"Hello"</code> or <code>'World'</code></li>
  <li><strong>Number</strong> — Numbers: <code>42</code>, <code>3.14</code></li>
  <li><strong>Boolean</strong> — True or false: <code>true</code>, <code>false</code></li>
  <li><strong>Undefined</strong> — Variable declared but not assigned.</li>
  <li><strong>Null</strong> — Intentionally empty value.</li>
  <li><strong>BigInt</strong> — Very large numbers.</li>
  <li><strong>Symbol</strong> — Unique identifier.</li>
</ul>

<p>Plus one non-primitive type:</p>
<ul>
  <li><strong>Object</strong> — Collections of key-value pairs (includes arrays, functions).</li>
</ul>

<div class="knowledge-note">
  <strong>📌 Rule of Thumb:</strong> Use <code>const</code> by default. Only use <code>let</code> when you know the value will change. Never use <code>var</code> in modern code.
</div>`,
        codeExample: `// String
const name = "Alice";

// Number
let age = 25;

// Boolean
const isStudent = true;

// Array (a type of Object)
const colors = ["red", "green", "blue"];

// Object
const user = {
  name: "Alice",
  age: 25,
  isStudent: true
};

// Check data type
console.log(typeof name);      // "string"
console.log(typeof age);       // "number"
console.log(typeof isStudent); // "boolean"
console.log(typeof colors);    // "object"`,
      },
      {
        id: "js-3",
        slug: "functions",
        title: "Functions",
        explanationHtml: `
<h3>What is a Function?</h3>
<p>A function is a <strong>reusable block of code</strong> that performs a specific task. Instead of writing the same code again and again, you put it inside a function and call it whenever needed.</p>

<h3>Why Use Functions?</h3>
<ul>
  <li><strong>Reusability</strong> — Write once, use many times.</li>
  <li><strong>Organization</strong> — Break complex tasks into smaller pieces.</li>
  <li><strong>Readability</strong> — Give meaningful names to blocks of logic.</li>
</ul>

<h3>Types of Functions</h3>

<p><strong>1. Function Declaration</strong></p>
<p>The traditional way. Can be called <em>before</em> its definition (hoisted).</p>

<p><strong>2. Function Expression</strong></p>
<p>Stored in a variable. Cannot be called before its definition.</p>

<p><strong>3. Arrow Function (ES6)</strong></p>
<p>A shorter, modern syntax. Most popular in React and modern JS.</p>

<h3>Parameters and Return</h3>
<ul>
  <li><strong>Parameters</strong> — Input values passed to the function.</li>
  <li><strong>Return</strong> — The output value sent back when the function finishes.</li>
  <li>A function without a <code>return</code> statement returns <code>undefined</code>.</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> Arrow functions are great for short, simple operations. Use regular functions when you need <code>this</code> binding or hoisting.
</div>`,
        codeExample: `// 1. Function Declaration
function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("Alice")); // "Hello, Alice!"

// 2. Function Expression
const square = function(num) {
  return num * num;
};
console.log(square(5)); // 25

// 3. Arrow Function (ES6)
const add = (a, b) => a + b;
console.log(add(3, 7)); // 10

// Arrow function with body
const getDiscount = (price, percent) => {
  const discount = price * (percent / 100);
  return price - discount;
};
console.log(getDiscount(200, 10)); // 180

// Default parameters
const welcome = (name = "Guest") => {
  return \`Welcome, \${name}!\`;
};
console.log(welcome());       // "Welcome, Guest!"
console.log(welcome("Bob"));  // "Welcome, Bob!"`,
        tryItDefault: `// Create your own function!
function calculateArea(length, width) {
  return length * width;
}

console.log("Area:", calculateArea(5, 3));

// Try an arrow function
const double = (n) => n * 2;
console.log("Double 7:", double(7));`,
      },
      {
        id: "js-4",
        slug: "arrays",
        title: "Arrays",
        explanationHtml: `
<h3>What is an Array?</h3>
<p>An array is a <strong>special variable that can hold multiple values</strong> in a single, ordered list. Instead of creating separate variables for each item, you store them all in one array.</p>

<h3>Creating Arrays</h3>
<p>Use square brackets <code>[ ]</code> to create an array:</p>
<ul>
  <li><code>const fruits = ["Apple", "Banana", "Mango"];</code></li>
  <li>Items are separated by commas.</li>
  <li>Arrays can hold <strong>any data type</strong> — strings, numbers, objects, even other arrays.</li>
</ul>

<h3>Accessing Items</h3>
<p>Array items are accessed by their <strong>index</strong> (position number), starting from <strong>0</strong>:</p>
<ul>
  <li><code>fruits[0]</code> → <code>"Apple"</code> (first item)</li>
  <li><code>fruits[1]</code> → <code>"Banana"</code> (second item)</li>
  <li><code>fruits.length</code> → <code>3</code> (total items)</li>
</ul>

<h3>Essential Array Methods</h3>
<table>
  <thead>
    <tr><th>Method</th><th>What It Does</th><th>Returns</th></tr>
  </thead>
  <tbody>
    <tr><td><code>.push(item)</code></td><td>Add item to end</td><td>New length</td></tr>
    <tr><td><code>.pop()</code></td><td>Remove last item</td><td>Removed item</td></tr>
    <tr><td><code>.shift()</code></td><td>Remove first item</td><td>Removed item</td></tr>
    <tr><td><code>.includes(item)</code></td><td>Check if item exists</td><td>Boolean</td></tr>
    <tr><td><code>.indexOf(item)</code></td><td>Find item's index</td><td>Index or -1</td></tr>
    <tr><td><code>.map(fn)</code></td><td>Transform each item</td><td>New array</td></tr>
    <tr><td><code>.filter(fn)</code></td><td>Keep items that pass a test</td><td>New array</td></tr>
    <tr><td><code>.find(fn)</code></td><td>Find first matching item</td><td>Item or undefined</td></tr>
  </tbody>
</table>

<div class="knowledge-note">
  <strong>📌 Important:</strong> <code>.map()</code> and <code>.filter()</code> create <strong>new arrays</strong> — they do not modify the original. This is very important in React!
</div>`,
        codeExample: `// Create an array
const fruits = ["Apple", "Banana", "Mango"];

// Access items
console.log(fruits[0]);     // "Apple"
console.log(fruits.length); // 3

// Add and remove
fruits.push("Orange");      // Add to end
fruits.pop();               // Remove from end

// Loop through items
fruits.forEach((fruit, index) => {
  console.log(\`\${index}: \${fruit}\`);
});

// Transform with map
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Filter
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// Find
const found = numbers.find(n => n > 3);
console.log(found); // 4`,
        tryItDefault: `const scores = [85, 92, 78, 96, 88];

// Find the highest score
const highest = Math.max(...scores);
console.log("Highest:", highest);

// Filter scores above 90
const topScores = scores.filter(s => s > 90);
console.log("Top scores:", topScores);`,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 4 — React Basics
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t4",
    slug: "react",
    title: "React Basics",
    description: "Learn the core concepts of React — components, state, props, and hooks.",
    iconName: "Atom",
    lessons: [
      {
        id: "react-1",
        slug: "components",
        title: "What are Components?",
        explanationHtml: `
<h3>Definition</h3>
<p><strong>Components</strong> are the <strong>building blocks</strong> of any React application. A component is a reusable piece of the UI — like a button, a card, a navigation bar, or even an entire page.</p>
<p>React lets you split the UI into independent, isolated pieces so you can work on each one separately.</p>

<h3>Types of Components</h3>
<ul>
  <li><strong>Functional Components</strong> (recommended) — Simple JavaScript functions that return JSX (HTML-like code).</li>
  <li><strong>Class Components</strong> (older) — ES6 classes that extend <code>React.Component</code>. Rarely used in modern React.</li>
</ul>

<h3>Rules for Components</h3>
<ul>
  <li>Component names must start with a <strong>capital letter</strong> (e.g., <code>Header</code>, not <code>header</code>).</li>
  <li>A component must return <strong>JSX</strong> (HTML-like syntax).</li>
  <li>A component can only return <strong>one root element</strong>. Use <code>&lt;&gt;...&lt;/&gt;</code> (Fragment) to wrap multiple elements.</li>
</ul>

<h3>What is JSX?</h3>
<p><strong>JSX</strong> stands for JavaScript XML. It looks like HTML but lives inside JavaScript. React uses JSX to describe the UI.</p>
<ul>
  <li>Use <code>className</code> instead of <code>class</code>.</li>
  <li>Use <code>{expression}</code> to embed JavaScript inside JSX.</li>
  <li>Self-closing tags must end with <code>/&gt;</code> (e.g., <code>&lt;img /&gt;</code>).</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Think of it this way:</strong> A React app is like a tree of components. The <code>App</code> component is the root, and it renders other components like <code>Header</code>, <code>Main</code>, and <code>Footer</code>.
</div>`,
        codeExample: `// A simple functional component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Arrow function component
const Greeting = ({ name }) => {
  return (
    <div>
      <h2>Welcome back, {name}!</h2>
      <p>We're glad to see you.</p>
    </div>
  );
};

// Using components inside App
export default function App() {
  return (
    <>
      <Welcome name="Alice" />
      <Greeting name="Bob" />
    </>
  );
}`,
        tryItDefault: `export default function App() {
  const message = "Hello, React!";

  return (
    <div>
      <h1>{message}</h1>
      <p>Try changing the message above.</p>
    </div>
  );
}`,
      },
      {
        id: "react-2",
        slug: "state",
        title: "Understanding State",
        explanationHtml: `
<h3>What is State?</h3>
<p><strong>State</strong> is data that a component <strong>owns and can change</strong> over time. When state changes, React automatically <strong>re-renders</strong> the component to reflect the new data.</p>
<p>Think of state as the component's <strong>memory</strong> — it remembers things between renders.</p>

<h3>Using useState</h3>
<p>The <code>useState</code> hook lets you add state to functional components:</p>
<ul>
  <li>It takes an <strong>initial value</strong> as an argument.</li>
  <li>It returns an <strong>array with two items</strong>:
    <ul>
      <li>The <strong>current state value</strong>.</li>
      <li>A <strong>function to update</strong> that value.</li>
    </ul>
  </li>
</ul>

<h3>Important Rules</h3>
<ul>
  <li><strong>Never modify state directly.</strong> Always use the setter function (e.g., <code>setCount(newValue)</code>).</li>
  <li><strong>State updates are asynchronous.</strong> React batches them for performance.</li>
  <li>When the new state depends on the old state, use a <strong>callback</strong>: <code>setCount(prev =&gt; prev + 1)</code>.</li>
</ul>

<h3>What Can Be State?</h3>
<p>State can hold any data type:</p>
<ul>
  <li>Numbers: <code>const [count, setCount] = useState(0)</code></li>
  <li>Strings: <code>const [name, setName] = useState("")</code></li>
  <li>Booleans: <code>const [isOpen, setIsOpen] = useState(false)</code></li>
  <li>Arrays: <code>const [items, setItems] = useState([])</code></li>
  <li>Objects: <code>const [user, setUser] = useState({ name: "", age: 0 })</code></li>
</ul>

<div class="knowledge-tip">
  <strong>💡 When to use State:</strong> Use state for data that <em>changes</em> and affects what the user sees — form inputs, toggle switches, counters, lists, etc.
</div>`,
        codeExample: `import { useState } from "react";

function Counter() {
  // Declare state: initial value is 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

// Toggle example
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? "ON" : "OFF"}
    </button>
  );
}`,
        tryItDefault: `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
}`,
      },
      {
        id: "react-3",
        slug: "props",
        title: "Props",
        explanationHtml: `
<h3>What are Props?</h3>
<p><strong>Props</strong> (short for "properties") are the way to <strong>pass data from a parent component to a child component</strong>.</p>
<p>Think of props like <strong>function arguments</strong> — they let you customize a component each time you use it.</p>

<h3>How Props Work</h3>
<ul>
  <li>Props are <strong>passed as attributes</strong> in JSX: <code>&lt;Card title="Hello" /&gt;</code></li>
  <li>The child component <strong>receives them as an object</strong>.</li>
  <li>You can <strong>destructure</strong> props for cleaner code: <code>({ title, description })</code></li>
</ul>

<h3>Props vs State</h3>
<table>
  <thead>
    <tr><th>Feature</th><th>Props</th><th>State</th></tr>
  </thead>
  <tbody>
    <tr><td>Who controls it?</td><td>Parent component</td><td>The component itself</td></tr>
    <tr><td>Can it change?</td><td>No (read-only)</td><td>Yes (via setter function)</td></tr>
    <tr><td>Direction</td><td>Top-down (parent → child)</td><td>Internal to the component</td></tr>
  </tbody>
</table>

<h3>Key Rules</h3>
<ul>
  <li>Props are <strong>read-only</strong> — a child component should never modify its own props.</li>
  <li>You can pass <strong>anything</strong> as a prop: strings, numbers, arrays, objects, functions, even other components.</li>
  <li>Use <strong>default values</strong> with destructuring: <code>({ color = "blue" })</code></li>
</ul>

<div class="knowledge-note">
  <strong>📌 Remember:</strong> Data flows <strong>one way</strong> in React — from parent to child. If a child needs to communicate up, the parent passes a <strong>callback function</strong> as a prop.
</div>`,
        codeExample: `// Child component receives props
function UserCard({ name, role, avatar }) {
  return (
    <div className="card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}

// Parent component passes props
export default function App() {
  return (
    <div>
      <UserCard
        name="Alice"
        role="Developer"
        avatar="/alice.jpg"
      />
      <UserCard
        name="Bob"
        role="Designer"
        avatar="/bob.jpg"
      />
    </div>
  );
}

// Passing a function as a prop
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}`,
      },
      {
        id: "react-4",
        slug: "useeffect",
        title: "The useEffect Hook",
        explanationHtml: `
<h3>What is useEffect?</h3>
<p><strong>useEffect</strong> is a React hook that lets you run <strong>side effects</strong> in your components. Side effects are things that happen <em>outside</em> of rendering — like fetching data, setting up timers, or updating the document title.</p>

<h3>When Does It Run?</h3>
<p>The behavior depends on the <strong>dependency array</strong> (the second argument):</p>
<table>
  <thead>
    <tr><th>Dependency Array</th><th>When It Runs</th></tr>
  </thead>
  <tbody>
    <tr><td>No array</td><td>After <strong>every</strong> render</td></tr>
    <tr><td><code>[]</code> (empty array)</td><td>Only <strong>once</strong>, after the first render</td></tr>
    <tr><td><code>[value]</code></td><td>After first render + whenever <code>value</code> changes</td></tr>
  </tbody>
</table>

<h3>Common Use Cases</h3>
<ul>
  <li><strong>Fetch data</strong> from an API when the component loads.</li>
  <li><strong>Set up subscriptions</strong> (WebSockets, event listeners).</li>
  <li><strong>Update the document title</strong> based on state.</li>
  <li><strong>Set timers</strong> (setTimeout, setInterval).</li>
</ul>

<h3>Cleanup Function</h3>
<p>If your effect creates something that needs to be cleaned up (like a timer or event listener), return a <strong>cleanup function</strong>. React calls it when the component unmounts or before re-running the effect.</p>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> Always include the variables your effect depends on in the dependency array. Forgetting a dependency is the #1 cause of bugs with useEffect.
</div>`,
        codeExample: `import { useState, useEffect } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data when userId changes
  useEffect(() => {
    setLoading(true);
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // Re-runs when userId changes

  if (loading) return <p>Loading...</p>;
  return <h1>{user.name}</h1>;
}

// Cleanup example: Timer
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup: clear interval on unmount
    return () => clearInterval(id);
  }, []);

  return <p>Seconds: {seconds}</p>;
}`,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 5 — SQL Fundamentals
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t5",
    slug: "sql",
    title: "SQL Fundamentals",
    description: "Master database querying — SELECT, filter, insert, and join data.",
    iconName: "Database",
    lessons: [
      {
        id: "sql-1",
        slug: "select",
        title: "The SELECT Statement",
        explanationHtml: `
<h3>What is SELECT?</h3>
<p>The <code>SELECT</code> statement is the most used SQL command. It retrieves (reads) data from one or more tables in a database.</p>
<p>Think of a database table like a spreadsheet — <code>SELECT</code> lets you choose which <strong>columns</strong> and <strong>rows</strong> to view.</p>

<h3>Basic Syntax</h3>
<ul>
  <li><code>SELECT column1, column2 FROM table_name;</code> — Get specific columns.</li>
  <li><code>SELECT * FROM table_name;</code> — Get <strong>all</strong> columns (the <code>*</code> means "everything").</li>
</ul>

<h3>Useful Clauses</h3>
<table>
  <thead>
    <tr><th>Clause</th><th>Purpose</th><th>Example</th></tr>
  </thead>
  <tbody>
    <tr><td><code>DISTINCT</code></td><td>Remove duplicate rows</td><td><code>SELECT DISTINCT city FROM users;</code></td></tr>
    <tr><td><code>ORDER BY</code></td><td>Sort results</td><td><code>... ORDER BY name ASC;</code></td></tr>
    <tr><td><code>LIMIT</code></td><td>Limit the number of rows</td><td><code>... LIMIT 10;</code></td></tr>
    <tr><td><code>AS</code></td><td>Rename a column (alias)</td><td><code>SELECT name AS full_name ...</code></td></tr>
  </tbody>
</table>

<div class="knowledge-tip">
  <strong>💡 Best Practice:</strong> Avoid using <code>SELECT *</code> in real applications — always specify the columns you need. It's faster and clearer.
</div>`,
        codeExample: `-- Get all columns from the users table
SELECT * FROM users;

-- Get specific columns
SELECT name, email FROM users;

-- Remove duplicates
SELECT DISTINCT country FROM users;

-- Sort results (A to Z)
SELECT name, age FROM users
ORDER BY name ASC;

-- Get only the first 5 results
SELECT name, email FROM users
LIMIT 5;

-- Rename a column in the output
SELECT name AS full_name, email AS contact
FROM users;`,
        tryItDefault: `-- Try modifying this query!
SELECT name, email
FROM users
ORDER BY name ASC
LIMIT 10;`,
      },
      {
        id: "sql-2",
        slug: "where-clause",
        title: "The WHERE Clause",
        explanationHtml: `
<h3>What is WHERE?</h3>
<p>The <code>WHERE</code> clause is used to <strong>filter rows</strong> based on a condition. Only rows that match the condition are included in the result.</p>
<p>It works like an "if" statement for your database query.</p>

<h3>Comparison Operators</h3>
<table>
  <thead>
    <tr><th>Operator</th><th>Meaning</th><th>Example</th></tr>
  </thead>
  <tbody>
    <tr><td><code>=</code></td><td>Equal to</td><td><code>WHERE age = 25</code></td></tr>
    <tr><td><code>!=</code> or <code>&lt;&gt;</code></td><td>Not equal to</td><td><code>WHERE status != 'inactive'</code></td></tr>
    <tr><td><code>&gt;</code></td><td>Greater than</td><td><code>WHERE price > 100</code></td></tr>
    <tr><td><code>&lt;</code></td><td>Less than</td><td><code>WHERE age < 18</code></td></tr>
    <tr><td><code>&gt;=</code></td><td>Greater than or equal</td><td><code>WHERE score >= 90</code></td></tr>
    <tr><td><code>BETWEEN</code></td><td>In a range</td><td><code>WHERE age BETWEEN 18 AND 30</code></td></tr>
    <tr><td><code>LIKE</code></td><td>Pattern matching</td><td><code>WHERE name LIKE 'A%'</code></td></tr>
    <tr><td><code>IN</code></td><td>Match a list of values</td><td><code>WHERE city IN ('Delhi', 'Mumbai')</code></td></tr>
  </tbody>
</table>

<h3>Combining Conditions</h3>
<ul>
  <li><code>AND</code> — Both conditions must be true.</li>
  <li><code>OR</code> — At least one condition must be true.</li>
  <li><code>NOT</code> — Reverses the condition.</li>
</ul>

<h3>LIKE Wildcards</h3>
<ul>
  <li><code>%</code> — Matches any number of characters. <code>'A%'</code> matches "Alice", "Alex".</li>
  <li><code>_</code> — Matches exactly one character. <code>'_ob'</code> matches "Bob", "Rob".</li>
</ul>

<div class="knowledge-note">
  <strong>📌 Important:</strong> String values in SQL must be wrapped in <strong>single quotes</strong>: <code>'value'</code>. Numbers do not need quotes.
</div>`,
        codeExample: `-- Filter by exact value
SELECT * FROM users WHERE age = 25;

-- Greater than
SELECT name, salary FROM employees
WHERE salary > 50000;

-- Pattern matching: names starting with 'S'
SELECT * FROM users WHERE name LIKE 'S%';

-- Multiple conditions with AND
SELECT * FROM products
WHERE price > 100 AND category = 'Electronics';

-- Multiple conditions with OR
SELECT * FROM users
WHERE city = 'Delhi' OR city = 'Mumbai';

-- Using IN for multiple values
SELECT * FROM users
WHERE country IN ('India', 'USA', 'UK');

-- Range with BETWEEN
SELECT * FROM orders
WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';`,
      },
      {
        id: "sql-3",
        slug: "insert-update-delete",
        title: "INSERT, UPDATE & DELETE",
        explanationHtml: `
<h3>Modifying Data</h3>
<p>SQL isn't just for reading data. You can also <strong>add</strong>, <strong>change</strong>, and <strong>remove</strong> data using three commands:</p>

<h3>INSERT INTO</h3>
<p>Adds a new row to a table.</p>
<ul>
  <li>You specify the table name, columns, and the values to insert.</li>
  <li>The order of values must match the order of columns.</li>
</ul>

<h3>UPDATE</h3>
<p>Changes existing data in a table.</p>
<ul>
  <li>Use <code>SET</code> to specify which columns to change and their new values.</li>
  <li><strong>Always use a WHERE clause</strong> — without it, <em>all</em> rows in the table will be updated!</li>
</ul>

<h3>DELETE</h3>
<p>Removes rows from a table.</p>
<ul>
  <li><strong>Always use a WHERE clause</strong> — without it, <em>all</em> rows will be deleted!</li>
  <li>Use <code>DELETE FROM table_name;</code> with extreme caution.</li>
</ul>

<div class="knowledge-note">
  <strong>⚠️ Warning:</strong> <code>UPDATE</code> and <code>DELETE</code> without a <code>WHERE</code> clause will affect <strong>every row</strong> in the table. Always double-check your <code>WHERE</code> condition before running these commands on production databases.
</div>`,
        codeExample: `-- INSERT: Add a new user
INSERT INTO users (name, email, age)
VALUES ('Alice', 'alice@email.com', 25);

-- INSERT: Add multiple rows at once
INSERT INTO users (name, email, age) VALUES
  ('Bob', 'bob@email.com', 30),
  ('Charlie', 'charlie@email.com', 28);

-- UPDATE: Change a user's email
UPDATE users
SET email = 'newalice@email.com'
WHERE name = 'Alice';

-- UPDATE: Increase all prices by 10%
UPDATE products
SET price = price * 1.10
WHERE category = 'Electronics';

-- DELETE: Remove a specific user
DELETE FROM users
WHERE id = 5;

-- DELETE: Remove all inactive users
DELETE FROM users
WHERE status = 'inactive';`,
        tryItDefault: `-- Practice INSERT, UPDATE, DELETE!
INSERT INTO students (name, grade)
VALUES ('Alice', 'A');

UPDATE students
SET grade = 'A+'
WHERE name = 'Alice';

-- Be careful with DELETE!
DELETE FROM students
WHERE name = 'Alice';`,
      },
      {
        id: "sql-4",
        slug: "joins",
        title: "SQL JOINs",
        explanationHtml: `
<h3>What are JOINs?</h3>
<p>A <code>JOIN</code> combines rows from <strong>two or more tables</strong> based on a related column. This is what makes relational databases powerful — you can split data across tables and reconnect it when needed.</p>

<h3>Types of JOINs</h3>
<table>
  <thead>
    <tr><th>JOIN Type</th><th>What It Returns</th></tr>
  </thead>
  <tbody>
    <tr><td><code>INNER JOIN</code></td><td>Only rows that have a match in <strong>both</strong> tables.</td></tr>
    <tr><td><code>LEFT JOIN</code></td><td>All rows from the <strong>left table</strong> + matching rows from the right.</td></tr>
    <tr><td><code>RIGHT JOIN</code></td><td>All rows from the <strong>right table</strong> + matching rows from the left.</td></tr>
    <tr><td><code>FULL JOIN</code></td><td>All rows from <strong>both tables</strong>, matched where possible.</td></tr>
  </tbody>
</table>

<h3>How It Works</h3>
<ul>
  <li>You need a <strong>common column</strong> between the two tables (usually an ID).</li>
  <li>The <code>ON</code> keyword specifies the matching condition.</li>
  <li>Use <strong>table aliases</strong> to keep queries readable.</li>
</ul>

<h3>When to Use Each JOIN</h3>
<ul>
  <li><strong>INNER JOIN</strong> — When you only want rows that exist in both tables (most common).</li>
  <li><strong>LEFT JOIN</strong> — When you want all items from one table, even if they don't have a match in the other (e.g., all users, even those with no orders).</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> <code>INNER JOIN</code> is the most commonly used join. If you're unsure, start with <code>INNER JOIN</code> and switch to <code>LEFT JOIN</code> if you need unmatched rows too.
</div>`,
        codeExample: `-- INNER JOIN: Get orders with user names
SELECT users.name, orders.product, orders.amount
FROM users
INNER JOIN orders ON users.id = orders.user_id;

-- LEFT JOIN: All users, even without orders
SELECT u.name, o.product
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- JOIN with aliases and WHERE
SELECT
  u.name AS customer,
  o.product,
  o.amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.amount > 100
ORDER BY o.amount DESC;

-- JOIN three tables
SELECT
  u.name,
  o.id AS order_id,
  p.title AS product_name
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN products p ON o.product_id = p.id;`,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 6 — TypeScript
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t6",
    slug: "typescript",
    title: "TypeScript",
    description: "Add type safety to JavaScript — catch errors before your code runs.",
    iconName: "FileCode",
    lessons: [
      {
        id: "ts-1",
        slug: "what-is-typescript",
        title: "What is TypeScript?",
        explanationHtml: `
<h3>Definition</h3>
<p><strong>TypeScript</strong> is a syntactic superset of JavaScript which adds <strong>static typing</strong>.</p>
<p>It allows you to define what types of data (string, number, object, etc.) your variables and functions should use. This helps catch errors <em>during development</em> rather than at runtime.</p>
<h3>Why Use TypeScript?</h3>
<ul>
  <li><strong>Error Prevention:</strong> Catches common bugs (like typos or passing the wrong data type) before you even run the code.</li>
  <li><strong>Better Autocomplete:</strong> Editors like VS Code provide much better intellisense when they know your types.</li>
  <li><strong>Easier Refactoring:</strong> Changing large codebases is safer because the compiler will warn you if you break something.</li>
</ul>
<div class="knowledge-tip">
  <strong>💡 Note:</strong> Browsers cannot run TypeScript directly. It must be <strong>compiled</strong> (transpiled) into plain JavaScript first.
</div>`,
        codeExample: `// Standard JavaScript (allows changing types)
let myVar = "Hello";
myVar = 42; // Valid in JS, but might cause bugs

// TypeScript (Static Typing)
let myText: string = "Hello";
// myText = 42; // ❌ Error: Type 'number' is not assignable to type 'string'

function greet(name: string): string {
  return "Hello " + name;
}

greet("Alice"); // ✅ Works
// greet(123);  // ❌ Error: Argument of type 'number' is not assignable to parameter of type 'string'
`,
      },
      {
        id: "ts-2",
        slug: "interfaces-and-types",
        title: "Interfaces and Types",
        explanationHtml: `
<h3>Defining Custom Types</h3>
<p>In TypeScript, you can define the shape of an object using <code>interface</code> or <code>type</code>.</p>
<ul>
  <li><strong>Interface:</strong> Best for defining object structures and classes. Can be extended easily.</li>
  <li><strong>Type Alias:</strong> More versatile. Can be used for primitives, unions, and complex types.</li>
</ul>
<h3>Union Types</h3>
<p>You can allow a variable to be one of multiple types using the <code>|</code> (pipe) symbol. This is called a Union Type.</p>
<div class="knowledge-tip">
  <strong>💡 Tip:</strong> For most object shapes in modern React/TS development, <code>type</code> and <code>interface</code> are nearly identical. Use <code>interface</code> for object definitions by default.
</div>`,
        codeExample: `// Using an Interface
interface User {
  id: number;
  name: string;
  isAdmin?: boolean; // The '?' makes this optional
}

const user1: User = {
  id: 1,
  name: "John"
  // isAdmin is optional
};

// Using a Type Alias
type ID = number | string; // Union type

let userId: ID;
userId = 101;    // ✅ Valid
userId = "U-123"; // ✅ Valid
// userId = true;   // ❌ Error

// Type definition for a function
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (x, y) => x + y;
`,
      }
    ]
  },
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 7 — MongoDB
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t7",
    slug: "mongodb",
    title: "MongoDB",
    description: "Work with NoSQL databases — store and query flexible, document-based data.",
    iconName: "Database",
    lessons: [
      {
        id: "mongo-1",
        slug: "nosql-and-documents",
        title: "NoSQL and Documents",
        explanationHtml: `
<h3>What is MongoDB?</h3>
<p><strong>MongoDB</strong> is a NoSQL database. Unlike SQL databases (like MySQL or Postgres) that store data in rigid tables, MongoDB stores data in flexible, JSON-like <strong>documents</strong>.</p>
<h3>Key Concepts</h3>
<ul>
  <li><strong>Database:</strong> The physical container for collections.</li>
  <li><strong>Collection:</strong> A group of MongoDB documents (equivalent to an SQL Table).</li>
  <li><strong>Document:</strong> A set of key-value pairs (equivalent to an SQL Row). Documents have dynamic schemas.</li>
</ul>
<h3>Why Use MongoDB?</h3>
<ul>
  <li><strong>Flexibility:</strong> You don't need to define a rigid schema before inserting data.</li>
  <li><strong>Scalability:</strong> Built to scale out across multiple servers easily.</li>
  <li><strong>JSON-friendly:</strong> Works seamlessly with JavaScript/Node.js applications.</li>
</ul>`,
        codeExample: `// A typical MongoDB Document (JSON/BSON format)
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "username": "johndoe",
  "email": "john@example.com",
  "age": 28,
  "hobbies": ["reading", "gaming"],
  "address": {
    "city": "New York",
    "zip": "10001"
  }
}
// Notice how it can store arrays and nested objects directly!
`,
      },
      {
        id: "mongo-2",
        slug: "crud-operations",
        title: "CRUD Operations",
        explanationHtml: `
<h3>Basic Database Operations</h3>
<p>CRUD stands for <strong>Create, Read, Update, Delete</strong>. In MongoDB, you perform these using specific methods on your collections.</p>
<ul>
  <li><strong>Create:</strong> <code>insertOne()</code>, <code>insertMany()</code></li>
  <li><strong>Read:</strong> <code>find()</code>, <code>findOne()</code></li>
  <li><strong>Update:</strong> <code>updateOne()</code>, <code>updateMany()</code></li>
  <li><strong>Delete:</strong> <code>deleteOne()</code>, <code>deleteMany()</code></li>
</ul>
<div class="knowledge-tip">
  <strong>💡 Tip:</strong> In Node.js, we typically use an ODM (Object Data Modeling) library like <strong>Mongoose</strong> to enforce some structure and make queries easier.
</div>`,
        codeExample: `// Find all users over age 18
db.users.find({ age: { $gt: 18 } })

// Insert a new user
db.users.insertOne({
  name: "Alice",
  age: 25,
  status: "active"
})

// Update a user's status
db.users.updateOne(
  { name: "Alice" }, // Filter
  { $set: { status: "inactive" } } // Update action
)

// Delete a user
db.users.deleteOne({ name: "Alice" })
`,
      }
    ]
  },
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 8 — Tailwind CSS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t8",
    slug: "tailwind",
    title: "Tailwind CSS",
    description: "Build modern UIs rapidly using utility-first CSS classes.",
    iconName: "Wind",
    lessons: [
      {
        id: "tailwind-1",
        slug: "utility-first-css",
        title: "Utility-First CSS",
        explanationHtml: `
<h3>What is Tailwind CSS?</h3>
<p><strong>Tailwind CSS</strong> is a utility-first CSS framework. Instead of writing custom CSS classes like <code>.btn-primary</code>, you construct designs by composing tiny, single-purpose classes directly in your HTML.</p>
<h3>Benefits of Tailwind</h3>
<ul>
  <li><strong>No Naming Conventions:</strong> Stop wasting time thinking up class names.</li>
  <li><strong>Smaller CSS Bundles:</strong> Tailwind purges unused classes, resulting in tiny file sizes.</li>
  <li><strong>Faster Development:</strong> Build complex layouts without ever leaving your HTML file.</li>
</ul>
<div class="knowledge-tip">
  <strong>💡 Tip:</strong> At first, your HTML might look cluttered with many classes, but the speed and consistency you gain are well worth it!
</div>`,
        codeExample: `<!-- Traditional CSS Approach -->
<style>
  .chat-notification {
    display: flex;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1.5rem;
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
</style>
<div class="chat-notification">...</div>

<!-- Tailwind CSS Approach -->
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-slate-500">You have a new message!</p>
  </div>
</div>
`,
      },
      {
        id: "tailwind-2",
        slug: "responsive-design",
        title: "Responsive Design",
        explanationHtml: `
<h3>Mobile-First Approach</h3>
<p>Tailwind uses a mobile-first breakpoint system. Unprefixed utilities take effect on all screen sizes, while prefixed utilities (like <code>md:</code> or <code>lg:</code>) apply to specific breakpoints and larger.</p>
<h3>Standard Breakpoints</h3>
<ul>
  <li><code>sm:</code> - 640px and up (Tablets)</li>
  <li><code>md:</code> - 768px and up (Small laptops)</li>
  <li><code>lg:</code> - 1024px and up (Desktops)</li>
  <li><code>xl:</code> - 1280px and up (Large monitors)</li>
</ul>`,
        codeExample: `<!-- Responsive grid layout -->
<!-- 1 column on mobile, 2 on tablet, 4 on desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <div class="bg-blue-500 p-4">Item 1</div>
  <div class="bg-blue-500 p-4">Item 2</div>
  <div class="bg-blue-500 p-4">Item 3</div>
  <div class="bg-blue-500 p-4">Item 4</div>
</div>

<!-- Responsive text alignment and color -->
<p class="text-center md:text-left text-red-500 hover:text-red-700">
  This text changes alignment on medium screens.
</p>
`,
      }
    ]
  },
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 9 — Data Structures
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t9",
    slug: "data-structures",
    title: "Data Structures",
    description: "Understand arrays, stacks, queues, linked lists, and trees.",
    iconName: "Network",
    lessons: [
      {
        id: "dsa-1",
        slug: "stacks-and-queues",
        title: "Stacks and Queues",
        explanationHtml: `
<h3>What are Data Structures?</h3>
<p>A data structure is a specialized format for organizing, processing, retrieving and storing data.</p>
<h3>Stack (LIFO)</h3>
<p>A Stack follows the <strong>Last In, First Out</strong> (LIFO) principle. Think of it like a stack of plates — you add to the top, and you remove from the top.</p>
<ul>
  <li><strong>Push:</strong> Add an item to the top.</li>
  <li><strong>Pop:</strong> Remove the top item.</li>
</ul>
<h3>Queue (FIFO)</h3>
<p>A Queue follows the <strong>First In, First Out</strong> (FIFO) principle. Think of it like a line at a grocery store — the first person in line is the first to be served.</p>
<ul>
  <li><strong>Enqueue:</strong> Add an item to the back of the line.</li>
  <li><strong>Dequeue:</strong> Remove the item from the front.</li>
</ul>`,
        codeExample: `// Implementing a Stack in JavaScript using an Array
class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    if (this.items.length === 0) return "Underflow";
    return this.items.pop();
  }
}

let stack = new Stack();
stack.push(10);
stack.push(20);
console.log(stack.pop()); // 20
`,
      },
      {
        id: "dsa-2",
        slug: "hash-tables",
        title: "Hash Tables",
        explanationHtml: `
<h3>What is a Hash Table?</h3>
<p>A Hash Table (or Hash Map) is a data structure that implements an associative array abstract data type, a structure that can map <strong>keys to values</strong>.</p>
<p>It uses a <strong>hash function</strong> to compute an index into an array of buckets or slots, from which the desired value can be found.</p>
<h3>Why Use Hash Tables?</h3>
<ul>
  <li><strong>Extremely Fast:</strong> Data retrieval (lookup), insertion, and deletion are extremely fast — typically O(1) time complexity on average.</li>
</ul>
<div class="knowledge-tip">
  <strong>💡 Note:</strong> In JavaScript, standard <code>Objects</code> and the built-in <code>Map</code> data structure function essentially as hash tables.
</div>`,
        codeExample: `// Using a JavaScript Map as a Hash Table
const userRoles = new Map();

// Inserting data
userRoles.set('alice123', 'admin');
userRoles.set('bob456', 'editor');

// Fast Lookup O(1)
console.log(userRoles.get('alice123')); // 'admin'

// Checking existence
console.log(userRoles.has('charlie789')); // false

// Deletion
userRoles.delete('bob456');
`,
      }
    ]
  },
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 10 — Linux Commands
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t10",
    slug: "linux",
    title: "Linux Commands",
    description: "Navigate the terminal, manage files, and run commands like a pro.",
    iconName: "TerminalSquare",
    lessons: [
      {
        id: "linux-1",
        slug: "file-system-navigation",
        title: "File System Navigation",
        explanationHtml: `
<h3>The Command Line</h3>
<p>The Linux command line (terminal) is a text interface to your computer. It allows you to perform tasks much faster than using a graphical user interface (GUI).</p>
<h3>Basic Navigation Commands</h3>
<ul>
  <li><code>pwd</code> : Print Working Directory (shows where you are).</li>
  <li><code>ls</code> : List contents of a directory.</li>
  <li><code>cd</code> : Change Directory.</li>
</ul>
<h3>Absolute vs Relative Paths</h3>
<ul>
  <li><strong>Absolute:</strong> Starts from the root directory <code>/</code> (e.g., <code>/home/user/documents</code>).</li>
  <li><strong>Relative:</strong> Starts from your current directory (e.g., <code>../downloads</code>).</li>
</ul>`,
        codeExample: `# Print current directory
$ pwd
/home/user/desktop

# List files and folders
$ ls
project-folder  notes.txt

# List files with detailed information and hidden files
$ ls -la

# Go into a folder
$ cd project-folder

# Go up one directory level
$ cd ..

# Go to your home directory instantly
$ cd ~
`,
      },
      {
        id: "linux-2",
        slug: "file-management",
        title: "File Management",
        explanationHtml: `
<h3>Creating and Removing Files</h3>
<p>Managing files and directories is a daily task in the terminal.</p>
<ul>
  <li><code>mkdir</code> : Make directory (create a folder).</li>
  <li><code>touch</code> : Create a new empty file.</li>
  <li><code>rm</code> : Remove a file.</li>
  <li><code>rm -r</code> : Remove a directory recursively.</li>
  <li><code>cp</code> : Copy files or directories.</li>
  <li><code>mv</code> : Move (or rename) files or directories.</li>
</ul>
<div class="knowledge-note">
  <strong>📌 Warning:</strong> Be very careful with the <code>rm</code> command, especially with the <code>-r</code> (recursive) and <code>-f</code> (force) flags. There is no recycling bin in the terminal!
</div>`,
        codeExample: `# Create a new folder
$ mkdir my-website

# Create an empty file
$ touch index.html

# Copy a file
$ cp index.html about.html

# Move or Rename a file
$ mv about.html contact.html

# Delete a file
$ rm contact.html

# Delete a folder and all its contents
$ rm -rf my-website
`,
      }
    ]
  },
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 11 — C Programming
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t11",
    slug: "c-programming",
    title: "C Programming",
    description: "Learn the foundational language behind operating systems, embedded systems, and more.",
    iconName: "Cpu",
    lessons: [
      {
        id: "c-1",
        slug: "introduction-to-c",
        title: "Introduction to C",
        explanationHtml: `
<h3>What is C?</h3>
<p><strong>C</strong> is a general-purpose, procedural computer programming language supporting structured programming, lexical variable scope, and recursion. By design, C provides constructs that map efficiently to typical machine instructions.</p>
<h3>Why Learn C?</h3>
<ul>
  <li><strong>Foundation:</strong> Many modern languages (C++, Java, Python, JavaScript) borrow heavily from C syntax.</li>
  <li><strong>Performance:</strong> C is incredibly fast and close to the hardware.</li>
  <li><strong>Use Cases:</strong> Operating systems (Linux, Windows kernel), embedded systems, database engines (MySQL), and high-performance applications.</li>
</ul>`,
        codeExample: `#include <stdio.h>

// The main function is the entry point of every C program
int main() {
    // printf is used to print text to the console
    printf("Hello, World!\\n");
    
    // Return 0 indicates successful execution
    return 0;
}
`,
      },
      {
        id: "c-2",
        slug: "pointers-basics",
        title: "Pointers Basics",
        explanationHtml: `
<h3>What are Pointers?</h3>
<p>A <strong>pointer</strong> is a variable whose value is the <strong>memory address</strong> of another variable.</p>
<p>Pointers are considered one of the most powerful—and challenging—features of C. They allow for dynamic memory allocation and efficient array/string manipulation.</p>
<h3>Key Operators</h3>
<ul>
  <li><code>&</code> (Address-of operator): Returns the memory address of its operand.</li>
  <li><code>*</code> (Dereference operator): Returns the value stored at the address kept in the pointer.</li>
</ul>`,
        codeExample: `#include <stdio.h>

int main() {
    int age = 25;       // A normal integer variable
    int *ptr = &age;    // A pointer variable storing the address of 'age'

    printf("Value of age: %d\\n", age);           // Outputs 25
    printf("Memory address of age: %p\\n", ptr);  // Outputs address (e.g., 0x7ffe...)
    
    // Dereferencing the pointer to get the value
    printf("Value stored at ptr: %d\\n", *ptr);   // Outputs 25
    
    return 0;
}
`,
      }
    ]
  },
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 12 — Java Basics
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t12",
    slug: "java",
    title: "Java Basics",
    description: "Learn the enterprise-grade, object-oriented language used by millions of developers.",
    iconName: "Coffee",
    lessons: [
      {
        id: "java-1",
        slug: "java-hello-world",
        title: "Hello World and OOP",
        explanationHtml: `
<h3>What is Java?</h3>
<p><strong>Java</strong> is a high-level, class-based, object-oriented programming language. It is designed to have as few implementation dependencies as possible, summarized by the mantra: <em>"Write once, run anywhere"</em> (WORA).</p>
<h3>Key Features</h3>
<ul>
  <li><strong>Object-Oriented:</strong> Everything in Java is an Object (except primitives).</li>
  <li><strong>Platform Independent:</strong> Java code compiles to bytecode, which runs on the Java Virtual Machine (JVM) on any OS.</li>
  <li><strong>Strongly Typed:</strong> You must declare the type of all variables.</li>
</ul>`,
        codeExample: `// Every application begins with a class name that matches the filename
public class Main {
    
    // The main method: entry point of the program
    public static void main(String[] args) {
        
        // Print statement
        System.out.println("Hello, World!");
        
        // Variable declaration (Strongly typed)
        int num = 10;
        String name = "Alice";
    }
}
`,
      },
      {
        id: "java-2",
        slug: "classes-and-objects",
        title: "Classes and Objects",
        explanationHtml: `
<h3>Object-Oriented Programming (OOP)</h3>
<p>Java is heavily based on OOP concepts.</p>
<ul>
  <li><strong>Class:</strong> A blueprint or template for creating objects.</li>
  <li><strong>Object:</strong> An instance of a class.</li>
</ul>
<h3>Constructors and Methods</h3>
<ul>
  <li><strong>Constructor:</strong> A special method used to initialize objects. It has the same name as the class.</li>
  <li><strong>Method:</strong> Functions defined inside a class that describe the behaviors of an object.</li>
</ul>`,
        codeExample: `// Class definition
class Car {
    String color;
    int year;

    // Constructor
    public Car(String c, int y) {
        color = c;
        year = y;
    }

    // Method
    public void startEngine() {
        System.out.println("The " + color + " car is starting.");
    }
}

public class Main {
    public static void main(String[] args) {
        // Creating an object (Instance) of the Car class
        Car myCar = new Car("Red", 2023);
        
        // Calling a method on the object
        myCar.startEngine(); // Outputs: The Red car is starting.
    }
}
`,
      }
    ]
  },
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 13 — PHP Basics
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t13",
    slug: "php",
    title: "PHP Basics",
    description: "Learn the server-side language that powers WordPress and millions of websites.",
    iconName: "Server",
    lessons: [
      {
        id: "php-1",
        slug: "what-is-php",
        title: "What is PHP?",
        explanationHtml: `
<h3>Definition</h3>
<p><strong>PHP</strong> (Hypertext Preprocessor) is a widely-used open source general-purpose scripting language that is especially suited for web development and can be embedded into HTML.</p>
<h3>How PHP Works</h3>
<p>Unlike JavaScript, which usually runs in the browser (client-side), PHP runs on the <strong>web server</strong>. The server processes the PHP code and returns pure HTML to the client's browser.</p>
<div class="knowledge-tip">
  <strong>💡 Tip:</strong> PHP code is enclosed in special start and end processing instructions <code>&lt;?php</code> and <code>?&gt;</code>.
</div>`,
        codeExample: `<!DOCTYPE html>
<html>
<body>

<h1>My First PHP Page</h1>

<?php
  // PHP code goes here
  echo "Hello World!";
  
  // Variables in PHP start with a $ sign
  $greeting = "Welcome to PHP";
  echo "<p>" . $greeting . "</p>"; // The dot (.) is used for string concatenation
?>

</body>
</html>
`,
      },
      {
        id: "php-2",
        slug: "php-arrays-and-loops",
        title: "Arrays and Loops",
        explanationHtml: `
<h3>Arrays in PHP</h3>
<p>PHP has three types of arrays:</p>
<ul>
  <li><strong>Indexed arrays:</strong> Arrays with a numeric index.</li>
  <li><strong>Associative arrays:</strong> Arrays with named keys (like dictionaries or objects in other languages).</li>
  <li><strong>Multidimensional arrays:</strong> Arrays containing one or more arrays.</li>
</ul>
<h3>The foreach Loop</h3>
<p>The <code>foreach</code> loop is specifically designed to loop through arrays easily in PHP.</p>`,
        codeExample: `<?php
// Indexed Array
$colors = array("Red", "Green", "Blue");

// Iterating over indexed array
foreach ($colors as $color) {
  echo $color . "<br>";
}

// Associative Array
$ages = array(
  "Peter" => 35,
  "Ben" => 37,
  "Joe" => 43
);

// Iterating over associative array
foreach ($ages as $name => $age) {
  echo "Name: " . $name . ", Age: " . $age . "<br>";
}
?>
`,
      }
    ]
  },
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 14 — Bootstrap
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t14",
    slug: "bootstrap",
    title: "Bootstrap",
    description: "Build responsive, mobile-first websites quickly with pre-built components.",
    iconName: "Layout",
    lessons: [
      {
        id: "bs-1",
        slug: "bootstrap-grid",
        title: "The Grid System",
        explanationHtml: `
<h3>What is Bootstrap?</h3>
<p><strong>Bootstrap</strong> is the world's most popular front-end open source toolkit. It provides pre-styled CSS classes and JavaScript plugins to build responsive sites quickly.</p>
<h3>The Grid System</h3>
<p>Bootstrap’s grid system uses a series of containers, rows, and columns to layout and align content. It’s built with flexbox and is fully responsive.</p>
<ul>
  <li><strong>Container:</strong> Wraps the site content and centers it.</li>
  <li><strong>Row:</strong> A wrapper for columns.</li>
  <li><strong>Columns:</strong> The grid consists of up to 12 columns across the page.</li>
</ul>`,
        codeExample: `<!-- Include Bootstrap via CDN in your head tag -->
<!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"> -->

<div class="container">
  <!-- A Row -->
  <div class="row">
    <!-- Columns that take up equal width -->
    <div class="col">Column 1</div>
    <div class="col">Column 2</div>
    <div class="col">Column 3</div>
  </div>
  
  <div class="row mt-4">
    <!-- Columns specifying out of 12 -->
    <div class="col-8 bg-primary text-white p-3">Takes up 8/12</div>
    <div class="col-4 bg-secondary text-white p-3">Takes up 4/12</div>
  </div>
</div>
`,
      },
      {
        id: "bs-2",
        slug: "bootstrap-components",
        title: "Pre-built Components",
        explanationHtml: `
<h3>Ready-to-Use UI</h3>
<p>Bootstrap shines because it offers dozens of pre-styled components. Instead of writing custom CSS for standard UI elements, you just apply Bootstrap classes.</p>
<h3>Common Components</h3>
<ul>
  <li><strong>Buttons:</strong> <code>btn</code>, <code>btn-primary</code>, <code>btn-danger</code></li>
  <li><strong>Cards:</strong> Flexible content containers.</li>
  <li><strong>Alerts:</strong> Contextual feedback messages.</li>
  <li><strong>Navbars:</strong> Responsive navigation headers.</li>
</ul>`,
        codeExample: `<!-- Bootstrap Button -->
<button type="button" class="btn btn-success">Success Button</button>

<!-- Bootstrap Alert -->
<div class="alert alert-warning mt-3" role="alert">
  This is a warning alert—check it out!
</div>

<!-- Bootstrap Card -->
<div class="card mt-4" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title.</p>
    <a href="#" class="card-link">Card link</a>
  </div>
</div>
`,
      }
    ]
  }

];
