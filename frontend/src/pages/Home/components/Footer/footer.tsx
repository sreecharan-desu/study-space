import { SmallDot } from "../Spaces/space-component";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-4" style={{ position: "static" }}>
      <div className="container mx-auto text-center">
        <p className="text-sm mb-2">
          &copy; {new Date().getFullYear()} StudySpace. All rights reserved.
        </p>
        <p className="text-sm mb-2">
          Made with <span className="text-red-500">&hearts;</span> by Sreecharan
          along with SreeHari
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/sreecharan-desu"
            className="text-gray-400 hover:text-white"
          >
            GitHub
          </a>
          <SmallDot />
          <a
            href="https://www.linkedin.com/in/sree-charan-desu/"
            className="text-gray-400 hover:text-white"
          >
            LinkedIn
          </a>
          <SmallDot />
          <a
            href="https://x.com/sreecharandesu"
            className="text-gray-400 hover:text-white"
          >
            Twitter 𝕏
          </a>
        </div>
      </div>
    </footer>
  );
}
