import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);
    
    try {
      await emailjs.sendForm(
        'service_t0df6eb',
        'template_3ciosq9',
        formRef.current,
        '2CJLDvC3dzTRKprKf'
      );
      
      toast({
        title: "Success!",
        description: "✅ Message sent successfully!",
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Error",
        description: "❌ Failed to send message. Try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="h-8 w-8 text-white" />,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      contact: "support@uber.com",
      action: "Send Email"
    },
    {
      icon: <Phone className="h-8 w-8 text-white" />,
      title: "Phone Support",
      description: "Speak with our support team directly",
      contact: "+1 (555) 123-4567",
      action: "Call Now"
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-white" />,
      title: "Live Chat",
      description: "Chat with us in real-time",
      contact: "Available 24/7",
      action: "Start Chat"
    }
  ];

  const faqs = [
    {
      icon: <HelpCircle className="h-6 w-6 text-black" />,
      question: "How do I request a ride?",
      answer: "Simply open the app, enter your destination, choose your ride type, and confirm your pickup location."
    },
    {
      icon: <Shield className="h-6 w-6 text-black" />,
      question: "Is my ride safe?",
      answer: "All drivers are background-checked, and we provide real-time tracking and emergency features for your safety."
    },
    {
      icon: <Clock className="h-6 w-6 text-black" />,
      question: "How long will my driver take to arrive?",
      answer: "Pickup times vary by location and demand, but you'll see an estimated arrival time before confirming your ride."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're here to help! Reach out to us through any of the channels below, 
            and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Get in Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the contact method that works best for you. Our support team is ready to assist.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Mail className="h-8 w-8 text-white" />,
                title: "Email Support",
                description: "Get help via email within 24 hours",
                contact: "support@uber.com",
                action: "Send Email"
              },
              {
                icon: <Phone className="h-8 w-8 text-white" />,
                title: "Phone Support", 
                description: "Speak with our support team directly",
                contact: "+1 (555) 123-4567",
                action: "Call Now"
              },
              {
                icon: <MessageCircle className="h-8 w-8 text-white" />,
                title: "Live Chat",
                description: "Chat with us in real-time",
                contact: "Available 24/7",
                action: "Start Chat"
              }
            ].map((method, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 overflow-hidden">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto group-hover:bg-gray-800 transition-colors duration-300">
                    {method.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-black">{method.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{method.description}</p>
                  <p className="text-lg font-semibold text-black">{method.contact}</p>
                  <Button className="bg-black hover:bg-gray-800 text-white px-6 py-3 transition-all duration-300 transform hover:scale-105">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-6">Send Us a Message</h2>
              <p className="text-xl text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>
            
            <Card className="border-0 shadow-2xl">
              <CardContent className="p-8">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="border-gray-300 focus:border-black"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border-gray-300 focus:border-black"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="border-gray-300 focus:border-black"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="border-gray-300 focus:border-black resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-black hover:bg-gray-800 text-white py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 group disabled:opacity-50"
                  >
                    {isSending ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find quick answers to common questions about our service.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                icon: <HelpCircle className="h-6 w-6 text-black" />,
                question: "How do I request a ride?",
                answer: "Simply open the app, enter your destination, choose your ride type, and confirm your pickup location."
              },
              {
                icon: <Shield className="h-6 w-6 text-black" />,
                question: "Is my ride safe?",
                answer: "All drivers are background-checked, and we provide real-time tracking and emergency features for your safety."
              },
              {
                icon: <Clock className="h-6 w-6 text-black" />,
                question: "How long will my driver take to arrive?",
                answer: "Pickup times vary by location and demand, but you'll see an estimated arrival time before confirming your ride."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {faq.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-black mb-3">{faq.question}</h3>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Visit Our Office</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stop by our headquarters in San Francisco or reach out to us online.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Address</h3>
              <p className="text-gray-300">1455 Market Street<br />San Francisco, CA 94103</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Office Hours</h3>
              <p className="text-gray-300">Monday - Friday<br />9:00 AM - 6:00 PM PST</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <p className="text-gray-300">+1 (555) 123-4567<br />Available 24/7</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
