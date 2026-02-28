import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import Swal from "sweetalert2";
import { FiMail, FiPhone, FiMapPin, FiSend, FiLoader } from "react-icons/fi";
import Container from "../../components/Shared/Container";

// Zod schema for validation
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/contact`,
        data,
      );

      Swal.fire({
        title: "Message Sent!",
        text: res.data.message || "We'll get back to you soon.",
        icon: "success",
        confirmButtonText: "OK",
      });

      reset(); // clear form
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to send message",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-base-100 py-10 md:py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto">
              Have questions about contests, payments, or anything else? We're
              here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-base-200 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FiMail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Us</h3>
                      <a
                        href="mailto:support@contesthub.com"
                        className="text-primary hover:underline"
                      >
                        support@contesthub.com
                      </a>
                      <p className="text-sm text-base-content/70 mt-1">
                        We usually respond within 24 hours
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <FiPhone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Call Us</h3>
                      <p className="font-medium">+1 (555) 123-4567</p>
                      <p className="text-sm text-base-content/70 mt-1">
                        Mon–Fri, 9AM–6PM EST
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <FiMapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Our Office</h3>
                      <p className="font-medium">123 Contest Street</p>
                      <p className="text-sm text-base-content/70">
                        San Francisco, CA 94102
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Quick Response Times */}
              <div className="bg-base-200 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-bold mb-4">Response Times</h2>
                <ul className="space-y-3 text-base-content/70">
                  <li className="flex justify-between">
                    <span>General Inquiries</span>
                    <span className="font-medium text-success">
                      Within 24 hours
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Technical Support</span>
                    <span className="font-medium text-success">1–2 hours</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Urgent Issues</span>
                    <span className="font-medium text-success">
                      Immediate via phone
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-base-200 rounded-2xl p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    className={`input border border-base-content/10 focus:outline-primary w-full ${
                      errors.name ? "input-error" : ""
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-error text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={`input border border-base-content/10 focus:outline-primary w-full ${
                      errors.email ? "input-error" : ""
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-error text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    {...register("subject")}
                    className={`input border border-base-content/10 focus:outline-primary w-full ${
                      errors.subject ? "input-error" : ""
                    }`}
                    placeholder="How can we help you?"
                  />
                  {errors.subject && (
                    <p className="text-error text-sm mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    className={`textarea border border-base-content/10 focus:outline-primary w-full ${
                      errors.message ? "textarea-error" : ""
                    }`}
                    placeholder="Please describe your inquiry in detail..."
                  />
                  {errors.message && (
                    <p className="text-error text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <FiLoader className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default ContactUs;
