import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";
import {
  FiCalendar,
  FiUser,
  FiClock,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedPost]);

  const blogPosts = [
    {
      id: 1,
      title: "10 Tips to Win Your First Design Contest",
      excerpt:
        "Learn the essential strategies that successful designers use to stand out in competitive contests and increase your chances of winning.",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      author: "Sarah Johnson",
      date: "February 20, 2025",
      readTime: "5 min read",
      category: "Design",
      content: `
        <h2>Introduction</h2>
        <p>Winning your first design contest can feel daunting, but with the right approach and mindset, you can significantly increase your chances of success. Here are ten proven strategies that have helped countless designers stand out from the competition.</p>

        <h2>1. Understand the Brief Thoroughly</h2>
        <p>Before you start designing, spend quality time understanding what the contest creator is looking for. Read the brief multiple times, note down key requirements, and don't hesitate to ask questions if anything is unclear. Many designers lose out simply because they missed crucial details in the brief.</p>

        <h2>2. Research Your Competition</h2>
        <p>Look at previous contests won by similar creators. Study what made those submissions successful. This doesn't mean copying, but understanding what works in the specific niche or industry you're designing for.</p>

        <h2>3. Create Multiple Concepts</h2>
        <p>Don't settle on your first idea. Sketch out at least 5-10 different concepts before committing to one. This process helps you explore various directions and often leads to more creative solutions.</p>

        <h2>4. Focus on Originality</h2>
        <p>Generic designs rarely win. Push yourself to create something unique that captures attention. Think about what makes your design different from what's already out there.</p>

        <h2>5. Pay Attention to Details</h2>
        <p>Professional designers know that details matter. Check your alignment, spacing, typography, and color harmony. A polished submission shows professionalism and care.</p>

        <h2>6. Submit High-Quality Files</h2>
        <p>Always provide your work in the highest quality possible. This shows professionalism and makes it easier for the contest creator to visualize your design in use.</p>

        <h2>7. Write a Strong Description</h2>
        <p>Your design should speak for itself, but a well-written description can provide valuable context about your creative decisions and how your design solves the brief.</p>

        <h2>8. Meet the Deadline</h2>
        <p>This seems obvious, but many great designs never get seen because they're submitted late. Give yourself buffer time to handle any technical issues.</p>

        <h2>9. Accept Feedback Gracefully</h2>
        <p>If the contest allows revisions, be open to feedback. Some of the best designs come from collaborative refinement with the contest creator.</p>

        <h2>10. Learn from Every Contest</h2>
        <p>Whether you win or lose, every contest is a learning opportunity. Analyze what worked and what didn't, and apply those lessons to your next submission.</p>

        <h2>Conclusion</h2>
        <p>Winning contests is part skill, part strategy, and part persistence. Keep these tips in mind, stay consistent, and remember that every expert was once a beginner. Your first win could be just around the corner!</p>
      `,
    },
    {
      id: 2,
      title: "How to Price Your Creative Work",
      excerpt:
        "A comprehensive guide to determining fair pricing for your creative services and maximizing your earnings on ContestHub.",
      image:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
      author: "Michael Chen",
      date: "February 18, 2025",
      readTime: "7 min read",
      category: "Business",
      content: `
        <h2>The Challenge of Pricing</h2>
        <p>One of the biggest challenges creative professionals face is determining how much to charge for their work. Price too high, and you might scare away potential clients. Price too low, and you undervalue your expertise while potentially working unsustainable hours.</p>

        <h2>Understanding Your Value</h2>
        <p>Your pricing should reflect not just the time you spend on a project, but your years of experience, specialized skills, and the value you bring to clients. Consider what problems you're solving and the impact your work has on the client's business.</p>

        <h2>Research Market Rates</h2>
        <p>Investigate what other creators in your niche and skill level are charging. Look at successful contest entries and their prize amounts. This gives you a baseline understanding of market expectations.</p>

        <h2>Calculate Your Minimum Rate</h2>
        <p>Determine your basic living expenses, desired income, and how many billable hours you realistically have per month. This calculation gives you your minimum hourly rate - anything below this means you're losing money.</p>

        <h2>Consider Different Pricing Models</h2>
        <p>You might charge hourly for some projects, project-based fees for others, or value-based pricing for high-impact work. Each model has its place, and understanding when to use each is crucial for success.</p>

        <h2>Factor in Contest Entry Fees</h2>
        <p>When participating in paid contests, ensure the potential prize justifies your time investment and entry fee. Calculate the probability of winning and whether the exposure is worth the risk.</p>

        <h2>Don't Forget Hidden Costs</h2>
        <p>Remember to account for software subscriptions, hardware depreciation, taxes, healthcare, and other business expenses when setting your rates.</p>

        <h2>Communicate Value, Not Just Price</h2>
        <p>When discussing pricing with clients or contest creators, focus on the value and results you deliver rather than just the cost. Help them understand the ROI of investing in quality creative work.</p>

        <h2>Review and Adjust Regularly</h2>
        <p>Your rates shouldn't be static. As you gain experience and build your portfolio, your pricing should increase accordingly. Review your rates every 6-12 months.</p>

        <h2>Conclusion</h2>
        <p>Pricing your creative work is both an art and a science. It requires understanding your market, knowing your worth, and having the confidence to charge what you deserve. Remember, the right clients will see the value in your work and be willing to pay for quality.</p>
      `,
    },
    {
      id: 3,
      title: "Building Your Creative Portfolio",
      excerpt:
        "Essential tips for creating a portfolio that showcases your best work and attracts contest creators to your profile.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      author: "Emily Rodriguez",
      date: "February 15, 2025",
      readTime: "6 min read",
      category: "Career",
      content: `
        <h2>Your Portfolio is Your Story</h2>
        <p>A well-crafted portfolio doesn't just show what you can do—it tells the story of who you are as a creative professional. It's often the first impression potential clients and contest creators have of your work, so it needs to be impactful.</p>

        <h2>Quality Over Quantity</h2>
        <p>Don't include every project you've ever done. Instead, curate a selection of your absolute best work—typically 10-15 pieces that demonstrate your range and expertise. It's better to have fewer outstanding pieces than many mediocre ones.</p>

        <h2>Show Your Process</h2>
        <p>Don't just show the final result. Include sketches, wireframes, or iterations that demonstrate your problem-solving approach. This helps potential clients understand your creative thinking and methodology.</p>

        <h2>Tailor to Your Target Audience</h2>
        <p>If you specialize in a particular industry or style, make sure your portfolio reflects that. Show work that's relevant to the types of contests and clients you want to attract.</p>

        <h2>Include Case Studies</h2>
        <p>For your best projects, create detailed case studies that explain the challenge, your solution, and the results. This adds context and demonstrates your ability to deliver tangible outcomes.</p>

        <h2>Keep It Updated</h2>
        <p>Your portfolio should be a living document. Regularly remove older work and add new pieces that represent your current skill level. An outdated portfolio can actually hurt more than help.</p>

        <h2>Make It Easy to Navigate</h2>
        <p>Organize your work in a logical way—by category, client type, or chronologically. Viewers should be able to find what they're looking for quickly without getting lost.</p>

        <h2>Write Compelling Descriptions</h2>
        <p>Each piece should have a brief description that provides context. Explain the project goals, your role, and any notable achievements or challenges you overcame.</p>

        <h2>Include Contact Information</h2>
        <p>Make it ridiculously easy for people to reach you. Include multiple contact methods and consider adding a contact form directly in your portfolio.</p>

        <h2>Test and Get Feedback</h2>
        <p>Before launching your portfolio publicly, ask trusted colleagues or mentors to review it. They might spot issues you've overlooked or suggest improvements.</p>

        <h2>Conclusion</h2>
        <p>Your portfolio is one of your most important professional assets. Invest the time to make it exceptional, and it will pay dividends throughout your career. Remember, it's not just about showing what you've done—it's about demonstrating what you can do for future clients.</p>
      `,
    },
    {
      id: 4,
      title: "The Rise of Remote Creative Competitions",
      excerpt:
        "Exploring how online contests are transforming the creative industry and creating new opportunities for talented individuals worldwide.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      author: "David Park",
      date: "February 12, 2025",
      readTime: "8 min read",
      category: "Industry",
      content: `
        <h2>A New Era for Creatives</h2>
        <p>The creative industry is experiencing a fundamental shift. Remote creative competitions have emerged as a powerful force, democratizing access to opportunities and transforming how creative work gets commissioned and completed.</p>

        <h2>Breaking Down Geographic Barriers</h2>
        <p>Previously, top creative opportunities were concentrated in major cities. Now, a designer in rural India can compete for the same projects as someone in New York or London. This global talent pool benefits both creators and clients.</p>

        <h2>The Platform Economy</h2>
        <p>Platforms like ContestHub have created ecosystems where creators and clients can connect efficiently. These marketplaces reduce friction, provide payment security, and offer dispute resolution—solving many traditional freelancing challenges.</p>

        <h2>Skills-Based Selection</h2>
        <p>Remote competitions emphasize meritocracy. What matters is the quality of your work, not your network, credentials, or location. This levels the playing field for talented individuals who might have been overlooked in traditional settings.</p>

        <h2>Flexible Work Arrangements</h2>
        <p>Creative professionals increasingly value flexibility. Contest-based work allows people to choose projects that interest them, work on their own schedule, and balance multiple income streams.</p>

        <h2>Impact on Traditional Agencies</h2>
        <p>Traditional creative agencies are adapting to this new landscape. Many now participate in competitions themselves or use contest platforms to discover fresh talent and new perspectives.</p>

        <h2>Quality Concerns and Solutions</h2>
        <p>Critics argue that competitions can lead to "spec work" and devalue creative services. However, well-designed platforms address these concerns through fair compensation, clear expectations, and winner-takes-all or multiple prize structures.</p>

        <h2>The Role of Technology</h2>
        <p>AI tools, collaboration software, and high-speed internet have made remote creative work more viable than ever. These technologies continue to evolve, making the contest experience smoother for everyone involved.</p>

        <h2>Building Reputation Online</h2>
        <p>Contest platforms provide ways for creatives to build public portfolios and reputation scores. Winning contests or receiving high ratings can lead to direct client relationships and more lucrative opportunities.</p>

        <h2>The Future Outlook</h2>
        <p>Remote creative competitions aren't replacing traditional work arrangements—they're adding a valuable new option. As platforms mature and more people gain confidence in the model, we expect continued growth and innovation in this space.</p>

        <h2>Conclusion</h2>
        <p>The rise of remote creative competitions represents a significant shift in how creative work happens. While challenges remain, the benefits of increased access, flexibility, and opportunity are transforming careers and businesses worldwide.</p>
      `,
    },
    {
      id: 5,
      title: "Understanding Contest Guidelines",
      excerpt:
        "A detailed breakdown of common contest rules and how to ensure your submissions meet all requirements for eligibility.",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
      author: "Lisa Anderson",
      date: "February 10, 2025",
      readTime: "4 min read",
      category: "Tips",
      content: `
        <h2>Why Guidelines Matter</h2>
        <p>Contest guidelines exist to ensure fairness and clarity for all participants. Understanding and following these rules is crucial—many excellent submissions get disqualified simply because they didn't meet basic requirements.</p>

        <h2>Common Eligibility Requirements</h2>
        <p>Most contests have age restrictions (typically 18+), geographic limitations, or professional status requirements. Always check these first before investing time in a submission.</p>

        <h2>File Format and Size Specifications</h2>
        <p>Technical requirements like file formats (PNG, JPG, PDF, etc.) and size limits are non-negotiable. Familiarize yourself with these specifications before creating your submission to avoid last-minute reformatting stress.</p>

        <h2>Submission Deadlines</h2>
        <p>Deadlines are usually strictly enforced. Note the timezone specified and give yourself buffer time. A brilliant design submitted one minute late typically won't be considered.</p>

        <h2>Originality and Rights</h2>
        <p>You must have the right to submit your work. This means no plagiarism, no unauthorized use of copyrighted materials, and generally, no work created for previous clients unless you retained the rights.</p>

        <h2>Number of Submissions</h2>
        <p>Some contests allow multiple entries, others limit you to one. Read carefully—submitting too many entries when only one is allowed could disqualify all of them.</p>

        <h2>Revision and Feedback</h2>
        <p>Check whether the contest allows revisions based on client feedback. Some are single-submission only, while others involve multiple rounds of refinement.</p>

        <h2>Prize and Payment Terms</h2>
        <p>Understand what you're competing for and how payment works. Are there multiple prize tiers? When and how will winners be paid? What rights does the winner grant to the contest creator?</p>

        <h2>Judging Criteria</h2>
        <p>If specified, pay close attention to how entries will be judged. Is it purely creative merit? Does practicality matter? Understanding the criteria helps you tailor your submission.</p>

        <h2>When in Doubt, Ask</h2>
        <p>Most contest creators are happy to clarify guidelines if you have questions. It's better to ask upfront than to assume and risk disqualification.</p>

        <h2>Conclusion</h2>
        <p>Contest guidelines might seem tedious, but they protect both creators and participants. Take the time to read and understand them fully—your submission's eligibility depends on it.</p>
      `,
    },
    {
      id: 6,
      title: "Networking in the Creative Community",
      excerpt:
        "How to build meaningful connections with other creators, collaborate on projects, and grow your professional network.",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
      author: "James Wilson",
      date: "February 8, 2025",
      readTime: "6 min read",
      category: "Community",
      content: `
        <h2>The Power of Community</h2>
        <p>Creative work can feel isolating, especially when working remotely. Building a strong professional network provides support, inspiration, opportunities, and friendships that can sustain your entire career.</p>

        <h2>Start with Online Communities</h2>
        <p>Join online forums, Discord servers, Facebook groups, or subreddits related to your creative field. These spaces allow you to connect with peers, ask questions, share work, and learn from others' experiences.</p>

        <h2>Engage Authentically</h2>
        <p>Networking isn't about collecting contacts—it's about building genuine relationships. Comment thoughtfully on others' work, offer help when you can, and share insights without expecting immediate returns.</p>

        <h2>Collaborate on Projects</h2>
        <p>Working with other creatives on joint projects helps you learn new skills, create better work through combined expertise, and builds strong professional bonds. Look for collaboration opportunities that excite you.</p>

        <h2>Attend Virtual Events</h2>
        <p>Webinars, virtual conferences, and online workshops are excellent networking opportunities. Participate actively in Q&A sessions and connect with speakers and attendees afterward.</p>

        <h2>Share Your Knowledge</h2>
        <p>Teaching others is one of the best ways to establish your expertise and build your network. Write tutorials, create videos, or mentor newcomers. Generosity comes back to you.</p>

        <h2>Use Social Media Strategically</h2>
        <p>Platforms like Instagram, Twitter, and LinkedIn can be powerful networking tools when used intentionally. Share your process, engage with industry leaders, and participate in relevant conversations.</p>

        <h2>Follow Up and Stay in Touch</h2>
        <p>A connection isn't valuable if it's forgotten. After meeting someone new, follow up with a message. Then periodically check in, share relevant resources, or congratulate them on achievements.</p>

        <h2>Be a Connector</h2>
        <p>Introduce people in your network who might benefit from knowing each other. Being a hub who connects others makes you invaluable to your community.</p>

        <h2>Invest in Long-term Relationships</h2>
        <p>The most valuable professional relationships are built over years, not days. Focus on a smaller number of deeper connections rather than trying to know everyone superficially.</p>

        <h2>Conclusion</h2>
        <p>Your network is one of your greatest professional assets. Invest time in building genuine relationships within the creative community, and you'll find that opportunities, support, and collaboration flow naturally from those connections.</p>
      `,
    },
  ];

  const handleSubscribeToast = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    if (!email) {
      toast.error("Please enter an email");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    toast.success("Subscribed Successfully");
    e.target.reset();
  };

  // If a post is selected, show the article view
  if (selectedPost) {
    const post = blogPosts.find((p) => p.id === selectedPost);

    return (
      <Container>
        <div className="py-10 md:py-15">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedPost(null)}
            className="btn btn-outline gap-2 mb-8"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Blog
          </motion.button>

          {/* Article */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {post.title}
              </h1>
            </div>

            {/* Featured Image */}
            <div className="mb-8 rounded-2xl overflow-hidden relative">
              <span className="badge absolute top-2 right-2 badge-primary mb-4">
                {post.category}
              </span>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-base-content
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-p:text-base-content/80 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-base-content prose-strong:font-semibold
                prose-ul:my-4 prose-li:text-base-content/80
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author Bio */}
            <div className="mt-12 bg-base-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-2">About the Author</h3>
              <p className="text-base-content/70">
                <strong>{post.author}</strong> is a creative professional and
                regular contributor to the ContestHub blog. They share insights
                and tips to help creators succeed in the competitive world of
                online contests.
              </p>
            </div>
          </motion.article>
        </div>
      </Container>
    );
  }

  // Default blog list view
  return (
    <Container>
      <div className="py-10 md:py-15">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ContestHub <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Tips, insights, and stories from the creative community
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <div
            className="bg-base-300 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition cursor-pointer"
            onClick={() => setSelectedPost(blogPosts[0].id)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="h-64 md:h-150 overflow-hidden">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover hover:scale-110 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="badge badge-primary mb-4">Featured</span>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-base-content/70 mb-6">
                  {blogPosts[0].excerpt}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/60 mb-6">
                  <span className="flex items-center gap-1">
                    <FiUser className="w-4 h-4" />
                    {blogPosts[0].author}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCalendar className="w-4 h-4" />
                    {blogPosts[0].date}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock className="w-4 h-4" />
                    {blogPosts[0].readTime}
                  </span>
                </div>

                <button className="btn btn-primary gap-2 w-fit">
                  Read More
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-base-300 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group cursor-pointer"
              onClick={() => setSelectedPost(post.id)}
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="badge badge-sm badge-primary mb-3">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-base-content/70 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-base-content/60 mb-4">
                  <span className="flex items-center gap-1">
                    <FiUser className="w-3 h-3" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCalendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <button className="btn btn-primary gap-2 w-fit">
                  Read More
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-10 md:mt-15 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Updated with Our Newsletter
          </h2>
          <p className="text-base-content/70 mb-6 max-w-xl mx-auto">
            Get the latest tips, insights, and contest updates delivered to your
            inbox every week.
          </p>
          <form
            onSubmit={handleSubscribeToast}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="bg-base-300 w-full h-full rounded-xl border border-base-content/20  p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </Container>
  );
};

export default Blog;
