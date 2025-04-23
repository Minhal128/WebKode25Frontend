import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Shield, TrendingUp, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#060606] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#060606] opacity-90"></div>
          <div className="absolute -bottom-1/2 -right-1/4 h-96 w-96 rounded-full bg-[#B0F127] blur-[150px]"></div>
          <div className="absolute -top-1/4 -left-1/4 h-96 w-96 rounded-full bg-[#B0F127] blur-[150px]"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight">
              About <span className="text-[#B0F127]">FinConnect</span>
            </h1>
            <p className="text-lg text-gray-300">
              Revolutionizing financial connectivity for a seamless digital economy
            </p>
          </div>
        </div>
      </div>

    {/* Our Story Section */}
    <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
            <div className="relative mb-8">
                <div className="absolute -z-10 left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B0F127] opacity-10 blur-[80px]"></div>
                <p className="mb-6 text-gray-300">
                    At FinConnect, we began with a simple idea: financial services should be accessible to everyone. Founded in 2020 by a team of finance and technology experts, we set out to create a platform that would bridge the gap between traditional banking and the digital future.
                </p>
                <p className="mb-6 text-gray-300">
                    Our journey started during the global pandemic when we witnessed firsthand how critical digital financial tools had become. We built FinConnect to address the challenges many faced with existing financial systems - complexity, lack of transparency, and limited accessibility.
                </p>
                <p className="text-gray-300">
                    Today, FinConnect has grown into a comprehensive financial ecosystem trusted by individuals and businesses worldwide. Our platform combines cutting-edge technology with user-friendly design to create a seamless financial experience that empowers our users to achieve their goals.
                </p>
            </div>
            <div className="mt-8">
                <Link to="/contact" className="bg-[#B0F127] text-black hover:bg-[#B0F127]/90 inline-flex items-center px-4 py-2 rounded-md">
                    Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </div>
        </div>
    </div>

    {/* Values Section */}
      <div className="bg-[#0c0c0c] py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Our Core Values</h2>
            <p className="text-gray-300">The principles that guide everything we do at FinConnect</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="border-none bg-[#121212] shadow-lg shadow-[#B0F127]/5 rounded-lg">
              <div className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#B0F127]/10">
                  <Shield className="h-8 w-8 text-[#B0F127]" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Security First</h3>
                <p className="text-gray-300">
                  We prioritize the security of our users' data and financial information above all else, implementing
                  the highest standards of encryption and protection.
                </p>
              </div>
            </div>
            <div className="border-none bg-[#121212] shadow-lg shadow-[#B0F127]/5 rounded-lg">
              <div className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#B0F127]/10">
                  <TrendingUp className="h-8 w-8 text-[#B0F127]" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Innovation</h3>
                <p className="text-gray-300">
                  We constantly push the boundaries of what's possible in financial technology, developing new solutions
                  that make managing money easier and more efficient.
                </p>
              </div>
            </div>
            <div className="border-none bg-[#121212] shadow-lg shadow-[#B0F127]/5 rounded-lg">
              <div className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#B0F127]/10">
                  <Users className="h-8 w-8 text-[#B0F127]" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Inclusivity</h3>
                <p className="text-gray-300">
                  We believe financial tools should be accessible to everyone, regardless of background or experience
                  level, and design our products with simplicity and clarity in mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">What Sets Us Apart</h2>
          <p className="text-gray-300">
            FinConnect offers a comprehensive suite of financial tools designed for the modern world
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex gap-4">
              <CheckCircle className="h-6 w-6 flex-shrink-0 text-[#B0F127]" />
              <div>
                <h3 className="text-xl font-medium">Seamless Transfers</h3>
                <p className="mt-2 text-gray-300">
                  Move money between accounts instantly with our advanced transfer system, featuring real-time
                  processing and detailed transaction history.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="h-6 w-6 flex-shrink-0 text-[#B0F127]" />
              <div>
                <h3 className="text-xl font-medium">Comprehensive Analytics</h3>
                <p className="mt-2 text-gray-300">
                  Gain insights into your financial health with detailed analytics and reporting tools that help you
                  make informed decisions.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="h-6 w-6 flex-shrink-0 text-[#B0F127]" />
              <div>
                <h3 className="text-xl font-medium">Enterprise-Grade Security</h3>
                <p className="mt-2 text-gray-300">
                  Rest easy knowing your data is protected by military-grade encryption, multi-factor authentication,
                  and continuous security monitoring.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <CheckCircle className="h-6 w-6 flex-shrink-0 text-[#B0F127]" />
              <div>
                <h3 className="text-xl font-medium">Automated Invoicing</h3>
                <p className="mt-2 text-gray-300">
                  Generate professional invoices automatically, with customizable templates and detailed transaction
                  summaries for any date range.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="h-6 w-6 flex-shrink-0 text-[#B0F127]" />
              <div>
                <h3 className="text-xl font-medium">24/7 Support</h3>
                <p className="mt-2 text-gray-300">
                  Our dedicated support team is available around the clock to assist with any questions or issues you
                  may encounter.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="h-6 w-6 flex-shrink-0 text-[#B0F127]" />
              <div>
                <h3 className="text-xl font-medium">Flexible API Integration</h3>
                <p className="mt-2 text-gray-300">
                  Connect FinConnect to your existing systems with our robust API, enabling seamless integration with
                  your business workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-[#0c0c0c] py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Our Journey</h2>
            <p className="text-gray-300">From startup to industry leader in financial technology</p>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gray-700 md:before:mx-auto md:before:right-0 md:before:left-0">
              <div className="relative flex flex-col items-start md:flex-row md:items-center md:justify-between">
                <div className="order-1 ml-10 md:ml-0 md:w-5/12">
                  <div className="rounded-lg bg-[#121212] p-6 shadow-lg">
                    <h3 className="mb-2 text-xl font-bold text-[#B0F127]">2020</h3>
                    <p className="text-gray-300">
                      FinConnect was founded with a vision to revolutionize financial connectivity
                    </p>
                  </div>
                </div>
                <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#B0F127] text-black md:mx-auto md:order-1">
                  <span className="font-bold">1</span>
                </div>
              </div>
              <div className="relative flex flex-col items-start md:flex-row-reverse md:items-center md:justify-between">
                <div className="order-1 ml-10 md:ml-0 md:w-5/12">
                  <div className="rounded-lg bg-[#121212] p-6 shadow-lg">
                    <h3 className="mb-2 text-xl font-bold text-[#B0F127]">2021</h3>
                    <p className="text-gray-300">
                      Launched our core platform and secured first round of funding from leading venture capital firms
                      specializing in fintech
                    </p>
                  </div>
                </div>
                <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#B0F127] text-black md:mx-auto md:order-1">
                  <span className="font-bold">2</span>
                </div>
              </div>
              <div className="relative flex flex-col items-start md:flex-row md:items-center md:justify-between">
                <div className="order-1 ml-10 md:ml-0 md:w-5/12">
                  <div className="rounded-lg bg-[#121212] p-6 shadow-lg">
                    <h3 className="mb-2 text-xl font-bold text-[#B0F127]">2022</h3>
                    <p className="text-gray-300">
                      Expanded our services to include enterprise solutions and reached 100,000 active users
                    </p>
                  </div>
                </div>
                <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#B0F127] text-black md:mx-auto md:order-1">
                  <span className="font-bold">3</span>
                </div>
              </div>
              <div className="relative flex flex-col items-start md:flex-row-reverse md:items-center md:justify-between">
                <div className="order-1 ml-10 md:ml-0 md:w-5/12">
                  <div className="rounded-lg bg-[#121212] p-6 shadow-lg">
                    <h3 className="mb-2 text-xl font-bold text-[#B0F127]">2023</h3>
                    <p className="text-gray-300">
                      Introduced our advanced analytics platform and expanded operations globally
                    </p>
                  </div>
                </div>
                <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#B0F127] text-black md:mx-auto md:order-1">
                  <span className="font-bold">4</span>
                </div>
              </div>
              <div className="relative flex flex-col items-start md:flex-row md:items-center md:justify-between">
                <div className="order-1 ml-10 md:ml-0 md:w-5/12">
                  <div className="rounded-lg bg-[#121212] p-6 shadow-lg">
                    <h3 className="mb-2 text-xl font-bold text-[#B0F127]">Today</h3>
                    <p className="text-gray-300">
                      Serving over 1 million users worldwide with innovative financial solutions
                    </p>
                  </div>
                </div>
                <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#B0F127] text-black md:mx-auto md:order-1">
                  <span className="font-bold">5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-[#0c0c0c] to-[#121212] p-8 text-center shadow-lg shadow-[#B0F127]/5 md:p-12">
          <h2 className="mb-4 text-3xl font-bold">Ready to transform your financial experience?</h2>
          <p className="mb-8 text-gray-300">
            Join thousands of satisfied users who have revolutionized their approach to finance with FinConnect
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="bg-[#B0F127] text-black hover:bg-[#B0F127]/90 px-4 py-2 rounded-md">
              Get Started
            </button>
            <button className="border border-gray-700 hover:bg-[#121212] hover:text-white px-4 py-2 rounded-md">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;