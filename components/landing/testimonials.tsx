"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "HR Director",
    company: "TechCorp Inc.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content: "Dayflow has transformed how we manage our workforce. The attendance tracking and leave management features have saved us countless hours of administrative work.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Operations Manager",
    company: "Global Solutions Ltd.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    content: "The real-time dashboard and payroll visibility have given us unprecedented insights into our HR operations. Highly recommend for growing companies.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "CEO",
    company: "StartupHub",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    content: "As a startup, we needed an HRMS that could scale with us. Dayflow's intuitive interface and powerful features made it the perfect choice.",
    rating: 5
  }
]

export function Testimonials() {
  return (
    <section className="py-12 md:py-16 lg:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What our customers say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it - hear from companies who've transformed their HR operations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t">
                    <Avatar>
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
