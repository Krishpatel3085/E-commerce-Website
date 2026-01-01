import React from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react"
import Footer from "../footer/Footer";
import Team_img from '../images/indoor-shot.jpg'
import Button from 'react-bootstrap/Button';
import writing1 from "../images/hand_writing.jpg";
import book3 from "../images/img_7.jpg";
import book4 from "../images/img_8.jpg";
import book5 from "../images/img_9.jpg";
import book1 from "../images/img_1.jpg";
import book2 from "../images/img_3.jpg";
import book6 from "../images/img_4.jpg";
import book7 from "../images/img_6.jpg";
import book8 from "../images/img_5.jpg";
import read_book from "../images/read_book.jpg";
import one_book from "../images/one_book.jpg";
import second_book from "../images/second_book.jpg";
import third_book from "../images/young-woman.jpg";
import Header from "../NavBar/Header";

function Team() {

// team
  const teamMembers = [
    { name: "John Doe", role: "Designer", image: book3 },
    { name: "Jane Smith", role: "Developer", image: book4 },
    { name: "Mike Johnson", role: "Manager", image: book5 },
    { name: "Emily Brown", role: "Marketing", image: book1 },
    { name: "Chris Lee", role: "UX Designer", image: book2 },
    { name: "Sarah Davis", role: "Content Writer", image: book6 },
    { name: "Alex Wilson", role: "UI Designer", image: book7 },
    { name: "Rachel Taylor", role: "Product Manager", image: book8 },
  ]

   // blog section
   const blogPosts = [
    {
        id: 1,
        title: "How to Get Started on Bookstagram in 2022",
        date: "May 10, 2022",
        comments: "No Comments",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur",
        image: read_book,
    },
    {
        id: 2,
        title: "How to Get Started on Bookstagram in 2022",
        date: "May 10, 2022",
        comments: "No Comments",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        image: one_book,
    },
    {
        id: 3,
        title: "How to Get Started on Bookstagram in 2022",
        date: "May 10, 2022",
        comments: "No Comments",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        image: second_book,
    },
    {
        id: 4,
        title: "How to Get Started on Bookstagram in 2022",
        date: "May 10, 2022",
        comments: "No Comments",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        image: third_book,
    },
]


  return (
    <>
      <Header />

      <div className="min-h-screen bg-white">

        {/* section one  */}
        <section className="bg-gray-900 text-white py-20 flex items-center justify-center"
          style={{
            backgroundImage: `url(${Team_img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '400px'
          }}
        >
          <div className="container mx-auto px-4 text-center ">
            <h4 className="mb-4">
              <span>
                Home <span className="mx-3">📚</span>Team
              </span>
            </h4>
            <h2 className="text-4xl font-bold text-light">
             Team
            </h2>
          </div>
        </section>

        {/* section two */}
        <div className="container mx-auto px-4 py-12 bg-[#faf9f5] my-5 rounded-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="md:w-1/2 p-6 md:p-12">
              <span className="text-danger font-semibold text-lg md:text-xl">About Author</span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4 text-start">
                Writing books makes the world go round
              </h2>
              <p className="text-gray-600 mb-4 text-base md:text-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
                ullamcorper mattis, pulvinar dapibus leo.
              </p>
              <p className="text-gray-600 mb-6 text-base md:text-lg">
                Interdum donec fringilla consectetuer senectus proin odio ultricies tincidunt. Leo molestie
                bibendum eget aenean vulputate taciti proin volutpat purus.
              </p>
              <Button variant="default" className="w-40 text-white bg-danger border-danger hover:bg-danger hover:text-white">
                Discover More
              </Button>
            </div>

            <div className="md:w-1/2">
              <img
                src={writing1}
                alt="Author writing on a typewriter"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* section three */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Creative team</h2>
              <Button className="bg-red-500 hover:bg-red-600 text-white border-0">
                Discover More
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="relative group overflow-hidden rounded-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-sm mb-4">{member.role}</p>
                    <div className="flex space-x-4">
                      <a href="facebook" className="hover:text-red-500 transition-colors">
                        <Facebook size={20} />
                      </a>
                      <a href="twitter" className="hover:text-red-500 transition-colors">
                        <Twitter size={20} />
                      </a>
                      <a href="Linkdin" className="hover:text-red-500 transition-colors">
                        <Linkedin size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* blog section */}
        <div className="container mx-auto px-4">
          {/* Blog & News Section */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-8 mt-5">
              <h2 className="text-3xl font-bold text-gray-800">Blog & News</h2>
              <Button variant="outline" className="w-48 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md border-0">View All Articles</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="overflow-hidden border rounded-lg shadow">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover m-0 p-0"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{blogPosts[0].title}</h3>
                  <p className="text-sm text-danger mb-2">
                    {blogPosts[0].date} - {blogPosts[0].comments}
                  </p>
                  <p className="text-gray-600">{blogPosts[0].excerpt}</p>
                  <Button variant="link" className="mt-4 p-0 w-40 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md border-0 no-underline">
                    Continue Reading
                  </Button>

                </div>
              </div>
              <div className="space-y-6">
                {blogPosts.slice(1, 4).map((post) => (
                  <div key={post.id} className="flex overflow-hidden border rounded-lg shadow">
                    <img
                      src={post.image}
                      alt={post.title}
                      width={150}
                      height={100}
                      className="w-1/3 object-cover m-0 p-0"
                    />
                    <div className="p-4 w-2/3">
                      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                      <p className="text-sm text-danger mb-2">
                        {post.date} - {post.comments}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>





      </div>




      {/* <section id="team">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h4
                className="text-light text-center"
                data-aos="fade-right"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1500"
              >
                <span>
                  Home{" "}
                  <span className="mx-3 ">
                    <i class="bi bi-book fs-5 "></i>
                  </span>{" "}
                  Team
                </span>
              </h4>
              <h2
                className="text-center text-light"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="2000"
              >
                Meet Our Team
              </h2>
            </div>
          </div>
        </div>
      </section>

      <div className="container-fluid mb-4">
        <div className="container p-5 custom-container">
          <div className="row align-items-center overflow-hidden">
            <div className="col-md-6">
              <div className="about_author">
                <h6
                  className="text-danger"
                  data-aos="fade-right"
                  data-aos-duration="2000"
                >
                  About Author
                </h6>
                <h2
                  className="text-dark text-start"
                  data-aos="fade-right"
                  data-aos-duration="2000"
                >
                  Writing books makes the world go round
                </h2>
                <span
                  data-aos="fade-up"
                  data-aos-anchor-placement="bottom-bottom"
                  data-aos-duration="2000"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                  leo.
                </span>
                <p
                  className="mt-2"
                  data-aos="fade-up"
                  data-aos-anchor-placement="bottom-bottom"
                  data-aos-duration="2000"
                >
                  Interdum donec fringilla consectetuer senectus proin odio
                  ultricies tincidunt. Leo molestie bibendum eget aenean
                  vulputate taciti proin volutpat purus.
                </p>
              </div>
              <button
                className="author_btn fw-bold"
                data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom"
                data-aos-duration="2000"
              >
                Discover More
              </button>
            </div>
            <div className="col-md-6">
              <img
                src={writing}
                alt="img"
                className="img-fluid custom-img"
                data-aos="fade-left"
                data-aos-duration="2000"
              />
            </div>
          </div>
        </div>
      </div>

      <section id="team-member">
        <div className="container">
          <div className="row py-3">
            <div className="next col-md-12 d-flex justify-content-between align-content-center">
              <h3 data-aos="fade-down" data-aos-duration="2000">
                Creative team
              </h3>
              <span>
                <button
                  className="author_btn fw-bold"
                  data-aos="fade-down"
                  data-aos-duration="2000"
                >
                  Discover More
                </button>
              </span>
            </div>
          </div>

        
          <div className="row d-flex overflow-hidden">
            <div className="col-md-3">
              <div
                className="john"
                data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration="800"
              >
                <img
                  src={book3}
                  alt="img"
                  className="w-100 img-fluid "
                  id="img-blog"
                />
                <div className="overlay">
                  <p  data-aos="zoom-in-right" data-aos-duration="2000">John D. Black</p>
                  <h6    data-aos="zoom-in-right" data-aos-duration="2000">Director</h6>
                  <div className="icon" 
                    data-aos="fade-up"
                    data-aos-duration="3000">
                    <i className="fab fa-twitter" id="icon"></i>
                    <i className="fab fa-facebook" id="icon"></i>
                    <i className="fab fa-instagram" id="icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="john"
                data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration="800"
              >
                <img
                  src={book5}
                  alt="img"
                  className="w-100 img-fluid"
                  id="img-blog"
                />
                <div className="overlay">
                  <p  data-aos="zoom-in-right" data-aos-duration="2000">Amanda Baughn</p>
                  <h6  data-aos="zoom-in-right" data-aos-duration="2000">Author</h6>
                  <div className="icon" data-aos="fade-up"
                    data-aos-duration="3000">
                    <i className="fab fa-twitter" id="icon"></i>
                    <i className="fab fa-facebook" id="icon"></i>
                    <i className="fab fa-instagram" id="icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="john"
                data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration="800"
              >
                <img
                  src={book4}
                  alt="img"
                  className="w-100 img-fluid"
                  id="img-blog"
                />
                <div className="overlay">
                  <p  data-aos="zoom-in-right" data-aos-duration="2000">Joehar</p>
                  <h6  data-aos="zoom-in-right" data-aos-duration="2000">Author</h6>
                  <div className="icon" data-aos="fade-up"
                    data-aos-duration="3000">
                    <i className="fab fa-twitter" id="icon"></i>
                    <i className="fab fa-facebook" id="icon"></i>
                    <i className="fab fa-instagram" id="icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="john"
                data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration="800"
              >
                <img
                  src={book1}
                  alt="img"
                  className="w-100 img-fluid"
                  id="img-blog"
                />
                <div className="overlay">
                  <p  data-aos="zoom-in-right" data-aos-duration="2000">Luigi T. Elbert</p>
                  <h6  data-aos="zoom-in-right" data-aos-duration="2000">Marketing</h6>
                  <div className="icon" data-aos="fade-up"
                    data-aos-duration="3000">
                    <i className="fab fa-twitter" id="icon"></i>
                    <i className="fab fa-facebook" id="icon"></i>
                    <i className="fab fa-instagram" id="icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row d-flex py-4 overflow-hidden">
            <div className="col-md-3">
              <div className="john">
                <img
                  src={book2}
                  alt="img"
                  className="w-100 img-fluid "
                  id="img-blog"
                />
                <div className="overlay">
                  <p  data-aos="zoom-in-right" data-aos-duration="2000">Dennis Dunn</p>
                  <h6  data-aos="zoom-in-right" data-aos-duration="2000">Director</h6>
                  <div className="icon" data-aos="fade-up"
                    data-aos-duration="3000">
                    <i className="fab fa-twitter" id="icon"></i>
                    <i className="fab fa-facebook" id="icon"></i>
                    <i className="fab fa-instagram" id="icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="john">
                <img
                  src={book6}
                  alt="img"
                  className="w-100 img-fluid"
                  id="img-blog"
                />
                <div className="overlay">
                  <p  data-aos="zoom-in-right" data-aos-duration="2000">Milissa H</p>
                  <h6  data-aos="zoom-in-right" data-aos-duration="2000">Journalist</h6>
                  <div className="icon" data-aos="fade-up"
                    data-aos-duration="3000">
                    <i className="fab fa-twitter" id="icon"></i>
                    <i className="fab fa-facebook" id="icon"></i>
                    <i className="fab fa-instagram" id="icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="john">
                <img
                  src={book7}
                  alt="img"
                  className="w-100 img-fluid"
                  id="img-blog"
                />
                <div className="overlay">
                  <p  data-aos="zoom-in-right" data-aos-duration="2000">Sara J. Smith</p>
                  <h6  data-aos="zoom-in-right" data-aos-duration="2000">Marketing</h6>
                  <div className="icon" data-aos="fade-up"
                    data-aos-duration="3000">
                    <i className="fab fa-twitter" id="icon"></i>
                    <i className="fab fa-facebook" id="icon"></i>
                    <i className="fab fa-instagram" id="icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="john">
                <img
                  src={book8}
                  alt="img"
                  className="w-100 img-fluid"
                  id="img-blog"
                />
                <div className="overlay">
                  <p  data-aos="zoom-in-right" data-aos-duration="2000">Alice Jackson</p>
                  <h6  data-aos="zoom-in-right" data-aos-duration="2000">Marketing</h6>
                  <div className="icon" data-aos="fade-up"
                    data-aos-duration="3000">
                    <i className="fab fa-twitter" id="icon"></i>
                    <i className="fab fa-facebook" id="icon"></i>
                    <i className="fab fa-instagram" id="icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <div className="container py-4">
        <div className="row py-3">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h2 className="text-dark" data-aos="fade-down" data-aos-duration="2000">Blog & News</h2>
            <button className="btn btn-danger" data-aos="fade-down" data-aos-duration="2000">View All Articles</button>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-md-6">
            <img
              src={read_book}
              alt="Read Book"
              className="w-100 img-fluid"
              id="read_book"  data-aos="flip-up" data-aos-duration="2000"
            />
            <h5 className="py-3"  data-aos="flip-up" data-aos-duration="2000">How to Get Started on Bookstagram in 2022</h5>
            <h6 className="text-danger py-2"  data-aos="flip-up" data-aos-duration="2000">May 10, 2022 ~ No Comments</h6>
            <p  data-aos="flip-up">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur.
            </p>
            <span className="text-decoration-none text-dark"  data-aos="flip-up" data-aos-duration="2000">
              Continue Reading »
            </span>
          </div>

          <div className="col-md-6" >
            <div className="row ">
              <div className="col-4" data-aos="zoom-out" data-aos-duration="2000">
                <img
                  src={one_book}
                  alt="One Book"
                  className="img-fluid "
                  id="comment"
                />
              </div>
              <div className="Bookstagram col-8" data-aos="zoom-out" data-aos-duration="2000">
                <h5>How to Get Started on Bookstagram in 2022</h5>
                <span className="text-danger fs-6">
                  May 10, 2022 ~ No Comments
                </span>
                <p className="py-2" >
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa.
                </p>
              </div>
            </div>

            <div className="row pt-3">
              <div className="col-4" data-aos="zoom-out" data-aos-duration="2000">
                <img
                  src={second_book}
                  alt="One Book"
                  className="img-fluid "
                  id="comment"
                />
              </div>
              <div className="Bookstagram col-8" data-aos="zoom-out" data-aos-duration="2000">
                <h5>How to Get Started on Bookstagram in 2022</h5>
                <span className="text-danger fs-6">
                  May 10, 2022 ~ No Comments
                </span>
                <p className="py-2">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa.
                </p>
              </div>
            </div>

            <div className="row pt-3 ">
              <div className="col-4" data-aos="zoom-out" data-aos-duration="2000">
                <img
                  src={third_book}
                  alt="One Book"
                  className="img-fluid "
                  id="comment"
                />
              </div>
              <div className="Bookstagram col-8" data-aos="zoom-out" data-aos-duration="2000">
                <h5>How to Get Started on Bookstagram in 2022</h5>
                <span className="text-danger fs-6">
                  May 10, 2022 ~ No Comments
                </span>
                <p className="py-2">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <Footer />
    </>
  );
}

export default Team;
