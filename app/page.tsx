import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollStory from "@/components/ScrollStory";
import VideoSection from "@/components/VideoSection";
import DonationForm from "@/components/DonationForm";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";
import ContactUs from "@/components/ContactUs";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ScrollStory />
      <VideoSection />
      <DonationForm />
      <AboutUs />
      <FAQSection />
      <ContactUs />
      <Footer />
    </main>
  );
}