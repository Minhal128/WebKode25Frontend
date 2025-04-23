import React from "react";
import { ArrowRight, Calendar, CheckCircle2, Clock, MessageSquare, Star, Zap } from "lucide-react";

// Button Component
const Button = ({ children, className, variant, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center";
  const variantStyles = variant === "outline" 
    ? "border border-[#B0F127] text-[#B0F127] hover:bg-[#B0F127]/10" 
    : "bg-[#B0F127] text-black hover:bg-[#B0F127]/80";
  
  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Card Components
const Card = ({ children, className, ...props }) => {
  return (
    <div className={`rounded-lg border ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className, ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3 className={`text-xl font-semibold ${className}`} {...props}>
      {children}
    </h3>
  );
};

const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardDescription = ({ children, className, ...props }) => {
  return (
    <p className={`${className}`} {...props}>
      {children}
    </p>
  );
};

const ComingSoonPage = () => {
  return (
    <div className="min-h-screen bg-[#060606] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#B0F127]/10 blur-3xl"></div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              The Future of <span className="text-[#B0F127]">FinConnect</span>
            </h1>
            <p className="mb-8 text-xl text-gray-400">
              We're constantly evolving. Discover what's on our roadmap and the exciting features we're building for
              you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-[#B0F127] text-black hover:bg-[#B0F127]/80">Request a Feature</Button>
              <Button variant="outline" className="border-[#B0F127] text-[#B0F127] hover:bg-[#B0F127]/10">
                Join Beta Program
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Our Development <span className="text-[#B0F127]">Roadmap</span>
          </h2>

          <div className="relative mx-auto max-w-4xl">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#B0F127] to-[#B0F127]/10"></div>

            {/* Q2 2023 */}
            <div className="relative mb-16">
              <div className="absolute left-1/2 top-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#060606] ring-2 ring-[#B0F127]">
                <CheckCircle2 className="h-6 w-6 text-[#B0F127]" />
              </div>
              <div className="ml-auto mr-[calc(50%+2rem)] rounded-lg border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
                <div className="mb-2 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-[#B0F127]" />
                  <h3 className="text-xl font-semibold">Q2 2023 - Completed</h3>
                </div>
                <ul className="ml-7 list-disc space-y-2 text-gray-400">
                  <li>Core banking dashboard</li>
                  <li>Basic transaction history</li>
                  <li>User authentication system</li>
                  <li>Subscription management</li>
                </ul>
              </div>
            </div>

            {/* Q3 2023 */}
            <div className="relative mb-16">
              <div className="absolute left-1/2 top-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#060606] ring-2 ring-[#B0F127]">
                <Clock className="h-6 w-6 text-[#B0F127]" />
              </div>
              <div className="ml-[calc(50%+2rem)] rounded-lg border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
                <div className="mb-2 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-[#B0F127]" />
                  <h3 className="text-xl font-semibold">Q3 2023 - In Progress</h3>
                </div>
                <ul className="ml-7 list-disc space-y-2 text-gray-400">
                  <li>Advanced analytics dashboard</li>
                  <li>Budgeting tools and forecasting</li>
                  <li>Mobile app beta release</li>
                  <li>Enhanced security features</li>
                </ul>
              </div>
            </div>

            {/* Q4 2023 */}
            <div className="relative mb-16">
              <div className="absolute left-1/2 top-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#060606] ring-2 ring-gray-700">
                <Star className="h-6 w-6 text-gray-500" />
              </div>
              <div className="ml-auto mr-[calc(50%+2rem)] rounded-lg border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
                <div className="mb-2 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                  <h3 className="text-xl font-semibold">Q4 2023 - Planned</h3>
                </div>
                <ul className="ml-7 list-disc space-y-2 text-gray-400">
                  <li>AI-powered financial advisor</li>
                  <li>Cryptocurrency integration</li>
                  <li>International payments</li>
                  <li>Advanced fraud detection</li>
                </ul>
              </div>
            </div>

            {/* Q1 2024 */}
            <div className="relative">
              <div className="absolute left-1/2 top-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#060606] ring-2 ring-gray-700">
                <Zap className="h-6 w-6 text-gray-500" />
              </div>
              <div className="ml-[calc(50%+2rem)] rounded-lg border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
                <div className="mb-2 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                  <h3 className="text-xl font-semibold">Q1 2024 - Future</h3>
                </div>
                <ul className="ml-7 list-disc space-y-2 text-gray-400">
                  <li>Open banking API for developers</li>
                  <li>Business accounts and multi-user access</li>
                  <li>Investment portfolio management</li>
                  <li>Financial marketplace integration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Request Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900 to-[#060606] p-8 text-center">
            <h2 className="mb-6 text-3xl font-bold">Have a Feature in Mind?</h2>
            <p className="mb-8 text-gray-400">
              We build FinConnect for you. Tell us what features would make your financial life easier, and we'll
              consider adding them to our roadmap.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-[#B0F127] text-black hover:bg-[#B0F127]/80">
                <MessageSquare className="mr-2 h-4 w-4" />
                Submit Your Idea
              </Button>
              <Button variant="outline" className="border-[#B0F127] text-[#B0F127] hover:bg-[#B0F127]/10">
                View Feature Requests
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Exciting Features <span className="text-[#B0F127]">Coming Soon</span>
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "AI Financial Assistant",
                description: "Get personalized financial advice powered by advanced AI algorithms.",
                icon: (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B0F127]/10 text-[#B0F127]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2a8 8 0 0 1 8 8v12l-4-4-4 4-4-4-4 4V10a8 8 0 0 1 8-8z" />
                    </svg>
                  </div>
                ),
              },
              {
                title: "Crypto Trading",
                description: "Buy, sell, and manage cryptocurrencies directly within your dashboard.",
                icon: (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B0F127]/10 text-[#B0F127]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                      <path d="M12 18V6" />
                    </svg>
                  </div>
                ),
              },
              {
                title: "Smart Budgeting",
                description: "Automated budget recommendations based on your spending patterns.",
                icon: (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B0F127]/10 text-[#B0F127]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                  </div>
                ),
              },
              {
                title: "Global Transfers",
                description: "Send money internationally with low fees and competitive exchange rates.",
                icon: (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B0F127]/10 text-[#B0F127]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      <path d="M2 12h20" />
                    </svg>
                  </div>
                ),
              },
              {
                title: "Financial Goals",
                description: "Set and track your financial goals with visual progress indicators.",
                icon: (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B0F127]/10 text-[#B0F127]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2v20" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                ),
              },
              {
                title: "Mobile App",
                description: "Access all FinConnect features on the go with our native mobile application.",
                icon: (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B0F127]/10 text-[#B0F127]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                      <path d="M12 18h.01" />
                    </svg>
                  </div>
                ),
              },
            ].map((feature, index) => (
              <Card key={index} className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <CardHeader>
                  {feature.icon}
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Beta Program */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-gray-800">
            <div className="flex flex-col md:flex-row">
              <div className="bg-gray-900 p-8 md:w-1/2">
                <h2 className="mb-4 text-2xl font-bold">Join Our Beta Program</h2>
                <p className="mb-6 text-gray-400">
                  Get early access to upcoming features and help shape the future of FinConnect.
                </p>
                <ul className="mb-6 space-y-3">
                  {[
                    "Early access to new features",
                    "Direct line to our product team",
                    "Influence product development",
                    "Exclusive beta tester community",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-[#B0F127]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="bg-[#B0F127] text-black hover:bg-[#B0F127]/80">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-br from-[#B0F127]/20 to-transparent p-8 md:w-1/2">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Beta Program"
                  className="rounded-lg"
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Stay Updated on Our Progress</h2>
            <p className="mb-8 text-xl text-gray-400">
              Subscribe to our newsletter to receive updates on new features and releases.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white focus:border-[#B0F127] focus:outline-none sm:w-auto sm:min-w-[300px]"
              />
              <Button className="w-full bg-[#B0F127] text-black hover:bg-[#B0F127]/80 sm:w-auto">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComingSoonPage;