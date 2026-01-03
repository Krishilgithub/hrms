"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Dayflow HRMS?",
    answer: "Dayflow is a comprehensive Human Resource Management System designed to streamline attendance tracking, leave management, payroll processing, and employee data management for organizations of all sizes."
  },
  {
    question: "How does the free trial work?",
    answer: "All plans include a 14-day free trial with full access to all features. No credit card is required to start your trial, and you can cancel anytime before the trial ends without being charged."
  },
  {
    question: "Can I change my plan later?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. When you upgrade, you'll get immediate access to new features. Downgrades take effect at the start of your next billing cycle."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use industry-standard encryption (AES-256) for data at rest and TLS 1.3 for data in transit. We're also SOC 2 Type II certified and fully GDPR compliant."
  },
  {
    question: "Do you offer customer support?",
    answer: "Yes! Starter plans include email support with 24-hour response time. Professional plans get priority support, and Enterprise customers receive dedicated account management with phone and chat support."
  },
  {
    question: "Can I import existing employee data?",
    answer: "Yes, we provide easy data import tools that support CSV and Excel formats. Our team can also help with bulk imports for Enterprise customers during onboarding."
  },
  {
    question: "Is there a mobile app?",
    answer: "Yes! Dayflow offers native mobile apps for both iOS and Android, allowing employees to check in, request leaves, view payslips, and more on the go."
  },
  {
    question: "What integrations do you support?",
    answer: "We integrate with popular tools including Slack, Microsoft Teams, Google Workspace, QuickBooks, and more. Professional and Enterprise plans also include API access for custom integrations."
  }
]

export function FAQ() {
  return (
    <section id="faq" className="py-12 md:py-16 lg:py-24">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about Dayflow
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <a 
            href="mailto:support@dayflow.com" 
            className="text-primary hover:underline font-semibold"
          >
            Contact our support team →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
