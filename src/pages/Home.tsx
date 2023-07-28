import bannerKnowledge from "@/assets/images/illustration/banner-knowledge.png";
import bannerConnect from "@/assets/images/illustration/banner-connect.png";
import heroOot from "@/assets/images/illustration/hero-oot.png";
import RecentBooks from "@/components/RecentBooks";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/layouts/Footer";

export default function Home() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <section className="flex flex-col-reverse md:justify-around md:flex-row mt-0 sm:mt-10 max-w-7xl mx-auto px-5 2xl:px-0 mb-24">
        <div className="flex md:flex-col justify-center items-start">
          <article>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-primary mb-2 sm:whitespace-nowrap capitalize">
              Discover Knowledge <br /> Unleash Wisdom
            </h1>
            <p className="text-secondary font-semibold text-lg md:text-xl sm:whitespace-nowrap">
              Reading is to the mind what exercise is to the body
            </p>
            <div className="text-primary mt-14">
              <p>Book collection from various genres and authors.</p>
              <p>Organize, review, and connect with readers community</p>
            </div>
            <Button
              className="mt-5"
              onClick={() => scrollToSection("newly-arrived-books")}
            >
              Fresh Reads
            </Button>
          </article>
        </div>
        <aside className="flex justify-center md:justify-end">
          <img className="object-contain w-4/6" src={bannerKnowledge} alt="" />
        </aside>
      </section>

      <section className="flex flex-col md:justify-around md:flex-row mt-0 sm:mt-10 max-w-7xl mx-auto px-5 2xl:px-0 mb-40">
        <aside className="flex md:flex-col justify-center items-start">
          <img className="object-contain w-4/6" src={bannerConnect} alt="" />
        </aside>
        <article className="flex md:flex-col items-start justify-center">
          <div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-primary mb-2 sm:whitespace-nowrap capitalize">
              Imagine Discover <br /> and Connect
            </h1>
            <p className="text-secondary font-semibold text-lg md:text-xl sm:whitespace-nowrap">
              Join the journey of words and knowledge
            </p>
            <div className="text-primary mt-10">
              <p>Securely manage and authenticate your book collection.</p>
              <p>Access, read, and publish books with authentication.</p>
            </div>
            <Button className="mt-5">
              <Link to="/sign-up">Begin Adventure</Link>
            </Button>
          </div>
        </article>
      </section>

      <section>
        <RecentBooks />
      </section>

      <section>
        <article className="mb-40">
          <div>
            <img className="mx-auto" src={heroOot} alt="" />
          </div>
          <div className="flex flex-col items-center justify-center px-5 2xl:px-0">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl text-center font-black text-primary mb-2 capitalize mt-10">
              Uncover Literary Treasures
            </h1>
            <Button className="mt-10" asChild>
              <Link to="/books">Check Out Books</Link>
            </Button>
          </div>
        </article>
      </section>
      <Footer />
    </>
  );
}
