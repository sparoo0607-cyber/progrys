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
  // TOPIC 6 — Python Basics
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t6",
    slug: "python",
    title: "Python Basics",
    description: "Learn the most beginner-friendly programming language — syntax, variables, and logic.",
    iconName: "Terminal",
    lessons: [
      {
        id: "py-1",
        slug: "what-is-python",
        title: "What is Python?",
        explanationHtml: `
<h3>Definition</h3>
<p><strong>Python</strong> is a high-level, interpreted programming language known for its <strong>simple and readable syntax</strong>. It is one of the most popular languages in the world, used for web development, data science, automation, AI, and more.</p>

<h3>Why Learn Python?</h3>
<ul>
  <li><strong>Easy to read</strong> — Python code looks almost like English.</li>
  <li><strong>Versatile</strong> — Used in web dev, AI, data science, scripting, and automation.</li>
  <li><strong>Huge community</strong> — Thousands of libraries and frameworks available.</li>
  <li><strong>In demand</strong> — One of the most sought-after skills in the job market.</li>
</ul>

<h3>How Python Works</h3>
<ul>
  <li>Python is an <strong>interpreted</strong> language — code runs line by line, no compilation step.</li>
  <li>Python uses <strong>indentation</strong> (spaces/tabs) to define code blocks, not curly braces.</li>
  <li>Files use the <code>.py</code> extension.</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> Python 3 is the current standard. Always use Python 3.x — Python 2 is no longer supported.
</div>`,
        codeExample: `# Your first Python program
print("Hello, World!")

# Variables (no type declaration needed)
name = "Alice"
age = 25
is_student = True

# Simple calculation
price = 99.99
tax = price * 0.18
total = price + tax
print(f"Total: ${total:.2f}")`,
        tryItDefault: `# Try changing the values!
name = "Your Name"
age = 20
print(f"Hi, I'm {name} and I'm {age} years old.")`,
      },
      {
        id: "py-2",
        slug: "python-data-types",
        title: "Data Types & Variables",
        explanationHtml: `
<h3>Variables in Python</h3>
<p>In Python, you don't need to declare a variable's type — Python <strong>figures it out automatically</strong>. Just assign a value using <code>=</code>.</p>

<h3>Common Data Types</h3>
<table>
  <thead><tr><th>Type</th><th>Example</th><th>Description</th></tr></thead>
  <tbody>
    <tr><td><code>str</code></td><td><code>"Hello"</code></td><td>Text (string)</td></tr>
    <tr><td><code>int</code></td><td><code>42</code></td><td>Whole number</td></tr>
    <tr><td><code>float</code></td><td><code>3.14</code></td><td>Decimal number</td></tr>
    <tr><td><code>bool</code></td><td><code>True</code> / <code>False</code></td><td>Boolean</td></tr>
    <tr><td><code>list</code></td><td><code>[1, 2, 3]</code></td><td>Ordered, mutable collection</td></tr>
    <tr><td><code>dict</code></td><td><code>{"key": "value"}</code></td><td>Key-value pairs</td></tr>
    <tr><td><code>tuple</code></td><td><code>(1, 2, 3)</code></td><td>Ordered, immutable collection</td></tr>
  </tbody>
</table>

<h3>Type Checking</h3>
<p>Use <code>type()</code> to check a variable's type: <code>type(42)</code> returns <code>&lt;class 'int'&gt;</code>.</p>

<div class="knowledge-note">
  <strong>📌 Important:</strong> Python is <strong>dynamically typed</strong> — a variable can change its type. <code>x = 5</code> then <code>x = "hello"</code> is perfectly valid.
</div>`,
        codeExample: `# Strings
name = "Alice"
greeting = f"Hello, {name}!"

# Numbers
age = 25          # int
height = 5.7      # float

# Boolean
is_active = True

# List (mutable)
fruits = ["apple", "banana", "mango"]
fruits.append("orange")

# Dictionary
user = {
    "name": "Alice",
    "age": 25,
    "email": "alice@mail.com"
}
print(user["name"])  # "Alice"

# Check type
print(type(age))     # <class 'int'>`,
      },
      {
        id: "py-3",
        slug: "python-control-flow",
        title: "If/Else & Loops",
        explanationHtml: `
<h3>Conditional Statements</h3>
<p>Use <code>if</code>, <code>elif</code>, and <code>else</code> to run code based on conditions.</p>
<ul>
  <li>Python uses <strong>indentation</strong> (4 spaces) to mark code blocks — no curly braces.</li>
  <li>Use <code>:</code> after each condition.</li>
</ul>

<h3>Comparison Operators</h3>
<table>
  <thead><tr><th>Operator</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td><code>==</code></td><td>Equal to</td></tr>
    <tr><td><code>!=</code></td><td>Not equal to</td></tr>
    <tr><td><code>&gt;</code>, <code>&lt;</code></td><td>Greater / Less than</td></tr>
    <tr><td><code>&gt;=</code>, <code>&lt;=</code></td><td>Greater/Less than or equal</td></tr>
    <tr><td><code>and</code>, <code>or</code>, <code>not</code></td><td>Logical operators</td></tr>
  </tbody>
</table>

<h3>Loops</h3>
<ul>
  <li><strong>for loop</strong> — Iterate over a sequence (list, string, range).</li>
  <li><strong>while loop</strong> — Repeat as long as a condition is true.</li>
  <li><code>break</code> — Exit the loop early.</li>
  <li><code>continue</code> — Skip to the next iteration.</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> Use <code>range(n)</code> to loop a specific number of times: <code>for i in range(5)</code> runs 5 times (0 to 4).
</div>`,
        codeExample: `# If/Elif/Else
age = 18
if age >= 18:
    print("You are an adult")
elif age >= 13:
    print("You are a teenager")
else:
    print("You are a child")

# For loop
fruits = ["apple", "banana", "mango"]
for fruit in fruits:
    print(fruit)

# For loop with range
for i in range(1, 6):
    print(f"Count: {i}")

# While loop
count = 0
while count < 5:
    print(count)
    count += 1

# List comprehension (shortcut)
squares = [x**2 for x in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]`,
        tryItDefault: `# Try building a simple grade checker!
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print(f"Score: {score}, Grade: {grade}")`,
      },
      {
        id: "py-4",
        slug: "python-functions",
        title: "Functions in Python",
        explanationHtml: `
<h3>What are Functions?</h3>
<p>Functions are reusable blocks of code defined with the <code>def</code> keyword. They help you organize your code and avoid repetition.</p>

<h3>Function Syntax</h3>
<ul>
  <li>Use <code>def function_name(parameters):</code> to define a function.</li>
  <li>Use <code>return</code> to send a value back to the caller.</li>
  <li>Parameters can have <strong>default values</strong>.</li>
</ul>

<h3>Types of Arguments</h3>
<table>
  <thead><tr><th>Type</th><th>Example</th><th>Description</th></tr></thead>
  <tbody>
    <tr><td>Positional</td><td><code>greet("Alice")</code></td><td>Matched by position</td></tr>
    <tr><td>Keyword</td><td><code>greet(name="Alice")</code></td><td>Matched by name</td></tr>
    <tr><td>Default</td><td><code>def greet(name="Guest")</code></td><td>Fallback value</td></tr>
    <tr><td>*args</td><td><code>def add(*nums)</code></td><td>Variable number of positional args</td></tr>
    <tr><td>**kwargs</td><td><code>def info(**data)</code></td><td>Variable number of keyword args</td></tr>
  </tbody>
</table>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> Python also supports <strong>lambda functions</strong> for short, one-line operations: <code>square = lambda x: x ** 2</code>.
</div>`,
        codeExample: `# Basic function
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))

# Default parameter
def welcome(name="Guest"):
    print(f"Welcome, {name}!")

welcome()         # "Welcome, Guest!"
welcome("Bob")    # "Welcome, Bob!"

# Multiple return values
def get_stats(numbers):
    return min(numbers), max(numbers), sum(numbers)

low, high, total = get_stats([3, 7, 1, 9, 4])
print(f"Min: {low}, Max: {high}, Sum: {total}")

# Lambda function
double = lambda x: x * 2
print(double(5))  # 10`,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 7 — Node.js
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t7",
    slug: "nodejs",
    title: "Node.js",
    description: "Run JavaScript on the server — build APIs, servers, and backend services.",
    iconName: "Server",
    lessons: [
      {
        id: "node-1",
        slug: "what-is-nodejs",
        title: "What is Node.js?",
        explanationHtml: `
<h3>Definition</h3>
<p><strong>Node.js</strong> is a <strong>JavaScript runtime</strong> that lets you run JavaScript code <strong>outside the browser</strong> — on servers, your computer, or anywhere.</p>
<p>Before Node.js, JavaScript could only run in browsers. Node.js changed that by using Chrome's V8 engine to execute JS on the server side.</p>

<h3>Why Use Node.js?</h3>
<ul>
  <li><strong>One language everywhere</strong> — Use JavaScript for both frontend and backend.</li>
  <li><strong>Non-blocking I/O</strong> — Handles thousands of connections simultaneously.</li>
  <li><strong>npm</strong> — Access to the world's largest package ecosystem.</li>
  <li><strong>Fast</strong> — Built on Chrome's V8 engine.</li>
</ul>

<h3>Common Use Cases</h3>
<ul>
  <li>REST APIs and GraphQL servers</li>
  <li>Real-time apps (chat, live notifications)</li>
  <li>Command-line tools</li>
  <li>Microservices</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> Use <code>node filename.js</code> to run any JavaScript file from your terminal.
</div>`,
        codeExample: `// Run this with: node app.js
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from Node.js!");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});`,
      },
      {
        id: "node-2",
        slug: "npm-packages",
        title: "npm & Packages",
        explanationHtml: `
<h3>What is npm?</h3>
<p><strong>npm</strong> (Node Package Manager) is the default package manager for Node.js. It lets you <strong>install, share, and manage</strong> third-party libraries (packages) in your project.</p>

<h3>Essential Commands</h3>
<table>
  <thead><tr><th>Command</th><th>What It Does</th></tr></thead>
  <tbody>
    <tr><td><code>npm init -y</code></td><td>Create a new project with default settings</td></tr>
    <tr><td><code>npm install package</code></td><td>Install a package (adds to dependencies)</td></tr>
    <tr><td><code>npm install -D package</code></td><td>Install as a dev dependency</td></tr>
    <tr><td><code>npm uninstall package</code></td><td>Remove a package</td></tr>
    <tr><td><code>npm run script</code></td><td>Run a script defined in package.json</td></tr>
    <tr><td><code>npx command</code></td><td>Run a package without installing globally</td></tr>
  </tbody>
</table>

<h3>package.json</h3>
<p>Every Node.js project has a <code>package.json</code> file that stores:</p>
<ul>
  <li>Project name, version, description</li>
  <li>Dependencies (packages your project needs)</li>
  <li>Scripts (custom commands like <code>start</code>, <code>build</code>, <code>test</code>)</li>
</ul>

<div class="knowledge-note">
  <strong>📌 Important:</strong> Never commit the <code>node_modules</code> folder to Git. Add it to <code>.gitignore</code>. Run <code>npm install</code> to regenerate it from <code>package.json</code>.
</div>`,
        codeExample: `// package.json example
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}

// Using an installed package
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(3000);`,
      },
      {
        id: "node-3",
        slug: "express-basics",
        title: "Express.js Basics",
        explanationHtml: `
<h3>What is Express?</h3>
<p><strong>Express.js</strong> is the most popular <strong>web framework for Node.js</strong>. It simplifies building web servers and APIs by providing easy routing, middleware, and request handling.</p>

<h3>Core Concepts</h3>
<ul>
  <li><strong>Routes</strong> — Define URL endpoints and what happens when they're accessed.</li>
  <li><strong>Middleware</strong> — Functions that run between request and response (logging, auth, parsing).</li>
  <li><strong>Request (req)</strong> — Contains data from the client (params, body, query).</li>
  <li><strong>Response (res)</strong> — Used to send data back to the client.</li>
</ul>

<h3>HTTP Methods</h3>
<table>
  <thead><tr><th>Method</th><th>Purpose</th><th>Express Method</th></tr></thead>
  <tbody>
    <tr><td>GET</td><td>Read data</td><td><code>app.get()</code></td></tr>
    <tr><td>POST</td><td>Create data</td><td><code>app.post()</code></td></tr>
    <tr><td>PUT</td><td>Update data</td><td><code>app.put()</code></td></tr>
    <tr><td>DELETE</td><td>Delete data</td><td><code>app.delete()</code></td></tr>
  </tbody>
</table>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> Install with <code>npm install express</code>. Use <code>nodemon</code> during development to auto-restart the server on file changes.
</div>`,
        codeExample: `const express = require("express");
const app = express();

// Parse JSON request bodies
app.use(express.json());

// GET — Read all users
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);
});

// POST — Create a user
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ id: 3, name, email });
});

// GET with URL parameter
app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  res.json({ id, name: "User " + id });
});

app.listen(3000, () => {
  console.log("API running on port 3000");
});`,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 8 — TypeScript
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t8",
    slug: "typescript",
    title: "TypeScript",
    description: "Add type safety to JavaScript — catch errors before your code runs.",
    iconName: "Shield",
    lessons: [
      {
        id: "ts-1",
        slug: "what-is-typescript",
        title: "What is TypeScript?",
        explanationHtml: `
<h3>Definition</h3>
<p><strong>TypeScript</strong> is a <strong>superset of JavaScript</strong> that adds <strong>static type checking</strong>. Any valid JavaScript code is also valid TypeScript, but TypeScript lets you define types for variables, function parameters, and return values.</p>

<h3>Why TypeScript?</h3>
<ul>
  <li><strong>Catch bugs early</strong> — Type errors are found at compile time, not runtime.</li>
  <li><strong>Better IDE support</strong> — Autocompletion, refactoring, and inline docs.</li>
  <li><strong>Scales well</strong> — Essential for large codebases and team projects.</li>
  <li><strong>Industry standard</strong> — Used by React, Angular, Next.js, and most modern frameworks.</li>
</ul>

<h3>How It Works</h3>
<ul>
  <li>TypeScript files use the <code>.ts</code> (or <code>.tsx</code> for React) extension.</li>
  <li>The TypeScript compiler (<code>tsc</code>) converts <code>.ts</code> to <code>.js</code>.</li>
  <li>Types are <strong>removed</strong> at compile time — they don't exist in the final JavaScript.</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> You don't have to type everything manually. TypeScript can <strong>infer types</strong> from values: <code>const name = "Alice"</code> is automatically typed as <code>string</code>.
</div>`,
        codeExample: `// Basic types
let name: string = "Alice";
let age: number = 25;
let isActive: boolean = true;

// Arrays
let scores: number[] = [90, 85, 92];
let names: string[] = ["Alice", "Bob"];

// Function with types
function add(a: number, b: number): number {
  return a + b;
}

// Object type
let user: { name: string; age: number } = {
  name: "Alice",
  age: 25
};

// Type inference (no annotation needed)
const message = "Hello"; // TypeScript knows it's a string`,
      },
      {
        id: "ts-2",
        slug: "interfaces-types",
        title: "Interfaces & Type Aliases",
        explanationHtml: `
<h3>Defining Custom Types</h3>
<p>TypeScript provides two ways to define custom shapes for your data: <strong>Interfaces</strong> and <strong>Type Aliases</strong>.</p>

<h3>Interface vs Type</h3>
<table>
  <thead><tr><th>Feature</th><th>Interface</th><th>Type Alias</th></tr></thead>
  <tbody>
    <tr><td>Syntax</td><td><code>interface User { }</code></td><td><code>type User = { }</code></td></tr>
    <tr><td>Extend</td><td><code>extends</code></td><td><code>&</code> (intersection)</td></tr>
    <tr><td>Can define unions?</td><td>No</td><td>Yes</td></tr>
    <tr><td>Can be merged?</td><td>Yes (declaration merging)</td><td>No</td></tr>
    <tr><td>Best for</td><td>Object shapes, classes</td><td>Unions, complex types</td></tr>
  </tbody>
</table>

<h3>Optional & Readonly Properties</h3>
<ul>
  <li><code>?</code> makes a property optional: <code>age?: number</code></li>
  <li><code>readonly</code> prevents modification: <code>readonly id: string</code></li>
</ul>

<div class="knowledge-note">
  <strong>📌 Rule of Thumb:</strong> Use <strong>interface</strong> for object shapes (especially in React props). Use <strong>type</strong> when you need unions or more complex type compositions.
</div>`,
        codeExample: `// Interface
interface User {
  id: string;
  name: string;
  email: string;
  age?: number;        // optional
  readonly role: string; // can't be changed
}

// Extending an interface
interface Admin extends User {
  permissions: string[];
}

// Type alias
type Status = "active" | "inactive" | "banned";

type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};

// Usage
const user: User = {
  id: "1",
  name: "Alice",
  email: "alice@mail.com",
  role: "user"
};

const status: Status = "active";`,
      },
      {
        id: "ts-3",
        slug: "generics",
        title: "Generics",
        explanationHtml: `
<h3>What are Generics?</h3>
<p>Generics let you write <strong>reusable code that works with multiple types</strong> while still keeping type safety. Think of them as <strong>type variables</strong> — placeholders for types that are filled in when used.</p>

<h3>Why Use Generics?</h3>
<ul>
  <li>Write a function <strong>once</strong> that works with strings, numbers, objects, etc.</li>
  <li>Maintain <strong>type safety</strong> without duplicating code.</li>
  <li>Used heavily in libraries, API responses, and data structures.</li>
</ul>

<h3>Syntax</h3>
<p>Use angle brackets <code>&lt;T&gt;</code> to define a generic type parameter. <code>T</code> is a convention but you can use any name.</p>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> Common generic names: <code>T</code> (Type), <code>K</code> (Key), <code>V</code> (Value), <code>E</code> (Element).
</div>`,
        codeExample: `// Generic function
function getFirst<T>(items: T[]): T {
  return items[0];
}

getFirst<string>(["a", "b", "c"]); // "a"
getFirst<number>([1, 2, 3]);       // 1

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Usage with different types
const userResponse: ApiResponse<{ name: string }> = {
  data: { name: "Alice" },
  status: 200,
  message: "OK"
};

// Generic with constraints
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

getLength("hello");     // 5
getLength([1, 2, 3]);   // 3
// getLength(123);      // Error! number has no .length`,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 9 — Git & GitHub
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t9",
    slug: "git",
    title: "Git & GitHub",
    description: "Track code changes, collaborate with teams, and manage project versions.",
    iconName: "GitBranch",
    lessons: [
      {
        id: "git-1",
        slug: "what-is-git",
        title: "What is Git?",
        explanationHtml: `
<h3>Definition</h3>
<p><strong>Git</strong> is a <strong>version control system</strong> — it tracks changes to your files over time so you can recall specific versions later. It's like an "undo history" for your entire project.</p>

<h3>Key Concepts</h3>
<ul>
  <li><strong>Repository (repo)</strong> — A project folder tracked by Git.</li>
  <li><strong>Commit</strong> — A snapshot of your project at a point in time.</li>
  <li><strong>Branch</strong> — A parallel version of your code for working on features.</li>
  <li><strong>Merge</strong> — Combining changes from one branch into another.</li>
</ul>

<h3>Git vs GitHub</h3>
<table>
  <thead><tr><th>Git</th><th>GitHub</th></tr></thead>
  <tbody>
    <tr><td>Software (runs locally)</td><td>Website / cloud service</td></tr>
    <tr><td>Tracks changes</td><td>Hosts Git repositories online</td></tr>
    <tr><td>Works offline</td><td>Requires internet</td></tr>
    <tr><td>Free and open source</td><td>Free + paid plans</td></tr>
  </tbody>
</table>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> Git is the tool, GitHub is the platform. Other platforms like GitLab and Bitbucket also use Git.
</div>`,
        codeExample: `# Initialize a new repository
git init

# Check status of files
git status

# Stage files for commit
git add .                  # Stage all files
git add filename.js        # Stage specific file

# Commit changes
git commit -m "Initial commit"

# View commit history
git log --oneline

# Connect to GitHub and push
git remote add origin https://github.com/user/repo.git
git push -u origin main`,
      },
      {
        id: "git-2",
        slug: "branching-merging",
        title: "Branching & Merging",
        explanationHtml: `
<h3>What are Branches?</h3>
<p>Branches let you <strong>work on features independently</strong> without affecting the main codebase. When the feature is ready, you <strong>merge</strong> it back.</p>

<h3>Branch Workflow</h3>
<ul>
  <li><strong>main</strong> (or master) — The stable, production-ready branch.</li>
  <li><strong>feature branches</strong> — Created for new features (e.g., <code>feature/login</code>).</li>
  <li><strong>Pull Requests (PRs)</strong> — A GitHub feature to review code before merging.</li>
</ul>

<h3>Common Branch Commands</h3>
<table>
  <thead><tr><th>Command</th><th>What It Does</th></tr></thead>
  <tbody>
    <tr><td><code>git branch</code></td><td>List all branches</td></tr>
    <tr><td><code>git branch feature-name</code></td><td>Create a new branch</td></tr>
    <tr><td><code>git checkout feature-name</code></td><td>Switch to a branch</td></tr>
    <tr><td><code>git checkout -b feature-name</code></td><td>Create + switch in one step</td></tr>
    <tr><td><code>git merge feature-name</code></td><td>Merge branch into current branch</td></tr>
    <tr><td><code>git branch -d feature-name</code></td><td>Delete a merged branch</td></tr>
  </tbody>
</table>

<div class="knowledge-note">
  <strong>📌 Important:</strong> Always pull the latest changes (<code>git pull</code>) before creating a new branch to avoid merge conflicts.
</div>`,
        codeExample: `# Create and switch to a new branch
git checkout -b feature/login-page

# Make changes, then commit
git add .
git commit -m "Add login page UI"

# Switch back to main
git checkout main

# Merge the feature branch
git merge feature/login-page

# Delete the branch (after merging)
git branch -d feature/login-page

# Push to GitHub
git push origin main`,
      },
      {
        id: "git-3",
        slug: "git-collaboration",
        title: "Collaborating on GitHub",
        explanationHtml: `
<h3>Working with Others</h3>
<p>GitHub makes team collaboration easy through <strong>Pull Requests</strong>, <strong>Forks</strong>, and <strong>Issues</strong>.</p>

<h3>Collaboration Workflow</h3>
<ul>
  <li><strong>Fork</strong> — Copy someone else's repo to your account.</li>
  <li><strong>Clone</strong> — Download a repo to your local machine.</li>
  <li><strong>Pull Request (PR)</strong> — Propose changes for review before merging.</li>
  <li><strong>Code Review</strong> — Team members review and approve PRs.</li>
  <li><strong>Merge</strong> — Accepted changes are merged into the main branch.</li>
</ul>

<h3>Essential Collaboration Commands</h3>
<table>
  <thead><tr><th>Command</th><th>Purpose</th></tr></thead>
  <tbody>
    <tr><td><code>git clone URL</code></td><td>Download a remote repo</td></tr>
    <tr><td><code>git pull</code></td><td>Fetch and merge latest changes</td></tr>
    <tr><td><code>git push</code></td><td>Upload your commits to remote</td></tr>
    <tr><td><code>git fetch</code></td><td>Download changes without merging</td></tr>
    <tr><td><code>git stash</code></td><td>Temporarily save uncommitted changes</td></tr>
  </tbody>
</table>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> Write clear commit messages that explain <em>why</em> a change was made, not just what. Example: <code>"Fix login timeout by increasing session duration"</code>.
</div>`,
        codeExample: `# Clone a repository
git clone https://github.com/user/project.git

# Create a feature branch
git checkout -b fix/navbar-bug

# Make changes and commit
git add .
git commit -m "Fix navbar dropdown not closing on mobile"

# Push the branch to GitHub
git push origin fix/navbar-bug

# Now create a Pull Request on GitHub!

# After PR is merged, update your local main
git checkout main
git pull origin main

# Clean up the branch
git branch -d fix/navbar-bug`,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 10 — MongoDB
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t10",
    slug: "mongodb",
    title: "MongoDB",
    description: "Work with NoSQL databases — store and query flexible, document-based data.",
    iconName: "Layers",
    lessons: [
      {
        id: "mongo-1",
        slug: "what-is-mongodb",
        title: "What is MongoDB?",
        explanationHtml: `
<h3>Definition</h3>
<p><strong>MongoDB</strong> is a <strong>NoSQL database</strong> that stores data in flexible, <strong>JSON-like documents</strong> instead of rigid tables with rows and columns.</p>

<h3>SQL vs MongoDB Terminology</h3>
<table>
  <thead><tr><th>SQL</th><th>MongoDB</th></tr></thead>
  <tbody>
    <tr><td>Database</td><td>Database</td></tr>
    <tr><td>Table</td><td>Collection</td></tr>
    <tr><td>Row</td><td>Document</td></tr>
    <tr><td>Column</td><td>Field</td></tr>
  </tbody>
</table>

<h3>Why MongoDB?</h3>
<ul>
  <li><strong>Flexible schema</strong> — Each document can have different fields.</li>
  <li><strong>Scales easily</strong> — Built for horizontal scaling.</li>
  <li><strong>JSON-native</strong> — Great fit for JavaScript/Node.js applications.</li>
  <li><strong>Fast reads</strong> — Optimized for read-heavy workloads.</li>
</ul>

<div class="knowledge-note">
  <strong>📌 When to use MongoDB:</strong> Best for applications with rapidly changing data, unstructured data, or when you need fast development. Use SQL databases when you need strong relationships between data.
</div>`,
        codeExample: `// MongoDB document example
{
  "_id": "64a1b2c3d4e5f6g7h8i9j0",
  "name": "Alice Johnson",
  "email": "alice@email.com",
  "age": 25,
  "address": {
    "city": "Mumbai",
    "state": "Maharashtra"
  },
  "hobbies": ["coding", "reading", "gaming"],
  "createdAt": "2024-01-15T10:30:00Z"
}`,
      },
      {
        id: "mongo-2",
        slug: "crud-operations",
        title: "CRUD Operations",
        explanationHtml: `
<h3>What is CRUD?</h3>
<p>CRUD stands for <strong>Create, Read, Update, Delete</strong> — the four basic operations you perform on data in any database.</p>

<h3>MongoDB CRUD Commands</h3>
<table>
  <thead><tr><th>Operation</th><th>Command</th><th>SQL Equivalent</th></tr></thead>
  <tbody>
    <tr><td>Create</td><td><code>insertOne()</code> / <code>insertMany()</code></td><td>INSERT INTO</td></tr>
    <tr><td>Read</td><td><code>find()</code> / <code>findOne()</code></td><td>SELECT</td></tr>
    <tr><td>Update</td><td><code>updateOne()</code> / <code>updateMany()</code></td><td>UPDATE</td></tr>
    <tr><td>Delete</td><td><code>deleteOne()</code> / <code>deleteMany()</code></td><td>DELETE</td></tr>
  </tbody>
</table>

<h3>Query Filters</h3>
<p>MongoDB uses <strong>filter objects</strong> to find documents:</p>
<ul>
  <li><code>{ age: 25 }</code> — Exact match</li>
  <li><code>{ age: { $gt: 18 } }</code> — Greater than 18</li>
  <li><code>{ name: { $in: ["Alice", "Bob"] } }</code> — Match any in list</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> Use <strong>Mongoose</strong> (an ODM library) when working with MongoDB in Node.js — it adds schema validation and helpful methods.
</div>`,
        codeExample: `// CREATE — Insert a document
db.users.insertOne({
  name: "Alice",
  email: "alice@email.com",
  age: 25
});

// READ — Find documents
db.users.find({ age: { $gte: 18 } });
db.users.findOne({ email: "alice@email.com" });

// UPDATE — Modify a document
db.users.updateOne(
  { email: "alice@email.com" },
  { $set: { age: 26 } }
);

// DELETE — Remove a document
db.users.deleteOne({ email: "alice@email.com" });

// Find with projection (select specific fields)
db.users.find(
  { age: { $gt: 20 } },
  { name: 1, email: 1, _id: 0 }
);`,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 11 — Next.js
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t11",
    slug: "nextjs",
    title: "Next.js",
    description: "Build full-stack React apps with routing, SSR, and API routes built in.",
    iconName: "Zap",
    lessons: [
      {
        id: "next-1",
        slug: "what-is-nextjs",
        title: "What is Next.js?",
        explanationHtml: `
<h3>Definition</h3>
<p><strong>Next.js</strong> is a <strong>React framework</strong> that adds powerful features on top of React — server-side rendering, file-based routing, API routes, and much more — out of the box.</p>

<h3>Why Next.js over plain React?</h3>
<table>
  <thead><tr><th>Feature</th><th>React (CRA)</th><th>Next.js</th></tr></thead>
  <tbody>
    <tr><td>Routing</td><td>Manual (react-router)</td><td>File-based (automatic)</td></tr>
    <tr><td>SEO</td><td>Poor (client-side only)</td><td>Excellent (SSR/SSG)</td></tr>
    <tr><td>API routes</td><td>Need separate backend</td><td>Built-in</td></tr>
    <tr><td>Performance</td><td>Good</td><td>Optimized (code splitting, image opt.)</td></tr>
  </tbody>
</table>

<h3>Key Features</h3>
<ul>
  <li><strong>App Router</strong> — File-system based routing with layouts.</li>
  <li><strong>Server Components</strong> — Components that render on the server (faster, smaller bundle).</li>
  <li><strong>API Routes</strong> — Build your backend inside the Next.js project.</li>
  <li><strong>Image Optimization</strong> — Automatic image resizing and lazy loading.</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> Create a new Next.js project with <code>npx create-next-app@latest</code>.
</div>`,
        codeExample: `// app/page.tsx — Home page (Server Component by default)
export default function Home() {
  return (
    <main>
      <h1>Welcome to Next.js!</h1>
      <p>This renders on the server.</p>
    </main>
  );
}

// app/about/page.tsx — Auto-routed to /about
export default function About() {
  return <h1>About Us</h1>;
}

// app/api/hello/route.ts — API Route
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello!" });
}`,
      },
      {
        id: "next-2",
        slug: "file-based-routing",
        title: "File-Based Routing",
        explanationHtml: `
<h3>How Routing Works</h3>
<p>In Next.js, the <strong>file structure inside the <code>app/</code> directory</strong> defines your routes automatically. No router configuration needed.</p>

<h3>Routing Rules</h3>
<table>
  <thead><tr><th>File Path</th><th>URL Route</th></tr></thead>
  <tbody>
    <tr><td><code>app/page.tsx</code></td><td><code>/</code></td></tr>
    <tr><td><code>app/about/page.tsx</code></td><td><code>/about</code></td></tr>
    <tr><td><code>app/blog/[slug]/page.tsx</code></td><td><code>/blog/my-post</code> (dynamic)</td></tr>
    <tr><td><code>app/dashboard/layout.tsx</code></td><td>Shared layout for all <code>/dashboard/*</code> pages</td></tr>
  </tbody>
</table>

<h3>Special Files</h3>
<ul>
  <li><code>page.tsx</code> — The UI for a route.</li>
  <li><code>layout.tsx</code> — Shared wrapper (navigation, footer).</li>
  <li><code>loading.tsx</code> — Loading state while page data fetches.</li>
  <li><code>error.tsx</code> — Error boundary for the route.</li>
  <li><code>not-found.tsx</code> — Custom 404 page.</li>
</ul>

<div class="knowledge-note">
  <strong>📌 Important:</strong> A folder only becomes a route if it contains a <code>page.tsx</code> file. Folders without <code>page.tsx</code> are just for organization.
</div>`,
        codeExample: `// app/blog/[slug]/page.tsx — Dynamic route
export default async function BlogPost(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return <h1>Blog Post: {slug}</h1>;
}

// app/dashboard/layout.tsx — Shared layout
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <nav>Dashboard Sidebar</nav>
      <main>{children}</main>
    </div>
  );
}

// app/loading.tsx — Loading state
export default function Loading() {
  return <div>Loading...</div>;
}`,
      },
      {
        id: "next-3",
        slug: "server-client-components",
        title: "Server vs Client Components",
        explanationHtml: `
<h3>The Two Types of Components</h3>
<p>In Next.js (App Router), components are <strong>Server Components by default</strong>. You opt into Client Components when needed.</p>

<h3>Server vs Client</h3>
<table>
  <thead><tr><th>Feature</th><th>Server Component</th><th>Client Component</th></tr></thead>
  <tbody>
    <tr><td>Runs where?</td><td>Server only</td><td>Browser (+ server for initial HTML)</td></tr>
    <tr><td>Can use hooks?</td><td>No</td><td>Yes (useState, useEffect, etc.)</td></tr>
    <tr><td>Can use event handlers?</td><td>No</td><td>Yes (onClick, onChange, etc.)</td></tr>
    <tr><td>Can fetch data directly?</td><td>Yes (async/await)</td><td>No (use useEffect or SWR)</td></tr>
    <tr><td>Bundle size</td><td>Not included in JS bundle</td><td>Included in JS bundle</td></tr>
  </tbody>
</table>

<h3>When to Use Each</h3>
<ul>
  <li><strong>Server</strong> — Data fetching, accessing databases, rendering static content.</li>
  <li><strong>Client</strong> — Interactivity (forms, buttons, animations), browser APIs, state.</li>
</ul>

<div class="knowledge-note">
  <strong>📌 Rule:</strong> Add <code>"use client"</code> at the top of a file to make it a Client Component. Without it, the component is a Server Component.
</div>`,
        codeExample: `// Server Component (default) — fetches data on server
// app/users/page.tsx
async function UsersPage() {
  const res = await fetch("https://api.example.com/users");
  const users = await res.json();

  return (
    <ul>
      {users.map((u: any) => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}

// Client Component — uses state and events
// components/Counter.tsx
"use client";
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 12 — Tailwind CSS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t12",
    slug: "tailwind",
    title: "Tailwind CSS",
    description: "Build modern UIs rapidly using utility-first CSS classes.",
    iconName: "Paintbrush",
    lessons: [
      {
        id: "tw-1",
        slug: "what-is-tailwind",
        title: "What is Tailwind CSS?",
        explanationHtml: `
<h3>Definition</h3>
<p><strong>Tailwind CSS</strong> is a <strong>utility-first CSS framework</strong>. Instead of writing custom CSS, you apply pre-built utility classes directly in your HTML.</p>

<h3>Traditional CSS vs Tailwind</h3>
<table>
  <thead><tr><th>Traditional CSS</th><th>Tailwind CSS</th></tr></thead>
  <tbody>
    <tr><td>Write custom class names</td><td>Use pre-built utility classes</td></tr>
    <tr><td>Separate CSS files</td><td>Styles live in HTML/JSX</td></tr>
    <tr><td><code>.btn { padding: 8px 16px; }</code></td><td><code>class="px-4 py-2"</code></td></tr>
  </tbody>
</table>

<h3>Common Utility Categories</h3>
<ul>
  <li><strong>Spacing</strong> — <code>p-4</code>, <code>m-2</code>, <code>px-6</code>, <code>my-auto</code></li>
  <li><strong>Colors</strong> — <code>text-blue-500</code>, <code>bg-gray-100</code></li>
  <li><strong>Typography</strong> — <code>text-lg</code>, <code>font-bold</code>, <code>leading-relaxed</code></li>
  <li><strong>Layout</strong> — <code>flex</code>, <code>grid</code>, <code>items-center</code>, <code>justify-between</code></li>
  <li><strong>Borders</strong> — <code>rounded-lg</code>, <code>border</code>, <code>border-gray-300</code></li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> Tailwind purges unused styles in production, so your final CSS file is very small regardless of how many utilities exist.
</div>`,
        codeExample: `<!-- Traditional CSS approach -->
<style>
  .card { padding: 24px; background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  .card-title { font-size: 20px; font-weight: 700; color: #111; }
</style>
<div class="card">
  <h2 class="card-title">Hello</h2>
</div>

<!-- Tailwind approach — no CSS file needed! -->
<div class="p-6 bg-white rounded-xl shadow-sm">
  <h2 class="text-xl font-bold text-gray-900">Hello</h2>
</div>

<!-- Responsive: stack on mobile, side-by-side on desktop -->
<div class="flex flex-col md:flex-row gap-4">
  <div class="flex-1 p-4 bg-blue-50 rounded-lg">Card 1</div>
  <div class="flex-1 p-4 bg-blue-50 rounded-lg">Card 2</div>
</div>

<!-- Dark mode support -->
<div class="bg-white dark:bg-gray-900 text-black dark:text-white">
  Adapts to theme!
</div>`,
      },
      {
        id: "tw-2",
        slug: "responsive-design",
        title: "Responsive & States",
        explanationHtml: `
<h3>Responsive Design</h3>
<p>Tailwind uses <strong>mobile-first breakpoint prefixes</strong>. Unprefixed utilities apply to all screens, and prefixed ones apply at that breakpoint and above.</p>

<h3>Breakpoints</h3>
<table>
  <thead><tr><th>Prefix</th><th>Min Width</th><th>Common Use</th></tr></thead>
  <tbody>
    <tr><td>(none)</td><td>0px</td><td>Mobile (default)</td></tr>
    <tr><td><code>sm:</code></td><td>640px</td><td>Large phones</td></tr>
    <tr><td><code>md:</code></td><td>768px</td><td>Tablets</td></tr>
    <tr><td><code>lg:</code></td><td>1024px</td><td>Laptops</td></tr>
    <tr><td><code>xl:</code></td><td>1280px</td><td>Desktops</td></tr>
  </tbody>
</table>

<h3>State Variants</h3>
<ul>
  <li><code>hover:</code> — On mouse hover</li>
  <li><code>focus:</code> — When focused (inputs, buttons)</li>
  <li><code>active:</code> — While being clicked</li>
  <li><code>disabled:</code> — When disabled</li>
  <li><code>dark:</code> — In dark mode</li>
  <li><code>group-hover:</code> — When a parent with <code>group</code> class is hovered</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Pattern:</strong> Design for mobile first, then add <code>md:</code> and <code>lg:</code> prefixes for larger screens.
</div>`,
        codeExample: `<!-- Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="p-6 bg-white rounded-xl">Card 1</div>
  <div class="p-6 bg-white rounded-xl">Card 2</div>
  <div class="p-6 bg-white rounded-xl">Card 3</div>
</div>

<!-- Interactive button with states -->
<button class="
  px-6 py-3 bg-blue-600 text-white rounded-lg font-medium
  hover:bg-blue-700
  active:scale-95
  focus:ring-2 focus:ring-blue-300
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-all
">
  Click Me
</button>

<!-- Text size changes at breakpoints -->
<h1 class="text-2xl md:text-4xl lg:text-6xl font-bold">
  Responsive Heading
</h1>`,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 13 — REST APIs
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t13",
    slug: "rest-api",
    title: "REST APIs",
    description: "Understand how frontend and backend communicate using HTTP requests.",
    iconName: "Globe",
    lessons: [
      {
        id: "api-1",
        slug: "what-is-rest-api",
        title: "What is a REST API?",
        explanationHtml: `
<h3>Definition</h3>
<p>A <strong>REST API</strong> (Representational State Transfer Application Programming Interface) is a set of rules that allows different software applications to <strong>communicate over HTTP</strong>.</p>
<p>Think of it as a <strong>waiter in a restaurant</strong> — you (the client) send a request, and the API delivers data from the kitchen (the server).</p>

<h3>HTTP Methods</h3>
<table>
  <thead><tr><th>Method</th><th>Purpose</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td><code>GET</code></td><td>Read / Fetch data</td><td>Get list of users</td></tr>
    <tr><td><code>POST</code></td><td>Create new data</td><td>Register a new user</td></tr>
    <tr><td><code>PUT</code></td><td>Update existing data</td><td>Update user profile</td></tr>
    <tr><td><code>PATCH</code></td><td>Partially update data</td><td>Change just the email</td></tr>
    <tr><td><code>DELETE</code></td><td>Remove data</td><td>Delete an account</td></tr>
  </tbody>
</table>

<h3>Status Codes</h3>
<ul>
  <li><code>200</code> — OK (success)</li>
  <li><code>201</code> — Created (new resource made)</li>
  <li><code>400</code> — Bad Request (client error)</li>
  <li><code>401</code> — Unauthorized (not logged in)</li>
  <li><code>404</code> — Not Found</li>
  <li><code>500</code> — Internal Server Error</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> REST APIs use JSON as the standard data format. Every request and response is typically a JSON object.
</div>`,
        codeExample: `// Fetch data from an API (GET)
const response = await fetch("https://api.example.com/users");
const users = await response.json();
console.log(users);

// Create a new user (POST)
const newUser = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Alice",
    email: "alice@email.com"
  })
});

// Update a user (PUT)
await fetch("https://api.example.com/users/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice Updated" })
});

// Delete a user (DELETE)
await fetch("https://api.example.com/users/1", {
  method: "DELETE"
});`,
      },
      {
        id: "api-2",
        slug: "api-design",
        title: "API Design Best Practices",
        explanationHtml: `
<h3>URL Structure</h3>
<p>REST APIs follow consistent URL patterns called <strong>endpoints</strong>:</p>
<table>
  <thead><tr><th>Action</th><th>Method</th><th>Endpoint</th></tr></thead>
  <tbody>
    <tr><td>List all users</td><td>GET</td><td><code>/api/users</code></td></tr>
    <tr><td>Get one user</td><td>GET</td><td><code>/api/users/:id</code></td></tr>
    <tr><td>Create a user</td><td>POST</td><td><code>/api/users</code></td></tr>
    <tr><td>Update a user</td><td>PUT</td><td><code>/api/users/:id</code></td></tr>
    <tr><td>Delete a user</td><td>DELETE</td><td><code>/api/users/:id</code></td></tr>
  </tbody>
</table>

<h3>Best Practices</h3>
<ul>
  <li>Use <strong>nouns</strong> for endpoints (<code>/users</code>, not <code>/getUsers</code>).</li>
  <li>Use <strong>plural names</strong> (<code>/products</code>, not <code>/product</code>).</li>
  <li>Return proper <strong>status codes</strong>.</li>
  <li>Use <strong>pagination</strong> for large lists: <code>/users?page=2&limit=20</code>.</li>
  <li>Version your API: <code>/api/v1/users</code>.</li>
</ul>

<div class="knowledge-note">
  <strong>📌 Important:</strong> Never expose sensitive data (passwords, tokens) in API responses. Always validate and sanitize user input on the server side.
</div>`,
        codeExample: `// Well-designed API response
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Alice",
    "email": "alice@email.com",
    "role": "user"
  },
  "message": "User retrieved successfully"
}

// Error response
{
  "success": false,
  "error": {
    "code": 404,
    "message": "User not found"
  }
}

// Paginated response
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}`,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 14 — Data Structures
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t14",
    slug: "data-structures",
    title: "Data Structures",
    description: "Understand arrays, stacks, queues, linked lists, and trees.",
    iconName: "Network",
    lessons: [
      {
        id: "ds-1",
        slug: "what-are-data-structures",
        title: "What are Data Structures?",
        explanationHtml: `
<h3>Definition</h3>
<p>A <strong>data structure</strong> is a way to <strong>organize and store data</strong> so that it can be accessed and modified efficiently. Choosing the right data structure can make your code much faster.</p>

<h3>Common Data Structures</h3>
<table>
  <thead><tr><th>Structure</th><th>What It Is</th><th>Use Case</th></tr></thead>
  <tbody>
    <tr><td><strong>Array</strong></td><td>Ordered list of items</td><td>Storing lists, iteration</td></tr>
    <tr><td><strong>Stack</strong></td><td>Last In, First Out (LIFO)</td><td>Undo/Redo, browser history</td></tr>
    <tr><td><strong>Queue</strong></td><td>First In, First Out (FIFO)</td><td>Task scheduling, print queue</td></tr>
    <tr><td><strong>Linked List</strong></td><td>Chain of nodes with pointers</td><td>Dynamic memory, playlists</td></tr>
    <tr><td><strong>Hash Map</strong></td><td>Key-value pairs</td><td>Fast lookups, caching</td></tr>
    <tr><td><strong>Tree</strong></td><td>Hierarchical structure</td><td>File systems, DOM</td></tr>
    <tr><td><strong>Graph</strong></td><td>Nodes connected by edges</td><td>Social networks, maps</td></tr>
  </tbody>
</table>

<div class="knowledge-tip">
  <strong>💡 Why it matters:</strong> In coding interviews and real-world applications, picking the right data structure is often more important than writing clever code.
</div>`,
        codeExample: `// Array — ordered collection
const items = [10, 20, 30, 40, 50];

// Stack — Last In, First Out
class Stack {
  constructor() { this.items = []; }
  push(item) { this.items.push(item); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
}

// Queue — First In, First Out
class Queue {
  constructor() { this.items = []; }
  enqueue(item) { this.items.push(item); }
  dequeue() { return this.items.shift(); }
  front() { return this.items[0]; }
  isEmpty() { return this.items.length === 0; }
}

// Hash Map (built-in object/Map)
const cache = new Map();
cache.set("user:1", { name: "Alice" });
console.log(cache.get("user:1")); // { name: "Alice" }`,
      },
      {
        id: "ds-2",
        slug: "big-o-notation",
        title: "Big O Notation",
        explanationHtml: `
<h3>What is Big O?</h3>
<p><strong>Big O notation</strong> describes <strong>how the performance of an algorithm scales</strong> as the input size grows. It measures the worst-case time (or space) complexity.</p>

<h3>Common Complexities</h3>
<table>
  <thead><tr><th>Big O</th><th>Name</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td><code>O(1)</code></td><td>Constant</td><td>Array access by index</td></tr>
    <tr><td><code>O(log n)</code></td><td>Logarithmic</td><td>Binary search</td></tr>
    <tr><td><code>O(n)</code></td><td>Linear</td><td>Loop through an array</td></tr>
    <tr><td><code>O(n log n)</code></td><td>Linearithmic</td><td>Merge sort, quick sort</td></tr>
    <tr><td><code>O(n²)</code></td><td>Quadratic</td><td>Nested loops</td></tr>
    <tr><td><code>O(2ⁿ)</code></td><td>Exponential</td><td>Recursive Fibonacci</td></tr>
  </tbody>
</table>

<h3>How to Identify</h3>
<ul>
  <li><strong>Single loop</strong> = O(n)</li>
  <li><strong>Nested loop</strong> = O(n²)</li>
  <li><strong>Halving each step</strong> = O(log n)</li>
  <li><strong>No loops</strong> = O(1)</li>
</ul>

<div class="knowledge-note">
  <strong>📌 Rule of Thumb:</strong> Always aim for the lowest Big O possible. If your solution is O(n²) and you can make it O(n), that's a huge improvement for large datasets.
</div>`,
        codeExample: `// O(1) — Constant time
function getFirst(arr) {
  return arr[0]; // Always one operation
}

// O(n) — Linear time
function findItem(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

// O(n²) — Quadratic time (nested loop)
function hasDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}

// O(log n) — Binary search (sorted array)
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 15 — Docker
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t15",
    slug: "docker",
    title: "Docker",
    description: "Package and run applications in containers for consistent deployments.",
    iconName: "Container",
    lessons: [
      {
        id: "docker-1",
        slug: "what-is-docker",
        title: "What is Docker?",
        explanationHtml: `
<h3>Definition</h3>
<p><strong>Docker</strong> is a platform that lets you <strong>package your application and all its dependencies</strong> into a standardized unit called a <strong>container</strong>.</p>
<p>Containers ensure your app runs the <strong>same way everywhere</strong> — on your laptop, your teammate's machine, and the production server.</p>

<h3>Key Concepts</h3>
<table>
  <thead><tr><th>Term</th><th>What It Is</th></tr></thead>
  <tbody>
    <tr><td><strong>Image</strong></td><td>A blueprint/template for a container (read-only)</td></tr>
    <tr><td><strong>Container</strong></td><td>A running instance of an image</td></tr>
    <tr><td><strong>Dockerfile</strong></td><td>Instructions to build an image</td></tr>
    <tr><td><strong>Docker Hub</strong></td><td>Registry to share images (like npm for containers)</td></tr>
    <tr><td><strong>Volume</strong></td><td>Persistent storage for containers</td></tr>
  </tbody>
</table>

<h3>Docker vs Virtual Machines</h3>
<ul>
  <li><strong>Docker containers</strong> share the host OS kernel — lightweight, start in seconds.</li>
  <li><strong>VMs</strong> run a full OS — heavier, start in minutes.</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> Think of a Docker image as a recipe and a container as the dish made from that recipe. You can make many dishes (containers) from one recipe (image).
</div>`,
        codeExample: `# Dockerfile for a Node.js app
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]`,
      },
      {
        id: "docker-2",
        slug: "docker-commands",
        title: "Essential Docker Commands",
        explanationHtml: `
<h3>Most Used Commands</h3>
<table>
  <thead><tr><th>Command</th><th>What It Does</th></tr></thead>
  <tbody>
    <tr><td><code>docker build -t name .</code></td><td>Build an image from a Dockerfile</td></tr>
    <tr><td><code>docker run name</code></td><td>Create and start a container</td></tr>
    <tr><td><code>docker ps</code></td><td>List running containers</td></tr>
    <tr><td><code>docker stop id</code></td><td>Stop a running container</td></tr>
    <tr><td><code>docker images</code></td><td>List all images</td></tr>
    <tr><td><code>docker pull image</code></td><td>Download an image from Docker Hub</td></tr>
    <tr><td><code>docker-compose up</code></td><td>Start multi-container applications</td></tr>
  </tbody>
</table>

<h3>Common Run Flags</h3>
<ul>
  <li><code>-d</code> — Run in background (detached mode)</li>
  <li><code>-p 3000:3000</code> — Map port host:container</li>
  <li><code>-v ./data:/app/data</code> — Mount a volume</li>
  <li><code>--name myapp</code> — Give the container a name</li>
  <li><code>--rm</code> — Remove container when it stops</li>
</ul>

<div class="knowledge-note">
  <strong>📌 Important:</strong> Always use <code>.dockerignore</code> to exclude <code>node_modules</code>, <code>.git</code>, and other unnecessary files from your Docker image.
</div>`,
        codeExample: `# Build an image
docker build -t my-app .

# Run a container
docker run -d -p 3000:3000 --name my-app my-app

# View running containers
docker ps

# View logs
docker logs my-app

# Stop and remove
docker stop my-app
docker rm my-app

# Docker Compose (docker-compose.yml)
version: "3.8"
services:
  web:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 16 — Linux Commands
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t16",
    slug: "linux",
    title: "Linux Commands",
    description: "Navigate the terminal, manage files, and run commands like a pro.",
    iconName: "TerminalSquare",
    lessons: [
      {
        id: "linux-1",
        slug: "basic-commands",
        title: "Basic Navigation",
        explanationHtml: `
<h3>Why Learn the Terminal?</h3>
<p>The terminal (command line) is a <strong>text-based interface</strong> to interact with your computer. Developers use it daily for Git, running servers, installing packages, and managing files.</p>

<h3>Essential Commands</h3>
<table>
  <thead><tr><th>Command</th><th>What It Does</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td><code>pwd</code></td><td>Print current directory</td><td><code>pwd</code></td></tr>
    <tr><td><code>ls</code></td><td>List files and folders</td><td><code>ls -la</code></td></tr>
    <tr><td><code>cd</code></td><td>Change directory</td><td><code>cd projects/</code></td></tr>
    <tr><td><code>mkdir</code></td><td>Create a directory</td><td><code>mkdir my-app</code></td></tr>
    <tr><td><code>touch</code></td><td>Create an empty file</td><td><code>touch index.html</code></td></tr>
    <tr><td><code>rm</code></td><td>Remove a file</td><td><code>rm old-file.txt</code></td></tr>
    <tr><td><code>rm -rf</code></td><td>Remove a directory (recursive)</td><td><code>rm -rf node_modules</code></td></tr>
    <tr><td><code>cp</code></td><td>Copy files</td><td><code>cp file.txt backup.txt</code></td></tr>
    <tr><td><code>mv</code></td><td>Move or rename</td><td><code>mv old.txt new.txt</code></td></tr>
    <tr><td><code>cat</code></td><td>Display file contents</td><td><code>cat package.json</code></td></tr>
  </tbody>
</table>

<h3>Navigation Shortcuts</h3>
<ul>
  <li><code>cd ~</code> — Go to home directory</li>
  <li><code>cd ..</code> — Go up one level</li>
  <li><code>cd -</code> — Go to previous directory</li>
  <li><code>Tab</code> key — Auto-complete file/folder names</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> Use <code>ls -la</code> to see hidden files (starting with <code>.</code>) and detailed file information including permissions and sizes.
</div>`,
        codeExample: `# Where am I?
pwd
# /home/user/projects

# List files with details
ls -la

# Create project structure
mkdir my-project
cd my-project
mkdir src public
touch src/index.js public/index.html

# Copy and move files
cp src/index.js src/backup.js
mv src/backup.js src/old.js

# View file contents
cat package.json

# Search within files
grep "error" logs.txt
grep -r "TODO" src/

# Find files
find . -name "*.js" -type f`,
      },
      {
        id: "linux-2",
        slug: "permissions-processes",
        title: "Permissions & Processes",
        explanationHtml: `
<h3>File Permissions</h3>
<p>Linux controls who can <strong>read (r)</strong>, <strong>write (w)</strong>, and <strong>execute (x)</strong> files. Each file has permissions for the <strong>owner</strong>, <strong>group</strong>, and <strong>others</strong>.</p>

<h3>Permission Commands</h3>
<table>
  <thead><tr><th>Command</th><th>Purpose</th></tr></thead>
  <tbody>
    <tr><td><code>chmod 755 file</code></td><td>Set read/write/execute for owner, read/execute for others</td></tr>
    <tr><td><code>chmod +x script.sh</code></td><td>Make a file executable</td></tr>
    <tr><td><code>chown user:group file</code></td><td>Change file owner</td></tr>
  </tbody>
</table>

<h3>Process Management</h3>
<table>
  <thead><tr><th>Command</th><th>Purpose</th></tr></thead>
  <tbody>
    <tr><td><code>ps aux</code></td><td>List all running processes</td></tr>
    <tr><td><code>top</code> / <code>htop</code></td><td>Real-time process monitor</td></tr>
    <tr><td><code>kill PID</code></td><td>Stop a process by ID</td></tr>
    <tr><td><code>kill -9 PID</code></td><td>Force kill a process</td></tr>
    <tr><td><code>Ctrl + C</code></td><td>Stop current running command</td></tr>
  </tbody>
</table>

<div class="knowledge-note">
  <strong>📌 Important:</strong> Use <code>sudo</code> before a command to run it with administrator (root) privileges. Use it carefully — it can modify system files.
</div>`,
        codeExample: `# View file permissions
ls -la
# -rwxr-xr-x 1 user group 1024 Jan 15 10:00 script.sh

# Make a script executable
chmod +x deploy.sh
./deploy.sh

# View running processes
ps aux | grep node

# Kill a process
kill 12345

# Check disk usage
df -h

# Check folder size
du -sh node_modules/

# Download a file
curl -O https://example.com/file.zip
wget https://example.com/file.zip

# Pipe and redirect
ls -la | grep ".js"        # Filter output
echo "Hello" > file.txt    # Write to file
echo "World" >> file.txt   # Append to file`,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 17 — C Programming
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t17",
    slug: "c-programming",
    title: "C Programming",
    description: "Learn the foundational language behind operating systems, embedded systems, and more.",
    iconName: "Cpu",
    lessons: [
      {
        id: "c-1",
        slug: "what-is-c",
        title: "What is C?",
        explanationHtml: `
<h3>Definition</h3>
<p><strong>C</strong> is a <strong>general-purpose, procedural programming language</strong> developed in 1972. It is one of the most influential languages ever created — operating systems like Linux, Windows, and macOS are written in C.</p>

<h3>Why Learn C?</h3>
<ul>
  <li><strong>Foundation</strong> — Many languages (C++, Java, C#, JavaScript) borrowed syntax from C.</li>
  <li><strong>Performance</strong> — C runs very close to hardware, making it extremely fast.</li>
  <li><strong>Systems programming</strong> — Used for OS, embedded systems, drivers, and compilers.</li>
  <li><strong>Understanding</strong> — Learning C helps you understand how computers actually work.</li>
</ul>

<h3>How C Works</h3>
<ul>
  <li>C is a <strong>compiled language</strong> — you write code, then a compiler (like <code>gcc</code>) converts it to machine code.</li>
  <li>Files use the <code>.c</code> extension.</li>
  <li>Every program starts execution from the <code>main()</code> function.</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> Compile and run C code with: <code>gcc program.c -o program</code> then <code>./program</code>.
</div>`,
        codeExample: `#include <stdio.h>

int main() {
    // Print to console
    printf("Hello, World!\\n");

    // Variables
    int age = 25;
    float height = 5.9;
    char grade = 'A';

    printf("Age: %d\\n", age);
    printf("Height: %.1f\\n", height);
    printf("Grade: %c\\n", grade);

    // User input
    int num;
    printf("Enter a number: ");
    scanf("%d", &num);
    printf("You entered: %d\\n", num);

    return 0;
}`,
      },
      {
        id: "c-2",
        slug: "c-arrays-pointers",
        title: "Arrays & Pointers",
        explanationHtml: `
<h3>Arrays in C</h3>
<p>An array stores <strong>multiple values of the same type</strong> in contiguous memory. Unlike JavaScript, C arrays have a <strong>fixed size</strong> that must be declared.</p>

<h3>Pointers</h3>
<p>A <strong>pointer</strong> is a variable that stores the <strong>memory address</strong> of another variable. Pointers are one of C's most powerful (and tricky) features.</p>
<ul>
  <li><code>&</code> — Gets the address of a variable.</li>
  <li><code>*</code> — Dereferences a pointer (gets the value at the address).</li>
</ul>

<h3>Why Pointers Matter</h3>
<ul>
  <li>Efficient memory management</li>
  <li>Pass data by reference (modify original data in functions)</li>
  <li>Dynamic memory allocation</li>
  <li>Building data structures (linked lists, trees)</li>
</ul>

<div class="knowledge-note">
  <strong>📌 Important:</strong> Always initialize pointers before using them. An uninitialized pointer can cause crashes or unpredictable behavior.
</div>`,
        codeExample: `#include <stdio.h>

int main() {
    // Arrays
    int scores[5] = {90, 85, 78, 92, 88};

    // Access elements
    printf("First: %d\\n", scores[0]);  // 90
    printf("Third: %d\\n", scores[2]);  // 78

    // Loop through array
    for (int i = 0; i < 5; i++) {
        printf("Score %d: %d\\n", i, scores[i]);
    }

    // Pointers
    int age = 25;
    int *ptr = &age;  // ptr stores the address of age

    printf("Value: %d\\n", age);    // 25
    printf("Address: %p\\n", ptr);  // memory address
    printf("Via pointer: %d\\n", *ptr); // 25

    // Modify via pointer
    *ptr = 30;
    printf("New age: %d\\n", age);  // 30

    return 0;
}`,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 18 — Java Basics
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t18",
    slug: "java",
    title: "Java Basics",
    description: "Learn the enterprise-grade, object-oriented language used by millions of developers.",
    iconName: "Coffee",
    lessons: [
      {
        id: "java-1",
        slug: "what-is-java",
        title: "What is Java?",
        explanationHtml: `
<h3>Definition</h3>
<p><strong>Java</strong> is a <strong>class-based, object-oriented</strong> programming language designed to be platform-independent — <strong>"Write Once, Run Anywhere"</strong>. Code compiles to bytecode that runs on the Java Virtual Machine (JVM).</p>

<h3>Why Learn Java?</h3>
<ul>
  <li><strong>Enterprise standard</strong> — Used by banks, governments, and large corporations.</li>
  <li><strong>Android</strong> — Primary language for Android app development.</li>
  <li><strong>Job market</strong> — One of the most in-demand languages globally.</li>
  <li><strong>Robust</strong> — Strong type checking, exception handling, and memory management.</li>
</ul>

<h3>Key Characteristics</h3>
<table>
  <thead><tr><th>Feature</th><th>Description</th></tr></thead>
  <tbody>
    <tr><td>Compiled + Interpreted</td><td>Compiles to bytecode, runs on JVM</td></tr>
    <tr><td>Strongly typed</td><td>Every variable must have a declared type</td></tr>
    <tr><td>Object-Oriented</td><td>Everything is a class/object</td></tr>
    <tr><td>Garbage collected</td><td>Automatic memory management</td></tr>
  </tbody>
</table>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> The file name must match the public class name. <code>Main.java</code> must contain <code>public class Main</code>.
</div>`,
        codeExample: `// Main.java — Every Java program starts here
public class Main {
    public static void main(String[] args) {
        // Print to console
        System.out.println("Hello, Java!");

        // Variables (must declare type)
        String name = "Alice";
        int age = 25;
        double height = 5.9;
        boolean isStudent = true;

        System.out.println("Name: " + name);
        System.out.println("Age: " + age);

        // If-else
        if (age >= 18) {
            System.out.println("Adult");
        } else {
            System.out.println("Minor");
        }

        // For loop
        for (int i = 1; i <= 5; i++) {
            System.out.println("Count: " + i);
        }
    }
}`,
      },
      {
        id: "java-2",
        slug: "java-oop",
        title: "Object-Oriented Programming",
        explanationHtml: `
<h3>OOP in Java</h3>
<p>Java is built around <strong>four pillars of OOP</strong>:</p>

<h3>The Four Pillars</h3>
<table>
  <thead><tr><th>Pillar</th><th>What It Means</th></tr></thead>
  <tbody>
    <tr><td><strong>Encapsulation</strong></td><td>Bundle data and methods together; hide internal details</td></tr>
    <tr><td><strong>Inheritance</strong></td><td>A class can inherit properties and methods from another class</td></tr>
    <tr><td><strong>Polymorphism</strong></td><td>One interface, multiple implementations</td></tr>
    <tr><td><strong>Abstraction</strong></td><td>Hide complex details, show only essentials</td></tr>
  </tbody>
</table>

<h3>Key OOP Terms</h3>
<ul>
  <li><strong>Class</strong> — A blueprint/template for creating objects.</li>
  <li><strong>Object</strong> — An instance of a class.</li>
  <li><strong>Constructor</strong> — A special method called when creating an object.</li>
  <li><strong>Method</strong> — A function that belongs to a class.</li>
  <li><strong>Access modifiers</strong> — <code>public</code>, <code>private</code>, <code>protected</code>.</li>
</ul>

<div class="knowledge-note">
  <strong>📌 Remember:</strong> Use <code>private</code> for fields and provide <code>public</code> getters/setters. This is encapsulation — it protects your data from being modified directly.
</div>`,
        codeExample: `// Define a class
public class Student {
    // Fields (private = encapsulation)
    private String name;
    private int age;

    // Constructor
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Getter
    public String getName() {
        return this.name;
    }

    // Method
    public void introduce() {
        System.out.println("Hi, I'm " + name + ", age " + age);
    }
}

// Inheritance
public class GradStudent extends Student {
    private String thesis;

    public GradStudent(String name, int age, String thesis) {
        super(name, age);  // Call parent constructor
        this.thesis = thesis;
    }
}

// Usage
Student s = new Student("Alice", 25);
s.introduce(); // "Hi, I'm Alice, age 25"`,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 19 — PHP Basics
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t19",
    slug: "php",
    title: "PHP Basics",
    description: "Learn the server-side language that powers WordPress and millions of websites.",
    iconName: "FileCode",
    lessons: [
      {
        id: "php-1",
        slug: "what-is-php",
        title: "What is PHP?",
        explanationHtml: `
<h3>Definition</h3>
<p><strong>PHP</strong> (Hypertext Preprocessor) is a <strong>server-side scripting language</strong> designed for web development. It runs on the server and generates HTML that is sent to the browser.</p>

<h3>Why PHP?</h3>
<ul>
  <li><strong>Powers the web</strong> — ~77% of websites use PHP (WordPress, Facebook started with PHP).</li>
  <li><strong>Easy to learn</strong> — Simple syntax, quick to get started.</li>
  <li><strong>Great ecosystem</strong> — Laravel, Symfony, and WordPress.</li>
  <li><strong>Cheap hosting</strong> — Almost every web host supports PHP.</li>
</ul>

<h3>How PHP Works</h3>
<ul>
  <li>PHP code is written inside <code>&lt;?php ... ?&gt;</code> tags.</li>
  <li>It can be embedded directly inside HTML files.</li>
  <li>The server processes PHP and sends plain HTML to the browser.</li>
  <li>Files use the <code>.php</code> extension.</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> Variables in PHP always start with a <code>$</code> sign: <code>$name = "Alice";</code>. Strings are concatenated with a dot (<code>.</code>), not <code>+</code>.
</div>`,
        codeExample: `<?php
// Variables
$name = "Alice";
$age = 25;
$is_student = true;

// Print output
echo "Hello, " . $name . "!";
echo "Age: $age"; // Variables work inside double quotes

// Arrays
$fruits = ["Apple", "Banana", "Mango"];
echo $fruits[0]; // "Apple"

// Associative array (like objects/dictionaries)
$user = [
    "name" => "Alice",
    "email" => "alice@mail.com",
    "age" => 25
];
echo $user["name"]; // "Alice"

// If/Else
if ($age >= 18) {
    echo "Adult";
} else {
    echo "Minor";
}

// For loop
for ($i = 1; $i <= 5; $i++) {
    echo "Count: $i\\n";
}

// Foreach
foreach ($fruits as $fruit) {
    echo $fruit . "\\n";
}
?>`,
      },
      {
        id: "php-2",
        slug: "php-functions-forms",
        title: "Functions & Form Handling",
        explanationHtml: `
<h3>Functions</h3>
<p>PHP functions work similarly to other languages — use <code>function</code> keyword, pass parameters, and return values.</p>

<h3>Form Handling</h3>
<p>One of PHP's biggest strengths is processing <strong>HTML form data</strong>. When a form submits, PHP can access the data via <code>$_GET</code> or <code>$_POST</code> superglobals.</p>
<table>
  <thead><tr><th>Method</th><th>Superglobal</th><th>When to Use</th></tr></thead>
  <tbody>
    <tr><td>GET</td><td><code>$_GET</code></td><td>Search forms, filters (data visible in URL)</td></tr>
    <tr><td>POST</td><td><code>$_POST</code></td><td>Login, registration (data hidden from URL)</td></tr>
  </tbody>
</table>

<div class="knowledge-note">
  <strong>⚠️ Warning:</strong> Always <strong>validate and sanitize</strong> user input to prevent SQL injection and XSS attacks. Use <code>htmlspecialchars()</code> and prepared statements.
</div>`,
        codeExample: `<?php
// Function
function greet($name) {
    return "Hello, " . $name . "!";
}
echo greet("Alice");

// Default parameter
function welcome($name = "Guest") {
    echo "Welcome, $name!";
}

// Form handling (process a POST form)
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    echo "Name: $name, Email: $email";
}
?>

<!-- HTML Form -->
<form method="POST" action="">
    <input type="text" name="name" placeholder="Name">
    <input type="email" name="email" placeholder="Email">
    <button type="submit">Submit</button>
</form>`,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOPIC 20 — Bootstrap
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "t20",
    slug: "bootstrap",
    title: "Bootstrap",
    description: "Build responsive, mobile-first websites quickly with pre-built components.",
    iconName: "LayoutGrid",
    lessons: [
      {
        id: "boot-1",
        slug: "what-is-bootstrap",
        title: "What is Bootstrap?",
        explanationHtml: `
<h3>Definition</h3>
<p><strong>Bootstrap</strong> is a free, open-source <strong>CSS framework</strong> that provides pre-designed components, a responsive grid system, and utility classes to build websites quickly.</p>

<h3>Why Bootstrap?</h3>
<ul>
  <li><strong>Speed</strong> — Build professional layouts in minutes, not hours.</li>
  <li><strong>Responsive</strong> — Built-in 12-column grid system that adapts to all screen sizes.</li>
  <li><strong>Pre-built components</strong> — Buttons, cards, modals, navbars, forms, and more.</li>
  <li><strong>Consistent</strong> — Ensures a uniform look across browsers.</li>
</ul>

<h3>Bootstrap vs Tailwind</h3>
<table>
  <thead><tr><th>Feature</th><th>Bootstrap</th><th>Tailwind</th></tr></thead>
  <tbody>
    <tr><td>Approach</td><td>Pre-built components</td><td>Utility classes</td></tr>
    <tr><td>Customization</td><td>Override defaults</td><td>Build from scratch</td></tr>
    <tr><td>Learning curve</td><td>Easier to start</td><td>More flexible but steeper</td></tr>
    <tr><td>Best for</td><td>Rapid prototyping</td><td>Custom designs</td></tr>
  </tbody>
</table>

<div class="knowledge-tip">
  <strong>💡 Getting Started:</strong> Add Bootstrap via CDN — just include the CSS and JS links in your HTML <code>&lt;head&gt;</code>. No installation needed!
</div>`,
        codeExample: `<!-- Include Bootstrap via CDN -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Responsive Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="#">MyApp</a>
    <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="nav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#">About</a></li>
      </ul>
    </div>
  </div>
</nav>

<!-- Card Grid -->
<div class="container mt-4">
  <div class="row g-4">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Card 1</h5>
          <p class="card-text">Some content here.</p>
          <a href="#" class="btn btn-primary">Learn More</a>
        </div>
      </div>
    </div>
  </div>
</div>`,
      },
      {
        id: "boot-2",
        slug: "bootstrap-grid",
        title: "The Grid System",
        explanationHtml: `
<h3>How the Grid Works</h3>
<p>Bootstrap uses a <strong>12-column grid system</strong>. You place content in <strong>rows</strong> and <strong>columns</strong>. The total columns in a row should add up to 12.</p>

<h3>Grid Classes</h3>
<table>
  <thead><tr><th>Class</th><th>Screen Size</th><th>Breakpoint</th></tr></thead>
  <tbody>
    <tr><td><code>col-</code></td><td>Extra small</td><td>&lt; 576px</td></tr>
    <tr><td><code>col-sm-</code></td><td>Small</td><td>≥ 576px</td></tr>
    <tr><td><code>col-md-</code></td><td>Medium</td><td>≥ 768px</td></tr>
    <tr><td><code>col-lg-</code></td><td>Large</td><td>≥ 992px</td></tr>
    <tr><td><code>col-xl-</code></td><td>Extra large</td><td>≥ 1200px</td></tr>
  </tbody>
</table>

<h3>Grid Rules</h3>
<ul>
  <li>Wrap everything in a <code>.container</code> or <code>.container-fluid</code>.</li>
  <li>Columns must be inside a <code>.row</code>.</li>
  <li>Columns must add up to 12 (or use <code>.col</code> for equal widths).</li>
</ul>

<div class="knowledge-tip">
  <strong>💡 Tip:</strong> Use <code>col-md-6</code> for two equal columns on medium+ screens, or <code>col-md-4</code> for three equal columns.
</div>`,
        codeExample: `<!-- Basic grid: 3 equal columns -->
<div class="container">
  <div class="row">
    <div class="col-md-4">Column 1</div>
    <div class="col-md-4">Column 2</div>
    <div class="col-md-4">Column 3</div>
  </div>
</div>

<!-- Sidebar + Main content layout -->
<div class="container">
  <div class="row">
    <div class="col-md-3">Sidebar</div>
    <div class="col-md-9">Main Content</div>
  </div>
</div>

<!-- Responsive: stack on mobile, side-by-side on tablet+ -->
<div class="container">
  <div class="row g-3">
    <div class="col-12 col-md-6">
      <div class="p-3 bg-light rounded">Left</div>
    </div>
    <div class="col-12 col-md-6">
      <div class="p-3 bg-light rounded">Right</div>
    </div>
  </div>
</div>

<!-- Auto-equal columns -->
<div class="row">
  <div class="col">Equal</div>
  <div class="col">Equal</div>
  <div class="col">Equal</div>
</div>`,
      },
    ],
  },
];
