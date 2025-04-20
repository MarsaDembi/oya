"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import confetti from "canvas-confetti";


type Comment = {
  name: string;
  email: string;
  message: string;
  createdAt: string;
  rating: number | null;
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [avgRating, setAvgRating] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(false);

  
  
  const sendMessage = async () => {
    if (!message.trim()) {
      alert("Tolong ketik pesan terlebih dahulu!");
      return;
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error("Gagal mengirim pesan.");

      const data = await res.json();
      setReply(data.reply); // Set response dari API ke state reply
      setMessage(""); // Reset input message
    } catch (err) {
      console.error("Error sending message:", err);
      setReply("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then((data) => setComments(data.comments || []));
  }, []);

  const skills = [
    { name: 'HTML', description: 'Struktur dasar halaman web yang semantik dan SEO-friendly.' },
    { name: 'CSS', description: 'Mengatur tampilan dan layout dengan desain responsif.' },
    { name: 'JavaScript', description: 'Logika interaktif dan manipulasi DOM pada web.' },
    { name: 'React', description: 'Library untuk membangun UI yang dinamis dan efisien.' },
    { name: 'Tailwind CSS', description: 'Framework utility-first untuk styling cepat dan konsisten.' },
    { name: 'Next.js', description: 'Framework React dengan SSR, routing, dan optimasi performa.' },
    { name: 'Figma', description: 'Desain antarmuka dengan kolaborasi real-time.' },
    { name: 'Git', description: 'Versi kontrol untuk pengembangan tim yang efisien.' },
  ];
  

  const projects = [
    {
      title: "Website biodata diri",
      desc: "Membuat project website biodata",
      image: "/cvya.png",
      demoUrl: "https://cv-challange1.vercel.app/"
    },
    {
      title: "Project Design UI/UX",
      desc: "Desain aplikasi sebuah toko Burger",
      image: "/uiux.png",
      demoUrl: "https://www.figma.com/design/irobg9jABzeEz1GTZRwe1h/ELLA-SITI-AISYAH?node-id=0-1&p=f&t=5xiHezKqqgqJxpoS-0"
    },
  ];

  const handleConfetti = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };


  return (
    <main className={`bg-background text-foreground font-sans transition-colors duration-500 ${darkMode ? 'bg-black text-white' : ''}`}>
      <nav className="bg-pink-50/90 dark:bg-black/80 backdrop-blur-md px-6 py-4 shadow-md sticky top-0 z-50 flex justify-between items-center">
        <ul className="flex space-x-6 text-sm md:text-base font-medium">
          {["home", "skills", "portfolio", "contact"].map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                className="hover:text-pink-600 dark:hover:text-pink-300 transition-colors"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-pink-600 hover:bg-pink-500 text-white px-3 py-1 rounded-md text-sm transition"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </nav>

      <motion.section
        id="home"
        className="min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 py-20 bg-gradient-to-br from-pink-500 to-pink-700 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative w-64 h-64 mb-6 md:mb-0 md:mr-12"
    >
      <Image
        src="/yaa.jpg"
        alt="Ella Siti Aisyah"
        fill
        className="rounded-xl object-cover shadow-lg"
      />
    </motion.div>
    <div className="md:w-1/2">
  <h1 className="text-4xl md:text-6xl font-bold mb-4">
    Hi, I&apos;m Ella Siti Aisyah{" "}
    <motion.span
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="inline-block"
    >
      👋
    </motion.span>
  </h1>

  <motion.p
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.5 }}
    className="text-lg md:text-xl text-white/90 mb-4"
  >
    Front-End Developer & UI Designer based in Rancaekek, Indonesia.
  </motion.p>

  <p className="text-base md:text-lg text-white/80 mb-4">
    I specialize in crafting beautiful and functional interfaces using modern technologies like React, Tailwind CSS, and Figma. I’m passionate about design systems, pixel-perfect UIs, and bringing ideas to life on the web.
  </p>

  <div className="flex flex-wrap gap-4 mt-4">

    <a
      href="#portfolio"
      className="border border-white text-white px-6 py-2 rounded-xl hover:bg-white hover:text-indigo-700 transition"
    >
      See Projects
    </a>
  </div>

  <div className="mt-8">
    <p className="text-sm text-white/70 mb-2">Tech Stack:</p>
    <div className="flex flex-wrap gap-3 text-sm text-white">
      <span className="bg-white/10 px-3 py-1 rounded-full">React</span>
      <span className="bg-white/10 px-3 py-1 rounded-full">Next.js</span>
      <span className="bg-white/10 px-3 py-1 rounded-full">Tailwind CSS</span>
      <span className="bg-white/10 px-3 py-1 rounded-full">Figma</span>
    </div>
  </div>

  <div className="flex justify-center md:justify-start gap-6 mt-8 text-white">
    <a href="#" className="hover:text-pink-300 transition">
      <Github />
    </a>
    <a href="#" className="hover:text-pink-300 transition">
      <Linkedin />
    </a>
    <a href="mailto:ellasitiaisyah@email.com" className="hover:text-pink-300 transition">
      <Mail />
    </a>
  </div>
</div>

      </motion.section>


      <motion.section 
  id="skills"
  className="min-h-screen px-6 py-20 bg-pink-500 dark:bg-pink-800 text-white transition"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  <h2 className="text-3xl font-bold mb-10 text-center">
    💻🛠 Skills & Tools
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {skills.map(({ name, description }) => (
      <Tilt
        key={name}
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        glareEnable
        glareColor="lightblue"
      >
        <div className="bg-white dark:bg-pink-900 text-pink-700 dark:text-pink-100 p-4 rounded-xl shadow-md hover:scale-105 transition-transform">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <span role="img" aria-label="tool-icon">🔧</span> {name}
          </h3>
          <p className="text-sm">{description}</p>
        </div>
      </Tilt>
    ))}
  </div>
</motion.section>




<motion.section
  id="portfolio"
  className="min-h-screen px-6 py-20 bg-gradient-to-r from-pink-500 to-pink-300 transition"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
  <h2 className="text-3xl font-bold mb-10 text-center text-white animate__animated animate__fadeIn">
    📁 Portofolio
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {projects.map((project, idx) => (
      <Tilt
        key={idx}
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        glareEnable
        glareColor="lightblue"
        className="w-full"
      >
        <div className="bg-white dark:bg-indigo-900 p-4 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">{project.title}</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{project.desc}</p>
          <a
            href={project.demoUrl} // Pastikan data project memiliki key 'demoUrl'
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={300}
              className="rounded-lg w-full h-48 object-cover transition-transform hover:scale-105"
            />
          </a>
          <div className="mt-4 text-center">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition transform hover:scale-110"
            >
              🔗 Live Demo
            </a>
          </div>
        </div>
      </Tilt>
    ))}
  </div>
</motion.section>


<section id="contact" className="px-6 py-20 bg-pink-100 dark:bg-pink-950 text-pink-900 dark:text-pink-100">
  <div className="max-w-2xl mx-auto bg-white dark:bg-pink-900 p-8 rounded-xl shadow-xl">
    <h2 className="text-3xl font-bold text-center mb-8">📬 Get in Touch</h2>
    
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
        const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
        const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

        if (!name || !email || !message || rating === 0) {
          alert("Semua kolom dan rating wajib diisi!");
          return;
        }

        const data = { name, email, message, rating };

        try {
          const res = await fetch("/api/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          if (!res.ok) throw new Error("Gagal menyimpan komentar");

          handleConfetti();
          form.reset();
          setRating(0);
          alert("Komentar berhasil dikirim!");

          const updated = await fetch("/api/comments");
          const { comments: newComments, averageRating } = await updated.json();
          setComments(newComments);
          setAvgRating(averageRating);
        } catch (err) {
          console.error("Error submitting comment:", err);
          alert("Gagal mengirim komentar. Silakan coba lagi.");
        }
      }}
      className="space-y-6"
    >
      <div>
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          required
          className="w-full px-6 py-3 rounded-xl bg-pink-50 dark:bg-pink-800 text-pink-900 dark:text-white placeholder:text-pink-400 dark:placeholder:text-pink-300 shadow-md focus:ring-2 focus:ring-pink-500"
        />
      </div>
      <div>
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          required
          className="w-full px-6 py-3 rounded-xl bg-pink-50 dark:bg-pink-800 text-pink-900 dark:text-white placeholder:text-pink-400 dark:placeholder:text-pink-300 shadow-md focus:ring-2 focus:ring-pink-500"
        />
      </div>
      <div>
        <textarea
          name="message"
          rows={5}
          placeholder="Your Message"
          required
          className="w-full px-6 py-3 rounded-xl bg-pink-50 dark:bg-pink-800 text-pink-900 dark:text-white placeholder:text-pink-400 dark:placeholder:text-pink-300 shadow-md focus:ring-2 focus:ring-pink-500"
        />
      </div>
      <div className="text-center">
        <p className="text-pink-800 dark:text-pink-200 mb-2">Beri Rating:</p>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              aria-label={`Beri rating ${star} bintang`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className={`text-3xl transition ${
                (hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-400"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-pink-600 hover:bg-pink-500 text-white font-medium px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105 hover:animate-bounce"
      >
        ✉️ Kirim Pesan
      </button>
    </form>

    {comments.length > 0 && (
      <div className="mt-10 space-y-6">
        <h3 className="text-2xl font-semibold mb-4">💬 Comments</h3>
        <p className="text-center text-pink-600 dark:text-pink-300">
          ⭐ Average Rating: {avgRating.toFixed(1)} / 5
        </p>
        {comments.map((comment, idx) => (
          <div key={idx} className="bg-white dark:bg-pink-900 p-4 rounded-xl shadow-md">
            <p className="text-lg font-medium text-pink-800 dark:text-pink-200">
              {comment.name} <span className="text-sm text-gray-500">({new Date(comment.createdAt).toLocaleString()})</span>
            </p>
            <p className="text-sm text-pink-700 dark:text-pink-300">{comment.message}</p>
            {comment.rating !== null && <p className="text-yellow-500 mt-2">⭐ {comment.rating} / 5</p>}
          </div>
        ))}
      </div>
    )}



<div className="flex justify-center items-center mt-6">
  <button
    onClick={() => setIsChatVisible(!isChatVisible)} // Mengubah visibilitas chatbot
    className="bg-pink-600 hover:bg-pink-500 text-white px-8 py-4 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-2 focus:outline-none focus:ring-4 focus:ring-pink-400"
  >
    {isChatVisible ? (
      <span className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-x-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 0a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm4.292 11.708a1 1 0 0 1-1.414 1.414L8 9.414l-3.878 3.878a1 1 0 0 1-1.414-1.414l3.878-3.878-3.878-3.878a1 1 0 0 1 1.414-1.414L8 6.586l3.878-3.878a1 1 0 0 1 1.414 1.414L9.414 8l3.878 3.878a1 1 0 0 1 0 1.414z"/>
        </svg>
        Tutup Chatbot
      </span>
    ) : (
      <span className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-chat-square-text"
          viewBox="0 0 16 16"
        >
          <path d="M8 0a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm4.5 9a.5.5 0 0 1 .5.5v3.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5V9a.5.5 0 0 1 .5-.5h8z"/>
        </svg>
        Buka Chatbot
      </span>
    )}
  </button>
</div>

{isChatVisible && (
  <div className="mt-10 border-t pt-6">
    <h3 className="text-2xl font-semibold mb-4">🤖 Chatbot</h3>
    <div className="space-y-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full px-6 py-3 rounded-xl bg-pink-50 dark:bg-pink-800 text-pink-900 dark:text-white placeholder:text-pink-400 dark:placeholder:text-pink-300 shadow-md focus:ring-2 focus:ring-pink-500"
        placeholder="Tulis sesuatu..."
      />
      <button
        onClick={sendMessage} // Panggil sendMessage saat tombol diklik
        className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-3 rounded-full transition-all"
      >
        Kirim ke Bot
      </button>

      {reply && (
        <div className="p-4 bg-pink-50 dark:bg-pink-800 rounded-lg shadow text-pink-800 dark:text-pink-100">
          <strong>Bot:</strong> {reply}
        </div>
      )}
    </div>
  </div>
)}

    {/* Contact Info */}
    <motion.div 
  className="text-center mt-10 text-sm text-pink-700 dark:text-pink-300 space-y-4"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <p className="flex justify-center items-center gap-2">
    <Mail className="w-4 h-4" /> 
    Email: <a href="mailto:ellasitiaisyah@email.com" className="underline hover:text-pink-500 dark:hover:text-pink-400 transition">estasyah@email.com</a>
  </p>
  <p className="flex justify-center items-center gap-2">
    <Phone className="w-4 h-4" /> 
    Phone: <span className="font-medium">+62 811-3330-2563</span>
  </p>
  <p className="flex justify-center items-center gap-2">
    <MapPin className="w-4 h-4" /> 
    Location: <span className="font-medium">Rancaekek, Indonesia</span>
  </p>

  {/* Google Maps Embed */}
  <div className="mt-6 flex justify-center">
    <iframe
      title="Google Maps"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63339.71324850357!2d107.8291959!3d-6.9089899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68d63ccdc50621%3A0xdea087ca5f3f86c7!2sTanjungsari%2C%20Sumedang%2C%20Jawa%20Barat!5e0!3m2!1sen!2sid!4v1681422065980!5m2!1sen!2sid"
      width="100%"
      height="250"
      allowFullScreen
      loading="lazy"
      className="rounded-xl shadow-lg w-full max-w-md border border-pink-300 dark:border-pink-500"
    ></iframe>
  </div>
</motion.div>

  </div>
</section>
    </main>
  );
}
