// data/blogs.js
// Newest blogs first — add new entries at the TOP of this array

const blogs = [
  {
    id: "long-established-fact-reader",
    date: "2025-03-28",
    title: "It is a long established fact that a reader",
    excerpt:
      "adipiscing elit. Consectetur lacus, maiesuada in suscipit sed. Volutpat erat vitae, odio...",
    content: `
      <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p>
      <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
      <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
    `,
    image: "/images/blog1.jpg",
    category: "Design",
    author: "Alex Johnson",
    readTime: "5 min read",
  },
  {
    id: "many-variations-of-passages",
    date: "2025-03-20",
    title: "Many variations of passages",
    excerpt:
      "adipiscing elit. Consectetur lacus, maiesuada in suscipit sed. Volutpat erat vitae, odio..",
    content: `
      <p>Many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
      <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.</p>
      <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero.</p>
    `,
    image: "/images/blog2.jpg",
    category: "Writing",
    author: "Maria Chen",
    readTime: "4 min read",
  },
  {
    id: "lorem-ipsum-dolor-sit-amet",
    date: "2025-03-10",
    title: "Lorem ipsum dolor sit amet, conse",
    excerpt:
      "adipiscing elit. Consectetur lacus, maiesuada in suscipit sed. Volutpat erat vitae, odio...",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur lacus, maiesuada in suscipit sed. Volutpat erat vitae, odio sit amet pharetra. Nunc euismod tortor arcu, vel consectetur ipsum molestie vitae.</p>
      <p>Praesent viverra tortor eget libero dictum, vel maximus eros auctor. Duis commodo eros nec nisl tincidunt, a aliquet justo tempor. Sed euismod, enim eget commodo lacinia, nisl enim aliquet nunc.</p>
      <p>Curabitur sit amet nulla quis libero pulvinar gravida. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>
    `,
    image: "/images/blog3.jpg",
    category: "Technology",
    author: "Sam Rivera",
    readTime: "6 min read",
  },
];

export default blogs;
